package compute

import (
	"context"
	"fmt"

	"libvirt.org/go/libvirtxml"

	internallibvirt "github.com/ordiri/ordiri/pkg/compute/driver/libvirt"
	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

// ensureNetworkInterface configures the virtual network for a virtual machine
func (r *VirtualMachineReconciler) ensureNetworkInterface(ctx context.Context, vm *computev1alpha1.VirtualMachine, iface *computev1alpha1.VirtualMachineNetworkInterface) (computev1alpha1.VirtualMachineNetworkInterfaceStatus, internallibvirt.DomainOption, error) {
	status := computev1alpha1.VirtualMachineNetworkInterfaceStatus{
		Name: iface.Key(),
		Mac:  iface.Mac,
	}
	if !r.NetworkManager.HasNetwork(iface.Network) {
		return status, nil, fmt.Errorf("network %s does not exist", iface.Network)
	}
	net := r.NetworkManager.GetNetwork(iface.Network)

	if !r.NetworkManager.HasSubnet(net, iface.Subnet) {
		return status, nil, fmt.Errorf("subnet %s does not exist", iface.Network)
	}
	subnet := r.NetworkManager.GetSubnet(net, iface.Subnet)

	mac, err := mac.Parse(iface.Mac)
	if err != nil {
		return status, nil, fmt.Errorf("unable to parse supplied mac address - %w", err)
	}

	netIface, err := network.NewInterface(iface.Key(), network.InterfaceWithMac(mac))
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
