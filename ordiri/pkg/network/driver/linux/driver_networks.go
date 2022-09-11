package linux

import (
	"context"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"

	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"

	"github.com/gosimple/slug"
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

func (ln *linuxDriver) EnsureNetwork(ctx context.Context, nw api.Network, sns []api.Subnet) error {
	log := log.FromContext(ctx)
	log.V(5).Info("Ensuring network", "nw", nw)
	if err := ln.installNetworkNat(ctx, nw); err != nil {
		return err
	}

	if len(nw.DnsRecords()) > 0 {
		hostDir := etcHostMappingDir(nw)
		if err := os.MkdirAll(hostDir, os.ModePerm); err != nil {
			return err
		}
		for ip, hostnames := range nw.DnsRecords() {
			for _, hostname := range hostnames {
				mapping := fmt.Sprintf("%s %s", ip.String(), hostname)
				fileName := slug.Make(hostname)
				mappingFile := filepath.Join(hostDir, fileName)
				if err := os.WriteFile(mappingFile, []byte(mapping), fs.ModePerm); err != nil {
					return fmt.Errorf("unable to write mapping file - %w", err)
				}
			}
		}
	}

	log.V(5).Info("Network ensured")
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

	if err := ln.getOrCreateVeth(ctx, namespace, publicGwCableName, false, mac.Unicast()); err != nil {
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
	defer curNs.Close()
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

		log.V(5).Info("Running dhcp client")
		if err := dhclient4(publicGwCableName.Namespace(), 5, true); err == nil {
			log.V(5).Info("error running dhcp client")
			errCh <- nil
			return
		}
		log.V(5).Info("dhcp client completed")

		errCh <- nil
	}(handle, curNs)

	if err := <-errCh; err != nil {
		return fmt.Errorf("unable to get addr from dhcp - %w", err)
	}

	log.V(5).Info("Network NAT configured")

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

func (ln *linuxDriver) networkFlows(ctx context.Context, nw api.Network) ([]sdn.FlowRule, error) {
	return []sdn.FlowRule{}, nil
}

func (ln *linuxDriver) removeNetworkFlows(ctx context.Context, nw api.Network) error {
	flows, err := ln.networkFlows(ctx, nw)
	if err != nil {
		return err
	}
	ovsClient := sdn.Ovs()

	for _, flow := range flows {
		if err := flow.Remove(ovsClient); err != nil {
			return fmt.Errorf("error adding flow - %w", err)
		}
	}

	return nil

}

func (ln *linuxDriver) installNetworkFlows(ctx context.Context, nw api.Network) error {
	flows, err := ln.networkFlows(ctx, nw)
	if err != nil {
		return err
	}
	ovsClient := sdn.Ovs()

	for _, flow := range flows {

		if err := flow.Install(ovsClient); err != nil {
			return fmt.Errorf("error adding flow - %w", err)
		}
	}

	return nil
}
