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

package compute

import (
	"context"
	"errors"
	"fmt"

	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"libvirt.org/go/libvirtxml"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	k8log "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/predicate"

	"github.com/digitalocean/go-libvirt"
	"github.com/google/uuid"
	internallibvirt "github.com/ordiri/ordiri/pkg/libvirt"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/ordiri/ordiri/pkg/ordlet"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	"github.com/vishvananda/netlink"
)

// VirtualMachineReconciler reconciles a VirtualMachine object
type VirtualMachineReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	LibvirtClient *internallibvirt.Libvirt
	Node          ordlet.NodeProvider
}

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

	needsUpdate := false

	vm := &computev1alpha1.VirtualMachine{}
	if err := r.Client.Get(ctx, req.NamespacedName, vm); err != nil {
		if k8err.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	log = log.WithValues("vm", vm.Name)
	scheduledNode, scheduled := vm.ScheduledNode()

	if !scheduled || scheduledNode != r.Node.GetNode().Name {
		return ctrl.Result{}, nil
	}

	if !vm.DeletionTimestamp.IsZero() {
		log.V(5).Info("Detected VM in deletion mode")
		return r.ReconcileDeletion(ctx, vm)
	}

	if controllerutil.AddFinalizer(vm, FinalizerNameVmProvisioned) {
		if err := r.Client.Update(ctx, vm); err != nil {
			return ctrl.Result{}, err
		}
	}

	_, domain := r.GetDomain(ctx, vm)
	// r.LibvirtClient.attach

	needsCreate := domain == nil
	needsUpdate = needsUpdate || needsCreate

	log.V(5).Info("creating virtual machine")
	domainOptions := []internallibvirt.DomainOption{
		internallibvirt.WithBasicDefaults(),
		internallibvirt.WithUuid(string(vm.UID)),
		internallibvirt.WithBootDevice(vm.Spec.BootDevices...),
		internallibvirt.WithConsole(0, "serial"),
		internallibvirt.WithCpu(2),
		internallibvirt.WithMemory(4 * 1e6),
	}
	// newDomain := libvirtxml.Domain{}

	// vm.Status.Volumes = []computev1alpha1.VirtualMachineVolumeStatus{}
	volumes := []computev1alpha1.VirtualMachineVolumeStatus{}
	for _, disk := range vm.Spec.Volumes {
		log.V(5).Info("getting volume", "disk", disk)
		volumeStatus, domainOption, err := r.getVolume(ctx, vm, disk)
		if err != nil {
			return ctrl.Result{}, err
		}
		log.V(5).Info("found volume", "status", volumeStatus)

		domainOptions = append(domainOptions, domainOption)
		volumes = append(volumes, volumeStatus)
	}

	vm.Status.Volumes = volumes

	ifaces := []computev1alpha1.VirtualMachineNetworkInterfaceStatus{}
	for _, iface := range vm.Spec.NetworkInterfaces {
		ifaceStatus, ifaceOption, err := r.getNetworkInterface(ctx, vm, iface)
		if err != nil {
			return ctrl.Result{}, err
		}
		domainOptions = append(domainOptions, ifaceOption)
		ifaces = append(ifaces, ifaceStatus)
	}
	vm.Status.NetworkInterfaces = ifaces

	domain, dom, result, err := internallibvirt.Ensure(r.LibvirtClient, vm.Name, domainOptions...)

	if err != nil {
		return ctrl.Result{}, err
	}

	if result == internallibvirt.EnsureResultDomainCreated {
		log.V(5).Info("created virtual machine")
		needsUpdate = true
	} else if result == internallibvirt.EnsureResultDomainUpdated {
		log.V(5).Info("updated virtual machine")
		needsUpdate = true
	} else if result == internallibvirt.EnsureResultDomainNone {
		log.V(5).Info("did nothing to virtual machine")
	}

	if domain == nil {
		return ctrl.Result{}, fmt.Errorf("unable to finhd provisioned vm")
	}

	log = log.WithValues("domain", uuid.Must(uuid.Parse(domain.UUID)).String())

	state, reason, err := r.LibvirtClient.DomainGetState(*dom, 0)
	if err != nil {
		return ctrl.Result{}, err
	}

	log.Info("got the virtual machine state", "state", state, "reason", reason)

	if _, err := r.createOrUpdateMachine(ctx, vm, domain); err != nil {
		return ctrl.Result{}, err
	}

	if vm.Status.ObservedGeneration != vm.Generation {
		vm.Status.ObservedGeneration = vm.Generation
		needsUpdate = true
	}

	if needsUpdate {
		err = r.Client.Status().Update(ctx, vm)
		if err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *VirtualMachineReconciler) createOrUpdateMachine(ctx context.Context, vm *computev1alpha1.VirtualMachine, domain *libvirtxml.Domain) (controllerutil.OperationResult, error) {
	machine := &corev1alpha1.Machine{}
	machine.Name = string(vm.UID)
	return ctrl.CreateOrUpdate(ctx, r.Client, machine, func() error {
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

}
func (r *VirtualMachineReconciler) ReconcileDeletion(ctx context.Context, vm *computev1alpha1.VirtualMachine) (ctrl.Result, error) {
	log := k8log.FromContext(ctx)

	domain, _ := r.GetDomain(ctx, vm)
	if domain != nil {
		log.V(5).Info("destroying vm")

		state, reason, err := r.LibvirtClient.DomainGetState(*domain, 0)
		if err != nil {
			return ctrl.Result{}, err
		}
		log.Info("got the virtual machine state", "state", state, "reason", reason)
		if libvirt.DomainState(state) == libvirt.DomainRunning || libvirt.DomainState(state) == libvirt.DomainPaused {
			if err := r.LibvirtClient.DomainDestroyFlags(*domain, libvirt.DomainDestroyDefault); err != nil {
				return ctrl.Result{}, err
			}
		}

		log.V(5).Info("undefining Vm")
		if err := r.LibvirtClient.DomainUndefineFlags(*domain, 0); err != nil {
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

	// pool, err := r.LibvirtClient.StoragePoolLookupByName(poolName)
	// if err == nil && pool.Name != "" {
	// 	for _, disk := range vm.Status.Volumes {
	// 		vol, err := r.LibvirtClient.StorageVolLookupByName(pool, disk.VolumeName)
	// 		log.V(5).Info("removing volume", "volume", disk.VolumeName, "volume", vol, "err", err)
	// 		if err != nil {
	// 			continue
	// 		}
	// 		if err := r.LibvirtClient.StorageVolDelete(vol, 0); err != nil {
	// 			return ctrl.Result{}, err
	// 		}
	// 	}
	// }

	machine := &corev1alpha1.Machine{}
	machine.Name = string(vm.UID)
	if err := r.Client.Delete(ctx, machine); !k8err.IsNotFound(err) {
		return ctrl.Result{}, err
	}

	if err := r.removeFinalizer(ctx, vm); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *VirtualMachineReconciler) removeFinalizer(ctx context.Context, vm *computev1alpha1.VirtualMachine) error {
	newFinalizers := []string{}
	for _, finalizer := range vm.GetFinalizers() {
		if finalizer != FinalizerNameVmProvisioned {
			newFinalizers = append(newFinalizers, finalizer)
		}
	}
	vm.SetFinalizers(newFinalizers)
	if err := r.Client.Update(ctx, vm); err != nil {
		return err
	}

	return nil
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

func (r *VirtualMachineReconciler) GetDomain(ctx context.Context, vm *computev1alpha1.VirtualMachine) (*libvirt.Domain, *libvirtxml.Domain) {
	dom, err := r.LibvirtClient.DomainLookupByUUID(UUIDFromKubeUid(vm.UID))
	if err != nil {
		return nil, nil
	}
	xml, err := r.LibvirtClient.DomainGetXMLDesc(dom, 0)
	if err != nil {
		return nil, nil
	}
	xmlDom := &libvirtxml.Domain{}

	if err := xmlDom.Unmarshal(xml); err != nil {
		panic(err.Error())
	}

	return &dom, xmlDom
}

// SetupWithManager sets up the controller with the Manager.
func (r *VirtualMachineReconciler) SetupWithManager(mgr ctrl.Manager) error {
	if r.LibvirtClient == nil {
		r.LibvirtClient = internallibvirt.Local()
	}
	return ctrl.NewControllerManagedBy(mgr).
		For(&computev1alpha1.VirtualMachine{}).
		Owns(&corev1alpha1.Machine{}).
		WithEventFilter(predicate.And(predicate.NewPredicateFuncs(func(object client.Object) bool {
			node := r.Node.GetNode()
			if node.UID == "" {
				return true
			}

			switch obj := object.(type) {
			case *computev1alpha1.VirtualMachine:
				scheduledOn, scheduled := obj.ScheduledNode()
				return scheduled && scheduledOn == node.Name
			}

			return false
		}))).
		Complete(r)
}
