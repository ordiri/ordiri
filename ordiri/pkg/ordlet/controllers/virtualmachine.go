/*
Copyright 2022.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.aoeaoeaoeao
*/

package controllers

import (
	"context"
	"errors"
	"fmt"
	"net"
	"time"

	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"libvirt.org/go/libvirtxml"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	k8log "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/predicate"

	"github.com/digitalocean/go-libvirt"
	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/google/uuid"
	internallibvirt "github.com/ordiri/ordiri/pkg/libvirt"
	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/ordiri/ordiri/pkg/ordlet"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/vishvananda/netlink"
)

// VirtualMachineReconciler reconciles a VirtualMachine object
type VirtualMachineReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	Node ordlet.NodeProvider
}

const poolName = "pool"

//+kubebuilder:rbac:groups=compute,resources=virtualmachines,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=compute,resources=virtualmachines/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=compute,resources=virtualmachines/finalizers,verbs=update

const (
	FinalizerNameVmProvisioned = "compute.ordiri.com/virtual-machine-provisioned"
)

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the VirtualMachine object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *VirtualMachineReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := k8log.FromContext(ctx)
	log.V(5).Info("Starting to reconcile", "request", req)
	if r.Node.GetNode().UID == "" {
		log.V(5).Info("requeueing, no node set yet")
		return ctrl.Result{RequeueAfter: time.Second * 1}, nil
	}

	hasChanged := false

	vm := &computev1alpha1.VirtualMachine{}
	if err := r.Client.Get(ctx, req.NamespacedName, vm); err != nil {
		if k8err.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}
	log = log.WithValues("vm", vm.Name)
	scheduledNode, scheduled := vm.ScheduledNode()

	if scheduledNode != r.Node.GetNode().Name {
		return ctrl.Result{}, nil
	}

	if !vm.DeletionTimestamp.IsZero() {
		log.V(5).Info("Detected VM in deletion mode")
		return r.ReconcileDeletion(ctx, vm)
	}

	hasFinalizer := false
	for _, name := range vm.GetFinalizers() {
		if name == FinalizerNameVmProvisioned {
			hasFinalizer = true
		}
	}

	if !hasFinalizer {
		log.V(5).Info("adding finalizer to VM")
		vm.SetFinalizers(append(vm.GetFinalizers(), FinalizerNameVmProvisioned))
		if err := r.Client.Update(ctx, vm); err != nil {
			return ctrl.Result{}, err
		}

		return ctrl.Result{}, nil
	}

	if !scheduled {
		log.Info("vm has not been scheduled on a node yet")
		return ctrl.Result{RequeueAfter: time.Second * 5}, nil
	}

	lc := internallibvirt.Local()

	domain := r.GetDomain(lc, vm)

	needsCreate := domain == nil
	hasChanged = hasChanged || needsCreate

	if needsCreate {
		log.V(5).Info("creating new virtual machine")
		domainOptions := []internallibvirt.DomainOption{
			internallibvirt.WithBootDevice(vm.Spec.BootDevices...),
			internallibvirt.WithConsole(0, "serial"),
			internallibvirt.WithCpu(2),
			internallibvirt.WithMemory(4 * 1e6),
		}

		pool, err := r.EnsurePool(lc, poolName)
		if err != nil {
			return ctrl.Result{}, err
		}

		vm.Status.Disks = []computev1alpha1.VirtualMachineDiskStatus{}
		for _, disk := range vm.Spec.Disks {
			volume, err := r.EnsureVolume(lc, vm, pool, disk)
			if err != nil {
				return ctrl.Result{}, err
			}
			domainOptions = append(domainOptions, internallibvirt.WithPoolVolume(poolName, volume.Name))
			vm.Status.Disks = append(vm.Status.Disks, computev1alpha1.VirtualMachineDiskStatus{
				Name:       disk.Name,
				VolumeName: volume.Name,
				Size:       disk.Size,
			})
		}

		vm.Status.NetworkInterfaces = []computev1alpha1.VirtualMachineNetworkInterfaceStatus{}
		if len(vm.Spec.NetworkInterfaces) > 0 {
			for _, iface := range vm.Spec.NetworkInterfaces {

				nw, subnet, err := r.interfaceSubnet(ctx, vm, iface)
				if err != nil {
					return ctrl.Result{}, fmt.Errorf("error getting subnet for interface %s/%s on vm %s - %w", iface.Network, iface.Subnet, vm.Name, err)
				}

				bridgeName, macAddr, err := r.configureVirtualNetwork(ctx, vm, nw, subnet)
				if err != nil {
					return ctrl.Result{}, err
				}

				log.Info("found valid subnet for virtual machine interface", "interface", iface, "bridge", bridgeName)

				domainOptions = append(domainOptions, internallibvirt.WithNetworkInterfaces(libvirtxml.DomainInterface{
					Model: &libvirtxml.DomainInterfaceModel{
						Type: "virtio",
					},
					MAC: &libvirtxml.DomainInterfaceMAC{
						Address: macAddr.String(),
					},
					Target: &libvirtxml.DomainInterfaceTarget{
						Dev: subnet.VMTap(vm),
					},
					Source: &libvirtxml.DomainInterfaceSource{
						Bridge: &libvirtxml.DomainInterfaceSourceBridge{
							Bridge: bridgeName,
						},
					},
				}))

				vm.Status.NetworkInterfaces = append(vm.Status.NetworkInterfaces, computev1alpha1.VirtualMachineNetworkInterfaceStatus{
					Name: iface.Network,
					Mac:  macAddr.String(),
				})
			}
		}

		domain, err := internallibvirt.NewDomain(vm.Name, domainOptions...)
		if err != nil {
			return ctrl.Result{}, err
		}
		domain.Description = "Created by the golang scheduler"
		domain.Clock = &libvirtxml.DomainClock{
			Offset: "utc",
		}

		if err != nil {
			return ctrl.Result{}, err
		}
		domain.UUID = string(vm.UID)

		domainStr, err := domain.Marshal()
		if err != nil {
			return ctrl.Result{}, err
		}

		dom, err := lc.DomainDefineXMLFlags(domainStr, 0)
		if err != nil {
			return ctrl.Result{}, err
		}
		log.V(5).Info("created virtual machine")
		dom, err = lc.DomainCreateWithFlags(dom, uint32(libvirt.DomainStartPaused))
		if err != nil {
			return ctrl.Result{}, err
		}
		log = log.WithValues("domain", uuid.Must(uuid.FromBytes([]byte(dom.UUID[:]))).String())

	} else {
		log.V(5).Info("found existing virtual machine")
		log = log.WithValues("domain", uuid.Must(uuid.FromBytes([]byte(domain.UUID[:]))).String())
	}

	domain = r.GetDomain(lc, vm)
	if domain == nil {
		return ctrl.Result{}, fmt.Errorf("unable to finhd provisioned vm")
	}

	state, reason, err := lc.DomainGetState(*domain, 0)
	if err != nil {
		return ctrl.Result{}, err
	}
	log.Info("got the virtual machine state", "state", state, "reason", reason)

	if vm.Spec.State == computev1alpha1.VirtualMachineStatePaused && state != int32(libvirt.DomainPaused) {
		if err := lc.DomainSuspend(*domain); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to suspend domain - %w", err)
		}
	} else if vm.Spec.State == computev1alpha1.VirtualMachineStateRunning && state != int32(libvirt.DomainRunning) {
		if err := lc.DomainResume(*domain); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to resume domain - %w", err)
		}
	}

	machine := &corev1alpha1.Machine{}
	machine.Name = string(vm.UID)
	_, err = ctrl.CreateOrUpdate(ctx, r.Client, machine, func() error {
		if machine.Spec.Properties == nil {
			machine.Spec.Properties = []corev1alpha1.MachineProperty{}
		}
		machine.Spec.Role = vm.Spec.Role
		if machine.Spec.Approved == nil || !*machine.Spec.Approved {
			approved := true
			machine.Spec.Approved = &approved
		}
		existingProps, err := machine.Properties()
		if err != nil {
			return err
		}
		if _, ok := existingProps["VirtualMachineOwner"]; !ok {
			machine.Spec.Properties = append(machine.Spec.Properties, corev1alpha1.MachineProperty{
				Name:  "VirtualMachineOwner",
				Value: string(vm.UID),
			})
		}
		return ctrl.SetControllerReference(vm, machine, r.Scheme)
	})
	if err != nil {
		return ctrl.Result{}, err
	}

	log = log.WithValues("machine", machine.Name)
	log.V(5).Info("found the machine")
	if vm.Status.ObservedGeneration != vm.Generation {
		vm.Status.ObservedGeneration = vm.Generation
		hasChanged = true
	}

	if hasChanged {
		err = r.Client.Status().Update(ctx, vm)
		if err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *VirtualMachineReconciler) flows(ctx context.Context, vm *computev1alpha1.VirtualMachine, subnet *networkv1alpha1.Subnet, subnetBridge string, vlan int, vni uint64) []sdn.FlowRule {
	return []sdn.FlowRule{
		&sdn.WorkloadEgress{
			Switch:        sdn.WorkloadSwitchName,
			Port:          subnetBridge,
			NodeLocalVlan: vlan,
		},
	}
}

