package linux

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"

	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/gosimple/slug"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/vishvananda/netlink"
)

func (ln *linuxDriver) RemoveInterface(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) error {
	// Remove the  flow rules for vm
	if err := ln.removeInterfaceFlows(ctx, nw, sn, iface); err != nil {
		return err
	}

	// remove tun/tap device
	if err := ln.removeInterfaceTunTap(ctx, nw, sn, iface); err != nil {
		return err
	}

	if err := ln.removeInterfaceBridge(ctx, nw, sn, iface); err != nil {
		return err
	}

	return nil
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

func (ln *linuxDriver) removeInterfaceBridge(ctx context.Context, nw api.Network, subnet api.Subnet, iface api.Interface) error {
	bridgeName := interfaceBridgeName(nw, subnet, iface)

	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.DeletePort(sdn.WorkloadSwitchName, bridgeName); err != nil && !isPortNotExist(err) {
		return fmt.Errorf("unable to remove interface bridge port from ovs switch - %w", err)
	}

	if _, iface := ln.interfaces.search(bridgeName); iface != nil {
		if err := netlink.LinkDel(iface); err != nil {
			return err
		}
	}

	return nil
}

func (ln *linuxDriver) removeInterfaceTunTap(ctx context.Context, nw api.Network, subnet api.Subnet, iface api.Interface) error {
	bridgeName := interfaceTunTapName(nw, subnet, iface)

	if _, iface := ln.interfaces.search(bridgeName); iface != nil {
		if err := netlink.LinkDel(iface); err != nil {
			return err
		}
	}

	return nil
}

func (ln *linuxDriver) createInterfaceBridge(ctx context.Context, nw api.Network, subnet api.Subnet, iface api.Interface) (*netlink.Bridge, error) {
	bridgeName := interfaceBridgeName(nw, subnet, iface)

	// todo: convert this to use the interfaces list
	// that's streaming from netlink subscription
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
		la.MTU = sdn.OverlayMTU
		bridge = &netlink.Bridge{LinkAttrs: la}

		if err := netlink.LinkAdd(bridge); err != nil {
			return nil, fmt.Errorf("unable to add new bridge for vm - %w", err)
		}
	}
	if bridge.MTU != sdn.OverlayMTU {
		if err := netlink.LinkSetMTU(bridge, sdn.OverlayMTU); err != nil {
			return nil, fmt.Errorf("unable to set mtu - %w", err)
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

	if len(iface.IP()) > 0 {
		// todo: This is pretty incorrect but it works for now
		// it's incorrect because of the idea that hostnames are bound to an
		// interface + ip in the vm_networking so here we would return
		// the wrong ip for a multi ip interface
		// post this comment the dns stuff was moved to the network to enable us
		// to create dns records for the entire network
		if len(iface.IP()) > 0 {
			addr := iface.IP()[0]
			dhcpHostDir := dhcpHostMappingDir(nw, sn)
			mapping := fmt.Sprintf("%s,%s,%s", iface.Mac(), addr.String(), iface.Hostnames()[0])
			fileName := slug.Make(addr.String())
			hostFile := filepath.Join(dhcpHostDir, fileName)
			if err := os.WriteFile(hostFile, []byte(mapping), fs.ModePerm); err != nil {
				return nil, fmt.Errorf("unable to write host mapping file - %w", err)
			}
		}
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

		la.MTU = sdn.OverlayMTU
		tuntap = &netlink.Tuntap{
			LinkAttrs:  la,
			Mode:       netlink.TUNTAP_MODE_TAP,
			Flags:      netlink.TUNTAP_DEFAULTS | netlink.TUNTAP_VNET_HDR,
			NonPersist: false,
			Queues:     1,
		}

		if err := netlink.LinkAdd(tuntap); err != nil {
			return nil, fmt.Errorf("unable to add new tuntap device for vm - %w", err)
		}
	}
	if tuntap.MTU != sdn.OverlayMTU {
		if err := netlink.LinkSetMTU(tuntap, sdn.OverlayMTU); err != nil {
			return nil, fmt.Errorf("unable to set mtu - %w", err)
		}
	}

	if tuntap.Attrs().HardwareAddr.String() != iface.Mac().String() {
		if err := netlink.LinkSetHardwareAddr(tuntap, iface.Mac()); err != nil {
			return nil, fmt.Errorf("unable to set the tuntap %s ethernet address to %s - %w", tuntap.Name, iface.Mac().String(), err)
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
	return []sdn.FlowRule{
		&sdn.VirtualMachine{
			WorkloadSwitch:   sdn.WorkloadSwitchName,
			WorkloadPort:     interfaceBridgeName(nw, sn, iface),
			MetadataPort:     metadataCableName(nw, sn).Root(),
			MetadataMac:      metaMac(),
			Mac:              iface.Mac(),
			Segment:          sn.Segment(),
			Ips:              iface.IP(),
			StrictSourceDest: true,
		},
	}, nil
}

func (ln *linuxDriver) removeInterfaceFlows(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) error {
	flowrules, err := ln.interfaceFlowRules(ctx, nw, sn, iface)
	if err != nil {
		return err
	}

	ovsClient := sdn.Ovs()

	for _, flow := range flowrules {
		if err := flow.Remove(ovsClient); err != nil {
			return fmt.Errorf("error removing flow - %w", err)
		}
	}

	return nil
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
