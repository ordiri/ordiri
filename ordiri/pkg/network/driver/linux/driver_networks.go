package linux

import (
	"context"
	"fmt"

	"github.com/davecgh/go-spew/spew"
	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"

	"github.com/ordiri/ordiri/pkg/network/sdn"
)

func (ln *linuxDriver) RemoveNetwork(ctx context.Context, nw api.Network) error {
	namespace := namespaceForRouter(nw)
	publicGwCableName := publicGwCable(nw)
	if err := deleteNetworkNs(namespace); err != nil {
		return fmt.Errorf("unable to delete network ns - %w", err)
	}

	if _, iface := ln.interfaces.search(publicGwCableName.Root()); iface != nil {
		if err := netlink.LinkDel(iface); err != nil {
			return err
		}
	}

	if err := sdn.Ovs().VSwitch.DeletePort(sdn.ExternalSwitchName, publicGwCableName.Root()); err != nil {
		return err
	}

	return nil
}

func (ln *linuxDriver) EnsureNetwork(ctx context.Context, nw api.Network) error {
	if err := ln.installNetworkNat(ctx, nw); err != nil {
		return err
	}
	return nil
}

func (ln *linuxDriver) installNetworkNat(ctx context.Context, nw api.Network) error {
	log := log.FromContext(ctx)
	namespace := namespaceForRouter(nw)
	publicGwCableName := publicGwCable(nw)
	cidr := nw.Cidr()
	log.V(5).Info("Installing NAT", "nw", nw, "cidr", cidr, "namespace", namespace)
	if err := createNetworkNs(namespace); err != nil {
		return fmt.Errorf("error creating network namespace for NAT")
	}

	if err := ln.getOrCreateVeth(ctx, namespace, publicGwCableName); err != nil {
		return err
	}

	log.V(5).Info("Add OVS port")
	if err := sdn.Ovs().VSwitch.AddPort(sdn.ExternalSwitchName, publicGwCableName.Root()); err != nil {
		return err
	}

	ipt, err := sdn.Iptables(namespace)
	if err != nil {
		return err
	}
	log.V(5).Info("Apply IPTables Rules")
	ruleSets := rulesets(cidr.String(), publicGwCableName.Namespace())
	for _, ruleSet := range ruleSets {
		for _, rule := range ruleSet.Rules {
			err := ipt.AppendUnique(ruleSet.Table, ruleSet.Chain, rule...)
			if err != nil {
				return err
			}
		}
	}

	log.V(5).Info("Renew DHCP")
	curNs, err := netns.Get()
	if err != nil {
		return fmt.Errorf("unable to get current network ns - %w", err)
	}
	handle, err := netns.GetFromName(namespace)
	if err != nil {
		return fmt.Errorf("unable to get namespace for public gateway ns - %w", err)
	}
	defer handle.Close()

	errCh := make(chan error)
	// only in a goroutine to keep it away from other namespaces
	go func(targetNs netns.NsHandle, curNs netns.NsHandle) {
		close, err := ExecuteInNetns(targetNs, curNs)
		if err != nil {
			errCh <- err
			return
		}
		defer close()
		netconf, err := dhclient4(publicGwCableName.Namespace(), 5, true)
		if err == nil {
			spew.Dump(netconf)
			errCh <- nil
			return
		}

		errCh <- nil
	}(handle, curNs)

	if err := <-errCh; err != nil {
		return fmt.Errorf("unable to get addr from dhcp - %w", err)
	}

	// handle, err := netns.GetFromName(namespace)
	// if err != nil {
	// 	return fmt.Errorf("unable to get the network namespace handle - %w", err)
	// }

	// nft, err := nftables.New(nftables.WithNetNSFd(int(handle)))
	// if err != nil {
	// 	return fmt.Errorf("error getting nftables - %w", err)
	// }

	// natTable := nft.AddTable(&nftables.Table{
	// 	Name: "ordiri-nat",
	// })

	// natChain := nft.AddChain(&nftables.Chain{
	// 	Name:     "ordiri-nat",
	// 	Table:    natTable,
	// 	Type:     nftables.ChainTypeNAT,
	// 	Hooknum:  nftables.ChainHookPostrouting,
	// 	Priority: nftables.ChainPriorityNATSource,
	// })

	// nft.AddRule(&nftables.Rule{
	// 	Table: natTable,
	// 	Chain: natChain,
	// 	Exprs: []expr.Any{
	// 		&expr.Meta{Key: expr.MetaKeyOIFNAME, Register: 1}, // store the outgoing interface in reg1
	// 		&expr.Cmp{ // if reg1(outgoing iface) is public router cable, masquerade
	// 			Op:       expr.CmpOpEq,
	// 			Register: 1,
	// 			Data:     ifname(publicGwCableName.Namespace()),
	// 		},
	// 		&expr.Masq{},
	// 	},
	// })

	// nft.AddRule(&nftables.Rule{
	// 	Table: natTable,
	// 	Chain: natChain,
	// 	Exprs: []expr.Any{
	// 		&expr.Meta{Key: expr.MetaKeyOIFNAME, Register: 1}, // store the outgoing interface in reg1
	// 		&expr.Cmp{ // if reg1(outgoing iface) is public router cable, masquerade
	// 			Op:       expr.CmpOpEq,
	// 			Register: 1,
	// 			Data:     ifname(publicGwCableName.Namespace()),
	// 		},
	// 		&expr.Masq{},
	// 	},
	// })
	//
	// nft.AddRule(&nftables.Rule{
	// 	Table: natTable,
	// 	Chain: natChain,
	// 	Exprs: []expr.Any{
	// 		&expr.Meta{Key: expr.MetaKeyOIFNAME, Register: 1}, // store the outgoing interface in reg1
	// 		&expr.Cmp{ // if reg1(outgoing iface) is public router cable, masquerade
	// 			Op:       expr.CmpOpEq,
	// 			Register: 1,
	// 			Data:     ifname(publicGwCableName.Namespace()),
	// 		},
	// 		&expr.Masq{},
	// 	},
	// })

	return nil
}

func rulesets(cidr string, publicInterface string) []iptRule {
	return []iptRule{
		{
			Table: "raw",
			Chain: "PREROUTING",
			Rules: [][]string{
				{"-p", "udp", "--dport", "69", "-s", cidr, "-j", "CT", "--helper", "tftp"},
			},
		}, {
			Table: "nat",
			Chain: "POSTROUTING",
			Rules: [][]string{
				{"-o", publicInterface, "-j", "MASQUERADE"},
			},
		},
	}
}
