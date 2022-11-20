package compute

import (
	"context"
	"fmt"
	"strings"

	"inet.af/netaddr"
	"libvirt.org/go/libvirtxml"

	internallibvirt "github.com/ordiri/ordiri/pkg/compute/driver/libvirt"
	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

// RegisterNetworkInterface configures the virtual network for a virtual machine
func (r *VirtualMachineReconciler) RegisterNetworkInterface(ctx context.Context, vm *computev1alpha1.VirtualMachine, iface *computev1alpha1.VirtualMachineNetworkInterface) (computev1alpha1.VirtualMachineNetworkInterfaceStatus, internallibvirt.DomainOption, error) {
	status := computev1alpha1.VirtualMachineNetworkInterfaceStatus{
		Name: iface.Key(vm.Name),
		Mac:  iface.Mac,
	}
	if len(iface.Ips) == 0 {
		return status, nil, fmt.Errorf("vm has not been allocated an IP for %+v yet", iface)
	}

	mac, err := mac.Parse(iface.Mac)
	if err != nil {
		return status, nil, fmt.Errorf("unable to parse supplied mac address - %w", err)
	}

	hostnames := []string{
		vm.Name,
		vm.Name + ".ordiri",
	}
	opts := []network.InterfaceOption{
		network.InterfaceWithMac(mac),
	}

	for _, ip := range iface.Ips {
		ipAddr, err := netaddr.ParseIPPrefix(ip)
		if err != nil {
			return status, nil, fmt.Errorf("unable to parse ip addr %q - %w", ip, err)
		}

		if r.PublicCidr.Contains(ipAddr.IP()) {
			opts = append(opts, network.InterfaceWithPublicIps(ipAddr))
		} else {
			opts = append(opts, network.InterfaceWithPrivateIps(ipAddr))
		}
		dnsIp := strings.ReplaceAll(ipAddr.String(), ".", "-")
		hostnames = append(hostnames, dnsIp)
		hostnames = append(hostnames, dnsIp+".ordiri")

	}
	opts = append(opts, network.InterfaceWithHostnames(hostnames...))

	netIface, err := network.NewInterface(iface.Key(vm.Name), opts...)
	if err != nil {
		return status, nil, fmt.Errorf("unable to create new interface obj - %w", err)
	}

	interfaceName, err := r.NetworkManager.AttachInterface(ctx, iface.Network, iface.Subnet, netIface)
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
