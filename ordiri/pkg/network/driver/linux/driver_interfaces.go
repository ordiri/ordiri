package linux

import (
	"context"
	"errors"
	"fmt"

	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/vishvananda/netlink"
)

func (ln *linuxDriver) RemoveInterface(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) error {
	return fmt.Errorf("method 'RemoveInterface' not implemented")
}

func (ln *linuxDriver) EnsureInterface(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) (string, error) {
	br, err := ln.createInterfaceBridge(ctx, nw, sn, iface)
	if err != nil {
		return "", err
	}

	tuntap, err := ln.createInterfaceTunTap(ctx, nw, sn, iface, br)
	// create tun/tap device
	if err != nil {
		return "", err
	}

	// install flow rules for vm
	if err := ln.installInterfaceFlows(ctx, nw, sn, iface); err != nil {
		return "", err
	}

	return tuntap.Name, nil
}

func (ln *linuxDriver) createInterfaceBridge(ctx context.Context, nw api.Network, subnet api.Subnet, iface api.Interface) (*netlink.Bridge, error) {
	bridgeName := interfaceBridgeName(nw, subnet, iface)

	nl, err := netlink.LinkByName(bridgeName)
	if err != nil && !errors.As(err, &netlink.LinkNotFoundError{}) {
		return nil, fmt.Errorf("unknown error fetching vm bridge - %w", err)
	}

	var bridge *netlink.Bridge
	if err == nil {
		switch link := nl.(type) {
		case *netlink.Bridge:
			bridge = link
		default:
			if err := netlink.LinkDel(nl); err != nil {
				return nil, fmt.Errorf("unable to delete existing incorrect bridge iface - %w", err)
			}
		}
	}

	if bridge == nil {
		la := netlink.NewLinkAttrs()
		la.Name = bridgeName
		bridge = &netlink.Bridge{LinkAttrs: la}

		if err := netlink.LinkAdd(bridge); err != nil {
			return nil, fmt.Errorf("unable to add new bridge for vm - %w", err)
		}
	}

	if bridge == nil {
		panic("missing netlink device")
	}

	if bridge.OperState != netlink.OperUp {
		if err := netlink.LinkSetUp(bridge); err != nil {
			return nil, fmt.Errorf("unable to start vm bridge - %w", err)
		}
	}

	vlan := subnet.Segment()

	ovsClient := sdn.Ovs()

	if err := ovsClient.VSwitch.AddPort(sdn.WorkloadSwitchName, bridgeName); err != nil {
		return nil, fmt.Errorf("unable to map vm firewall bridge to integration vswitch - %w", err)
	}

	if err := sdn.Ovs().VSwitch.Set.Port(bridgeName, ovs.PortOptions{
		Tag: vlan,
	}); err != nil {
		return nil, fmt.Errorf("unable to set the tag for the bridge port - %w", err)
	}

	return bridge, nil
}

func (ln *linuxDriver) createInterfaceTunTap(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface, ifaceBridge *netlink.Bridge) (*netlink.Tuntap, error) {
	tuntapName := interfaceTunTapName(nw, sn, iface)
	nl, err := netlink.LinkByName(tuntapName)
	if err != nil && !errors.As(err, &netlink.LinkNotFoundError{}) {
		return nil, fmt.Errorf("unknown error fetching existing tuntap device - %w", err)
	}

	var tuntap *netlink.Tuntap
	if nl != nil {
		switch link := nl.(type) {
		case *netlink.Tuntap:
			tuntap = link
		default:
			if err := netlink.LinkDel(nl); err != nil {
				return nil, fmt.Errorf("unable to delete existing incorrect tuntap iface - %w", err)
			}
		}
	}

	if tuntap == nil {
		la := netlink.NewLinkAttrs()
		la.Name = tuntapName
		la.HardwareAddr = iface.Mac()
		tuntap = &netlink.Tuntap{
			LinkAttrs: la,
			Mode:      netlink.TUNTAP_MODE_TAP,
			// Flags:      netlink.TUNTAP_DEFAULTS | netlink.TUNTAP_VNET_HDR,
			Queues:     2,
			NonPersist: false,
		}

		if err := netlink.LinkAdd(tuntap); err != nil {
			return nil, fmt.Errorf("unable to add new tuntap device for vm - %w", err)
		}
	}

	// we could set it on create but this ensure it's always correct and you can't
	// set master on a netlink create message so it's always 2 netlink requests anyway
	if tuntap.MasterIndex != ifaceBridge.Attrs().Index {
		if err := netlink.LinkSetMaster(tuntap, ifaceBridge); err != nil {
			return nil, fmt.Errorf("unable to set the tuntap %s master to the vm bridge %s - %w", tuntap.Name, ifaceBridge.Attrs().Name, err)
		}
	}

	if err := netlink.LinkSetUp(tuntap); err != nil {
		return nil, fmt.Errorf("unable to set tuntap device up - %w", err)
	}
	return tuntap, nil
}
func (ln *linuxDriver) interfaceFlowRules(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) ([]sdn.FlowRule, error) {
	return []sdn.FlowRule{}, nil
}

func (ln *linuxDriver) installInterfaceFlows(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) error {
	flowrules, err := ln.interfaceFlowRules(ctx, nw, sn, iface)
	if err != nil {
		return err
	}
	ovsClient := sdn.Ovs()

	for _, flow := range flowrules {

		if err := flow.Install(ovsClient); err != nil {
			return fmt.Errorf("error adding flow - %w", err)
		}
	}

	return nil
}