func (r *VirtualMachineReconciler) installFlows(ctx context.Context, vm *computev1alpha1.VirtualMachine, subnet *networkv1alpha1.Subnet, subnetBridge string, vlan int, vni uint64) error {
	ovsClient := sdn.Ovs()
	for _, flow := range r.flows(ctx, vm, subnet, subnetBridge, vlan, vni) {

		if err := flow.Install(ovsClient); err != nil {
			return fmt.Errorf("error creating flow rule adding vlan tag to vm bridge - %w", err)
		}
	}

	return nil
}
func (r *VirtualMachineReconciler) configureVirtualNetwork(ctx context.Context, vm *computev1alpha1.VirtualMachine, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) (bridgeName string, macAddr net.HardwareAddr, err error) {
	log := k8log.FromContext(ctx)
	macAddr = mac.Unicast()

	vlan, err := r.Node.GetNode().SubnetVlanId(subnet.Name)

	if err != nil {
		return "", nil, fmt.Errorf("unable to configure virtual network - %w", err)
	}

	log.Info("Getting node bridge")
	bridgeName, err = r.ensureSubnetBridgeExists(ctx, subnet, vm)
	if err != nil {
		return "", nil, fmt.Errorf("unable to get bridge for vm - %w", err)
	}

	log.Info("Installing flows for vm")
	if err := r.installFlows(ctx, vm, subnet, bridgeName, vlan, nw.Status.Vni); err != nil {
		return "", nil, fmt.Errorf("unable to insall fflows - %w", err)
	}

	return bridgeName, macAddr, nil
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
func (r *VirtualMachineReconciler) ReconcileDeletion(ctx context.Context, vm *computev1alpha1.VirtualMachine) (ctrl.Result, error) {
	log := k8log.FromContext(ctx)
	lc := internallibvirt.Local()

	domain := r.GetDomain(lc, vm)
	if domain != nil {
		log.V(5).Info("destroying vm")

		state, reason, err := lc.DomainGetState(*domain, 0)
		if err != nil {
			return ctrl.Result{}, err
		}
		log.Info("got the virtual machine state", "state", state, "reason", reason)
		if libvirt.DomainState(state) == libvirt.DomainRunning || libvirt.DomainState(state) == libvirt.DomainPaused {
			if err := lc.DomainDestroyFlags(*domain, libvirt.DomainDestroyDefault); err != nil {
				return ctrl.Result{}, err
			}
		}

		log.V(5).Info("undefining Vm")
		if err := lc.DomainUndefineFlags(*domain, 0); err != nil {
			return ctrl.Result{}, err
		}
	}

	ovsClient := sdn.Ovs()
	for _, iface := range vm.Spec.NetworkInterfaces {
		nw, subnet, err := r.interfaceSubnet(ctx, vm, iface)
		if err != nil {
			return ctrl.Result{}, err
		}
		vlanId, err := r.Node.GetNode().SubnetVlanId(subnet.Name)
		if err == nil {
			flows := r.flows(ctx, vm, subnet, subnet.VMBridge(vm), vlanId, nw.Status.Vni)

			for _, flow := range flows {
				if err := flow.Remove(ovsClient); err != nil {
					return ctrl.Result{}, err
				}
			}
		}

		bridgeName := subnet.VMBridge(vm)

		if err := ovsClient.VSwitch.DeletePort(sdn.WorkloadSwitchName, bridgeName); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to delete switch port - %w", err)
		}
		nl, err := netlink.LinkByName(bridgeName)
		if err != nil && !errors.As(err, &netlink.LinkNotFoundError{}) {
			return ctrl.Result{}, fmt.Errorf("error fetching netlink device - %w", err)
		}

		if nl != nil {
			if err := netlink.LinkDel(nl); err != nil {
				return ctrl.Result{}, fmt.Errorf("error destroying vm bridge - %w", err)
			}
		}

	}

	pool, err := lc.StoragePoolLookupByName(poolName)
	if err == nil && pool.Name != "" {
		for _, disk := range vm.Status.Disks {
			vol, err := lc.StorageVolLookupByName(pool, disk.VolumeName)
			log.V(5).Info("removing volume", "volume", disk.VolumeName, "volume", vol, "err", err)
			if err != nil {
				continue
			}
			if err := lc.StorageVolDelete(vol, 0); err != nil {
				return ctrl.Result{}, err
			}
		}
	}

	machine := &corev1alpha1.Machine{}
	machine.Name = string(vm.UID)
	if err := r.Client.Delete(ctx, machine); !k8err.IsNotFound(err) {
		return ctrl.Result{}, err

	}

	finalizers := []string{}
	for _, finalizer := range vm.GetFinalizers() {
		if finalizer != FinalizerNameVmProvisioned {
			finalizers = append(finalizers, finalizer)
		}
	}
	vm.SetFinalizers(finalizers)
	if err := r.Client.Update(ctx, vm); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func UUIDFromKubeUid(uuidStr types.UID) libvirt.UUID {
	ub := [16]byte{}
	newUuid, err := uuid.Parse(string(uuidStr))
	if err != nil {
		panic(err.Error())
	}

	copy(ub[:], newUuid[:])
	return libvirt.UUID(ub)
}

func (r *VirtualMachineReconciler) GetDomain(lc *internallibvirt.Libvirt, vm *computev1alpha1.VirtualMachine) *libvirt.Domain {
	dom, err := lc.DomainLookupByUUID(UUIDFromKubeUid(vm.UID))
	if err != nil {
		return nil
	}
	return &dom
}
func (r *VirtualMachineReconciler) EnsureVolume(lc *internallibvirt.Libvirt, vm *computev1alpha1.VirtualMachine, pool *libvirt.StoragePool, disk *computev1alpha1.VirtualMachineDisk) (*libvirt.StorageVol, error) {
	volumeName := fmt.Sprintf("%s-%s", vm.Name, disk.Name)
	vol, err := lc.StorageVolLookupByName(*pool, volumeName)
	if err == nil {
		return &vol, nil
	}

	volume, err := internallibvirt.NewVolume(volumeName,
		internallibvirt.WithSize(uint64(disk.Size.Value())),
	)
	if err != nil {
		return nil, fmt.Errorf("error creating new internal volume - %w", err)
	}

	volumeStr, err := volume.Marshal()
	if err != nil {
		return nil, err
	}

	vol, err = lc.StorageVolCreateXML(*pool, volumeStr, 0)
	if err != nil {
		return nil, fmt.Errorf("unable to create storage volume - %w", err)
	}

	return &vol, nil

}

func (r *VirtualMachineReconciler) EnsurePool(lc *internallibvirt.Libvirt, name string) (*libvirt.StoragePool, error) {
	pool, err := lc.StoragePoolLookupByName(name)
	if err != nil {
		xmlpool := libvirtxml.StoragePool{
			Name: name,
			Type: "dir",
			Target: &libvirtxml.StoragePoolTarget{
				Path: "/var/lib/libvirt/pool-" + name,
			},
		}

		encoded, err := xmlpool.Marshal()
		if err != nil {
			return nil, fmt.Errorf("unable to create xml - %w", err)
		}

		pool, err = lc.StoragePoolDefineXML(encoded, 0)
		if err != nil {
			return nil, fmt.Errorf("unable to create new storage pool - %w", err)
		}

		err = lc.StoragePoolSetAutostart(pool, 1)
		if err != nil {
			return nil, fmt.Errorf("unable to enable autostart on storagepool - %w", err)
		}
	}

	if isActive, _ := lc.StoragePoolIsActive(pool); isActive == 0 {
		err = lc.StoragePoolCreate(pool, libvirt.StoragePoolCreateWithBuild)
		if err != nil {
			return nil, fmt.Errorf("unable to start pool - %w", err)
		}
	}

	return &pool, nil
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

// SetupWithManager sets up the controller with the Manager.
func (r *VirtualMachineReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&computev1alpha1.VirtualMachine{}).
		Owns(&corev1alpha1.Machine{}).
		WithEventFilter(predicate.And(predicate.NewPredicateFuncs(func(object client.Object) bool {
			if r.Node.GetNode().UID == "" {
				return true
			}

			switch obj := object.(type) {
			case *computev1alpha1.VirtualMachine:
				scheduledOn, scheduled := obj.ScheduledNode()
				return scheduled && scheduledOn == r.Node.GetNode().Name
			}

			return false
		}))).
		Complete(r)
}
