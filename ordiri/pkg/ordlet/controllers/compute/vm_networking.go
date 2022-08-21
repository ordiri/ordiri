package compute

import (
	"context"
	"fmt"
	"time"

	"inet.af/netaddr"
	"libvirt.org/go/libvirtxml"

	internallibvirt "github.com/ordiri/ordiri/pkg/compute/driver/libvirt"
	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network"
	"github.com/ordiri/ordiri/pkg/ordlet"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

// ensureNetworkInterface configures the virtual network for a virtual machine
func (r *VirtualMachineReconciler) ensureNetworkInterface(ctx context.Context, vm *computev1alpha1.VirtualMachine, iface *computev1alpha1.VirtualMachineNetworkInterface) (computev1alpha1.VirtualMachineNetworkInterfaceStatus, internallibvirt.DomainOption, error) {
	status := computev1alpha1.VirtualMachineNetworkInterfaceStatus{
		Name: iface.Key(),
		Mac:  iface.Mac,
	}
	if len(iface.Ips) == 0 {
		return status, nil, fmt.Errorf("vm has not been allocated an IP for %+v yet", iface)
	}
	if err := ordlet.WaitForNetwork(ctx, r.NetworkManager, iface.Network, time.Second*5); err != nil {
		return status, nil, fmt.Errorf("error waiting for network %s - %w", iface.Network, err)
	}
	net := r.NetworkManager.GetNetwork(iface.Network)

	if err := ordlet.WaitForSubnet(ctx, r.NetworkManager, net, iface.Subnet, time.Second*5); err != nil {
		return status, nil, fmt.Errorf("error waiting for subnet %s - %w", iface.Subnet, err)
	}

	subnet := r.NetworkManager.GetSubnet(net, iface.Subnet)

	mac, err := mac.Parse(iface.Mac)
	if err != nil {
		return status, nil, fmt.Errorf("unable to parse supplied mac address - %w", err)
	}

	opts := []network.InterfaceOption{
		network.InterfaceWithMac(mac),
	}
	for _, ip := range iface.Ips {
		ipAddr, err := netaddr.ParseIP(ip)
		if err != nil {
			return status, nil, fmt.Errorf("unable to parse ip addr %q - %w", ip, err)
		}
		opts = append(opts, network.InterfaceWithIps(ipAddr))
	}

	netIface, err := network.NewInterface(iface.Key(), opts...)
	if err != nil {
		return status, nil, fmt.Errorf("unable to create new interface obj - %w", err)
	}

	interfaceName, err := r.NetworkManager.EnsureInterface(ctx, net, subnet, netIface)
	if err != nil {
		return status, nil, fmt.Errorf("unable to ensure interface - %w", err)
	}

	// We assume that the network manager has created an inteface that's ready for us
	// to use
	opt := internallibvirt.WithNetworkInterfaces(libvirtxml.DomainInterface{
		Model: &libvirtxml.DomainInterfaceModel{
			Type: "virtio",
		},
		MAC: &libvirtxml.DomainInterfaceMAC{
			Address: netIface.Mac().String(),
		},
		Target: &libvirtxml.DomainInterfaceTarget{
			Dev:     interfaceName,
			Managed: "no", // we set the mac and link state ourselves
		},
		Source: &libvirtxml.DomainInterfaceSource{
			Ethernet: &libvirtxml.DomainInterfaceSourceEthernet{},
		},
	})

	return status, opt, nil
}
