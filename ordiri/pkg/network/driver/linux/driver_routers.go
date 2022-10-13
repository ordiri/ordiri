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
	"inet.af/netaddr"
)

func (ld *linuxDriver) EnsureRouter(ctx context.Context, nw api.Network, sn api.Subnet) error {
	if err := ld.installRouter(ctx, nw, sn); err != nil {
		return err
	}
	return nil
}

func (ld *linuxDriver) RemoveRouter(ctx context.Context, nw api.Network, sn api.Subnet) error {
	log := log.FromContext(ctx)
	routerNetworkNamespace := namespaceForRouter(nw)

	internalRouterCableName := internalRouterCable(nw, sn)

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

func (ld *linuxDriver) installRouter(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	routerNetworkNamespace := namespaceForRouter(nw)
	err := createNetworkNs(routerNetworkNamespace)
	if err != nil {
		return fmt.Errorf("unable to create router network namespace - %w", err)
	}

	internalRouterCableName := internalRouterCable(nw, subnet)
	if err := ld.getOrCreateVeth(ctx, routerNetworkNamespace, "router:"+nw.Name()+":"+subnet.Name(), internalRouterCableName, true, subnet.RouterGlobalMac()); err != nil {
		return fmt.Errorf("unable to create internal veth cable - %w", err)
	}

	// Get the first ip
	rtrIp := netaddr.IPPrefixFrom(subnet.Cidr().IP().Next(), subnet.Cidr().Bits())
	if err := setNsVethIp(routerNetworkNamespace, rtrIp, internalRouterCableName.Namespace()); err != nil {
		return fmt.Errorf("unable to set router address - %w", err)
	}
	ovsClient := sdn.Ovs()

	// need to create flow rules taking this to the vxlan?
	if err := ovsClient.VSwitch.AddPort(sdn.WorkloadSwitchName, internalRouterCableName.Root()); err != nil {
		return err
	}

	if err := ovsClient.VSwitch.Set.Port(internalRouterCableName.Root(), ovs.PortOptions{
		Tag: subnet.Segment(),
	}); err != nil {
		return err
	}

	curNs, err := netns.Get()
	if err != nil {
		return fmt.Errorf("unable to get current network ns - %w", err)
	}
	curNs.Close()
	handle, err := netns.GetFromName(routerNetworkNamespace)
	if err != nil {
		return fmt.Errorf("unable to get namespace for public gateway ns - %w", err)
	}

	defer handle.Close()
	ctx, cancel := context.WithCancel(context.Background())
	// only in a goroutine to keep it away from other namespaces
	go func(targetNs netns.NsHandle, curNs netns.NsHandle) {
		defer cancel()
		handle, err := netlink.NewHandleAt(handle)
		if err != nil {
			panic(err.Error())
		}
		iface, err := handle.LinkByName(internalRouterCableName.Namespace())
		if err != nil {
			panic(err.Error())
		}
		for ip, mac := range subnet.KnownMacs() {

			err := handle.NeighSet(&netlink.Neigh{
				LinkIndex:    iface.Attrs().Index,
				State:        netlink.NUD_PERMANENT,
				IP:           ip.IPAddr().IP,
				HardwareAddr: mac,
			})
			if err != nil {
				panic(err)
			}
		}
	}(handle, curNs)
	<-ctx.Done()

	routerFlow := &sdn.Router{
		DistributedMac: subnet.RouterGlobalMac(),
		HostLocalMac:   subnet.RouterMac(),
		IP:             subnet.Cidr().IP().Next(),
		Segment:        subnet.Segment(),
	}

	if err := routerFlow.Install(ovsClient); err != nil {
		return fmt.Errorf("unable to install flows for router - %w", err)
	}
	// staticEntryFlow := &sdn.StaticPortEntry{
	// 	Switch:  sdn.WorkloadSwitchName,
	// 	Port:    internalRouterCableName.Root(),
	// 	Segment: subnet.Segment(),
	// 	MacAddr: rtr.Mac(),
	// }
	// if err := staticEntryFlow.Install(ovsClient); err != nil {
	// 	return fmt.Errorf("unable to install static mac entry flow for router")
	// }

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
