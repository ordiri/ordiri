package linux

import (
	"context"
	"fmt"

	"os/exec"

	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/network/api"

	"github.com/ordiri/ordiri/pkg/network/sdn"
)

func (ln *linuxDriver) RemoveNetwork(ctx context.Context, nw api.Network) error {
	return fmt.Errorf("method 'RemoveNetwork' not implemented")
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

	log.V(5).Info("Renew DHCP")
	go func() {
		// TODO: just look at it
		renewDhclientCmd := exec.Command("ip", "netns", "exec", namespace, "dhclient", "-r", publicGwCableName.Namespace())
		// fire and forget for now
		// todo: create a netlink device and actually set this properly
		// by using some allocator in the manager to pre-allocate the ip's
		if err := renewDhclientCmd.Run(); err != nil {
			log.Error(err, "unable to release existing addr")
		}

		cmd := exec.Command("ip", "netns", "exec", namespace, "dhclient", publicGwCableName.Namespace())
		if res, err := cmd.Output(); err != nil {
			log.Error(err, "unable to reneww gw address", "res", string(res))
		}
	}()

	log.V(5).Info("Add OVS port")
	if err := sdn.Ovs().VSwitch.AddPort(sdn.ExternalSwitchName, publicGwCableName.Root()); err != nil {
		return err
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
