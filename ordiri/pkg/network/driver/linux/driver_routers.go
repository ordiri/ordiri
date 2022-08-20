package linux

import (
	"context"
	"fmt"

	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
)

func (ld *linuxDriver) EnsureRouter(ctx context.Context, nw api.Network, sn api.Subnet, rtr api.Router) error {
	if err := ld.installRouter(ctx, nw, sn, rtr); err != nil {
		return err
	}
	return nil
}

func (ld *linuxDriver) RemoveRouter(ctx context.Context, nw api.Network, sn api.Subnet, rtr api.Router) error {
	log := log.FromContext(ctx)
	routerNetworkNamespace := namespaceForRouter(nw)

	internalRouterCableName := internalRouterCable(nw, sn, rtr)

	if _, iface := ld.interfaces.search(internalRouterCableName.Root()); iface != nil {
		if err := netlink.LinkDel(iface); err != nil {
			return err
		}
	}

	log.Info("Deleting port for router ", "cableName", internalRouterCableName)
	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.DeletePort(sdn.WorkloadSwitchName, internalRouterCableName.Root()); err != nil && !isPortNotExist(err) {
		return fmt.Errorf("unable to remove ovs port - %w", err)
	}

	ruleSets := ld.rulesets(publicGwCable(nw).Namespace(), internalRouterCableName.Namespace())
	if handle, err := netns.GetFromName(routerNetworkNamespace); err == nil {
		log.Info("removing ip table rules ", "ns", routerNetworkNamespace, "rule_count", len(ruleSets))
		defer handle.Close()
		ipt, err := sdn.Iptables(routerNetworkNamespace)
		if err != nil {
			return fmt.Errorf("create iptables - %w", err)
		}
		for _, ruleSet := range ruleSets {
			for _, rule := range ruleSet.Rules {
				err := ipt.DeleteIfExists(ruleSet.Table, ruleSet.Chain, rule...)
				if err != nil {
					return err
				}
			}
		}
	} else {
		log.Info("router network namespace does not exist, skipping ", "ns", routerNetworkNamespace, "rule_count", len(ruleSets))
	}
	log.Info("router has been removed from node")
	return nil
}

func (ld *linuxDriver) installRouter(ctx context.Context, nw api.Network, subnet api.Subnet, rtr api.Router) error {
	routerNetworkNamespace := namespaceForRouter(nw)
	err := createNetworkNs(routerNetworkNamespace)
	if err != nil {
		return fmt.Errorf("unable to create router network namespace - %w", err)
	}

	internalRouterCableName := internalRouterCable(nw, subnet, rtr)
	if err := ld.getOrCreateVeth(ctx, routerNetworkNamespace, internalRouterCableName, rtr.Mac()); err != nil {
		return fmt.Errorf("unable to create internal veth cable - %w", err)
	}

	if err := setNsVethIp(routerNetworkNamespace, subnet.Cidr().IP().Next().String()+"/"+fmt.Sprint(subnet.Cidr().Bits()), internalRouterCableName.Namespace()); err != nil {
		return fmt.Errorf("unable to set router address - %w", err)
	}

	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.AddPort(sdn.WorkloadSwitchName, internalRouterCableName.Root()); err != nil {
		return err
	}

	if err := sdn.Ovs().VSwitch.Set.Port(internalRouterCableName.Root(), ovs.PortOptions{
		Tag: subnet.Segment(),
	}); err != nil {
		return err
	}

	ipt, err := sdn.Iptables(routerNetworkNamespace)
	if err != nil {
		return err
	}

	publicGwCableName := publicGwCable(nw)

	ruleSets := ld.rulesets(publicGwCableName.Namespace(), internalRouterCableName.Namespace())

	for _, ruleSet := range ruleSets {
		for _, rule := range ruleSet.Rules {
			err := ipt.AppendUnique(ruleSet.Table, ruleSet.Chain, rule...)
			if err != nil {
				return err
			}
		}
	}

	return nil
	// return fmt.Errorf("not uimplemented")
}

func (nw *linuxDriver) rulesets(externalCablename string, internalCableName string) []iptRule {
	return []iptRule{{
		Table: "filter",
		Chain: "FORWARD",
		Rules: [][]string{
			{"-i", externalCablename, "-o", internalCableName, "-j", "ACCEPT"},
			{"-i", internalCableName, "-o", externalCablename, "-j", "ACCEPT"},
		},
	},
	}
}
