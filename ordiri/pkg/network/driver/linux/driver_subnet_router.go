package linux

import (
	"context"
	"fmt"

	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/sdn"
)

func (ln *linuxDriver) EnsureRouter(ctx context.Context, nw api.Network, sn api.Subnet, rtr api.Router) error {
	if err := ln.installRouter(ctx, nw, sn, rtr); err != nil {
		return err
	}
	return nil
}

func (ln *linuxDriver) RemoveRouter(ctx context.Context, nw api.Network, sn api.Subnet, rtr api.Router) error {
	panic("not implemented") // TODO: Implement
}

// func (r *linuxDriver) removeRouter(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
// 	log := log.FromContext(ctx)
// 	internalCableName := subnet.RouterNetworkInternalCableName()
// 	log.Info("Deleting port for router ", "cableName", internalCableName)
// 	// need to create flow rules taking this to the vxlan?
// 	if err := sdn.Ovs().VSwitch.DeletePort(sdn.WorkloadSwitchName, internalCableName+"-out"); err != nil && !isPortNotExist(err) {
// 		return fmt.Errorf("unable to remove ovs port - %w", err)
// 	}

// 	log.Info("Deleting veth cable for router ", "cableName", internalCableName)
// 	if err := removeVeth(internalCableName); err != nil {
// 		return fmt.Errorf("unable to remove ethernet cable - %w", err)
// 	}
// 	ruleSets := r.rulesets(nw.RouterNetworkPublicGatewayCableName()+"-in", internalCableName+"-in")
// 	if handle, err := netns.GetFromName(routerNetworkNamespace); err == nil {
// 		log.Info("removing ip table rules ", "ns", routerNetworkNamespace, "rule_count", len(ruleSets))
// 		defer handle.Close()
// 		ipt, err := sdn.Iptables(routerNetworkNamespace)
// 		if err != nil {
// 			return fmt.Errorf("create iptables - %w", err)
// 		}
// 		for _, ruleSet := range ruleSets {
// 			for _, rule := range ruleSet.Rules {
// 				err := ipt.DeleteIfExists(ruleSet.Table, ruleSet.Chain, rule...)
// 				if err != nil {
// 					return err
// 				}
// 			}
// 		}
// 	} else {
// 		log.Info("router network namespace does not exist, skipping ", "ns", routerNetworkNamespace, "rule_count", len(ruleSets))
// 	}
// 	log.Info("router has been removed from node")
// 	return nil
// }
func (ld *linuxDriver) installRouter(ctx context.Context, nw api.Network, subnet api.Subnet, rtr api.Router) error {
	routerNetworkNamespace := namespaceForRouter(nw)
	err := createNetworkNs(routerNetworkNamespace)
	if err != nil {
		return fmt.Errorf("unable to create router network namespace - %w", err)
	}

	internalRouterCableName := internalRouterCable(nw, subnet)
	if err := ld.getOrCreateVeth(ctx, routerNetworkNamespace, internalRouterCableName); err != nil {
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
func ifname(n string) []byte {
	b := make([]byte, 16)
	copy(b, []byte(n+"\x00"))
	return b
}
