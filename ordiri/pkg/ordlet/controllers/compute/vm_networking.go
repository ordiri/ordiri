package compute

import (
	"context"
	"errors"
	"fmt"

	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/types"
	"libvirt.org/go/libvirtxml"
	"sigs.k8s.io/controller-runtime/pkg/client"
	k8log "sigs.k8s.io/controller-runtime/pkg/log"

	"github.com/digitalocean/go-openvswitch/ovs"
	internallibvirt "github.com/ordiri/ordiri/pkg/libvirt"
	"github.com/ordiri/ordiri/pkg/network/sdn"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/vishvananda/netlink"
)

func (r *VirtualMachineReconciler) getNetworkInterface(ctx context.Context, vm *computev1alpha1.VirtualMachine, iface *computev1alpha1.VirtualMachineNetworkInterface) (computev1alpha1.VirtualMachineNetworkInterfaceStatus, internallibvirt.DomainOption, error) {
	nw, subnet, err := r.interfaceSubnet(ctx, vm, iface)
	status := computev1alpha1.VirtualMachineNetworkInterfaceStatus{
		Name: iface.Key(),
		Mac:  iface.Mac,
	}

	if err != nil {
		return status, nil, fmt.Errorf("error getting subnet for interface %s/%s on vm %s - %w", iface.Network, iface.Subnet, vm.Name, err)
	}

	bridgeName, err := r.configureVirtualNetwork(ctx, vm, nw, subnet)
	if err != nil {
		return status, nil, err
	}

	// log.Info("found valid subnet for virtual machine interface", "interface", iface, "bridge", bridgeName)

	opt := internallibvirt.WithNetworkInterfaces(libvirtxml.DomainInterface{
		Model: &libvirtxml.DomainInterfaceModel{
			Type: "virtio",
		},
		MAC: &libvirtxml.DomainInterfaceMAC{
			Address: iface.Mac,
		},
		Target: &libvirtxml.DomainInterfaceTarget{
			Dev: subnet.VMTap(vm),
		},
		Source: &libvirtxml.DomainInterfaceSource{
			Bridge: &libvirtxml.DomainInterfaceSourceBridge{
				Bridge: bridgeName,
			},
		},
	})

	return status, opt, nil
}
func (r *VirtualMachineReconciler) interfaceSubnet(ctx context.Context, vm *computev1alpha1.VirtualMachine, iface *computev1alpha1.VirtualMachineNetworkInterface) (*networkv1alpha1.Network, *networkv1alpha1.Subnet, error) {
	subnet := &networkv1alpha1.Subnet{}
	subnet.Name = iface.Subnet
	if err := r.Client.Get(ctx, client.ObjectKeyFromObject(subnet), subnet); err != nil {
		return nil, nil, err
	}

	nw, err := r.networkForSubnet(ctx, subnet)

	return nw, subnet, err
}

func (r *VirtualMachineReconciler) networkForSubnet(ctx context.Context, iface *networkv1alpha1.Subnet) (*networkv1alpha1.Network, error) {
	network := networkv1alpha1.Network{}
	if err := r.Client.Get(ctx, types.NamespacedName{Name: iface.Spec.Network.Name}, &network); err != nil {
		if k8err.IsNotFound(err) {
			return nil, nil
		}
		return nil, err
	}

	return &network, nil
}

func (r *VirtualMachineReconciler) flows(ctx context.Context, vm *computev1alpha1.VirtualMachine, subnet *networkv1alpha1.Subnet, subnetBridge string, vlan int, vni int64) []sdn.FlowRule {
	return []sdn.FlowRule{
		&sdn.WorkloadEgress{
			Switch:        sdn.WorkloadSwitchName,
			Port:          subnetBridge,
			NodeLocalVlan: vlan,
		},
	}
}

func (r *VirtualMachineReconciler) installFlows(ctx context.Context, vm *computev1alpha1.VirtualMachine, subnet *networkv1alpha1.Subnet, subnetBridge string, vlan int, vni int64) error {
	ovsClient := sdn.Ovs()
	for _, flow := range r.flows(ctx, vm, subnet, subnetBridge, vlan, vni) {

		if err := flow.Install(ovsClient); err != nil {
			return fmt.Errorf("error creating flow rule adding vlan tag to vm bridge - %w", err)
		}
	}

	return nil
}
func (r *VirtualMachineReconciler) configureVirtualNetwork(ctx context.Context, vm *computev1alpha1.VirtualMachine, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) (bridgeName string, err error) {
	log := k8log.FromContext(ctx)

	vlan, err := r.Node.GetNode().SubnetVlanId(subnet.Name)

	if err != nil {
		return "", fmt.Errorf("unable to configure virtual network - %w", err)
	}

	log.Info("Getting node bridge")
	bridgeName, err = r.ensureSubnetBridgeExists(ctx, subnet, vm)
	if err != nil {
		return "", fmt.Errorf("unable to get bridge for vm - %w", err)
	}

	log.Info("Installing flows for vm")
	if err := r.installFlows(ctx, vm, subnet, bridgeName, vlan, nw.Status.Vni); err != nil {
		return "", fmt.Errorf("unable to insall fflows - %w", err)
	}

	return bridgeName, nil
}

func (r *VirtualMachineReconciler) ensureSubnetBridgeExists(ctx context.Context, subnet *networkv1alpha1.Subnet, vm *computev1alpha1.VirtualMachine) (string, error) {
	bridgeName := subnet.VMBridge(vm)
	nl, err := netlink.LinkByName(bridgeName)
	if err != nil && errors.As(err, &netlink.LinkNotFoundError{}) {
		la := netlink.NewLinkAttrs()
		la.Name = bridgeName
		nl = &netlink.Bridge{LinkAttrs: la}

		err := netlink.LinkAdd(nl)
		if err != nil {
			return "", fmt.Errorf("unable to add new bridge for vm - %w", err)
		}
	} else if err != nil {
		return "", fmt.Errorf("unknown error fetching vm bridge - %w", err)
	}

	if nl == nil {
		panic("missing netlink device")
	}

	if err := netlink.LinkSetUp(nl); err != nil {
		return "", fmt.Errorf("unable to start vm bridge - %w", err)
	}

	vlan, err := r.Node.GetNode().SubnetVlanId(subnet.Name)
	if err != nil {
		return "", fmt.Errorf("unable to ensure bridge exists - %w", err)
	}

	ovsClient := sdn.Ovs()

	if err = ovsClient.VSwitch.AddPort(sdn.WorkloadSwitchName, bridgeName); err != nil {
		return "", fmt.Errorf("unable to map vm firewall bridge to integration vswitch - %w", err)
	}
	if err := sdn.Ovs().VSwitch.Set.Port(bridgeName, ovs.PortOptions{
		Tag: vlan,
	}); err != nil {
		return "", fmt.Errorf("unable to set the tag for the bridge port - %w", err)
	}

	return bridgeName, nil
}
