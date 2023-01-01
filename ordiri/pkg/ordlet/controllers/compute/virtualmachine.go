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
	"encoding/xml"
	"fmt"
	"time"

	"inet.af/netaddr"
	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/resource"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"libvirt.org/go/libvirtxml"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/event"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	k8log "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/source"

	"github.com/digitalocean/go-libvirt"
	"github.com/google/uuid"
	internallibvirt "github.com/ordiri/ordiri/pkg/compute/driver/libvirt"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/ordlet"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

// VirtualMachineReconciler reconciles a VirtualMachine object
type VirtualMachineReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	LibvirtClient  *internallibvirt.Libvirt
	Node           ordlet.NodeProvider
	NetworkManager api.Manager

	PublicCidr  netaddr.IPPrefix
	Public6Cidr netaddr.IPPrefix
}

//+kubebuilder:rbac:groups=compute,resources=virtualmachines,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=compute,resources=virtualmachines/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=compute,resources=virtualmachines/finalizers,verbs=update

const (
	FinalizerNameVmProvisioned = "compute.ordiri.com/virtual-machine-provisioned"
)

// Reconcile the state of a virtual machine
func (r *VirtualMachineReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := k8log.FromContext(ctx)
	log.V(5).Info("Starting to reconcile", "request", req)

	needsUpdate := false

	vm := &computev1alpha1.VirtualMachine{}
	if err := r.Client.Get(ctx, req.NamespacedName, vm); err != nil {
		if k8err.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, fmt.Errorf("vm not found - %w", err)
	}

	log = log.WithValues("vm", vm.Name)
	scheduledNode, scheduled := vm.ScheduledNode()

	// if scheduled {
	// 	for _, iface := range vm.Spec.NetworkInterfaces {
	// 		ifaceStatus, ifaceOption, err := r.ensureMacKnown(ctx, vm, iface)
	// 		if err != nil {
	// 			return ctrl.Result{}, fmt.Errorf("error ensuring mac is known - %w", err)
	// 		}
	// 	}
	// }

	if !scheduled || scheduledNode != r.Node.GetNode().Name {
		log.V(5).Info("Not scheduled on this node")
		return ctrl.Result{}, nil
	}

	if !vm.DeletionTimestamp.IsZero() {
		log.V(5).Info("Detected VM in deletion mode")
		result, err := r.ReconcileDeletion(ctx, vm)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("error deleting virtual machine - %w", err)
		}
		return result, nil
	}

	if controllerutil.AddFinalizer(vm, FinalizerNameVmProvisioned) {
		if err := r.Client.Update(ctx, vm); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to add finalizers - %w", err)
		}
	}

	_, domain := r.GetDomain(ctx, vm)
	// r.LibvirtClient.attach

	needsCreate := domain == nil
	needsUpdate = needsUpdate || needsCreate

	m := vm.Spec.Resources.Memory.DeepCopy()
	memory := uint(m.ScaledValue(resource.Kilo))

	log.V(5).Info("creating virtual machine")
	domainOptions := []internallibvirt.DomainOption{
		internallibvirt.WithBasicDefaults(),
		internallibvirt.WithUuid(string(vm.UID)),
		internallibvirt.WithBootDevice(vm.Spec.BootDevices...),
		internallibvirt.WithConsole(0, "serial"),
		internallibvirt.WithCpu(uint(vm.Spec.Resources.CPU)),
		internallibvirt.WithMemory(memory), // (uint(vm.Spec.Resources.Memory.Value())),
		internallibvirt.WithVnc(),
		internallibvirt.WithMetadata("ordiri", "https://ordiri.com/tenant", "tenant", vm.Namespace),
	}
	// newDomain := libvirtxml.Domain{}

	// vm.Status.Volumes = []computev1alpha1.VirtualMachineVolumeStatus{}
	volumes := []computev1alpha1.VirtualMachineVolumeStatus{}
	for _, disk := range vm.Spec.Volumes {
		log.V(5).Info("getting volume", "disk", disk)
		volumeStatus, domainOption, err := r.ensureVolume(ctx, vm, disk)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("error ensuring volume - %w", err)
		}
		log.V(5).Info("found volume", "status", volumeStatus)

		domainOptions = append(domainOptions, domainOption)
		volumes = append(volumes, volumeStatus)
	}

	vm.Status.Volumes = volumes

	ifaces := []computev1alpha1.VirtualMachineNetworkInterfaceStatus{}
	for _, iface := range vm.Spec.NetworkInterfaces {
		ifaceStatus, ifaceOption, err := r.RegisterNetworkInterface(ctx, vm, iface)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("error ensuring network - %w", err)
		}
		domainOptions = append(domainOptions, ifaceOption)
		ifaces = append(ifaces, ifaceStatus)
	}
	vm.Status.NetworkInterfaces = ifaces

	ensureCtx, cancel := context.WithTimeout(ctx, time.Second*10)
	defer cancel()

	domain, _, result, err := internallibvirt.Ensure(ensureCtx, r.LibvirtClient, vm.Namespace, vm.Name, libvirtStatus(vm.Spec.State), domainOptions...)

	if err != nil {
		return ctrl.Result{}, fmt.Errorf("error ensuring domain - %w", err)
	}

	if result == internallibvirt.EnsureResultDomainCreated {
		log.V(5).Info("creating virtual machine")
		needsUpdate = true
	} else if result == internallibvirt.EnsureResultDomainUpdated {
		log.V(5).Info("updated virtual machine")
		needsUpdate = true
	} else if result == internallibvirt.EnsureResultDomainNone {
		log.V(5).Info("did nothing to virtual machine")
		needsUpdate = false
	}

	if domain == nil {
		return ctrl.Result{}, fmt.Errorf("unable to finhd provisioned vm")
	}

	log = log.WithValues("domain", uuid.Must(uuid.Parse(domain.UUID)).String())

	if _, err := r.createOrUpdateMachine(ctx, vm, domain); err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to create or update machine for vm - %w", err)
	}

	for _, graphics := range domain.Devices.Graphics {
		if vnc := graphics.VNC; vnc != nil {
			vncPort := int64(vnc.WebSocket)
			if vm.Status.VncPort != vncPort {
				needsUpdate = true
				vm.Status.VncPort = vncPort
			}
		}
	}

	if vm.Status.ObservedGeneration != vm.Generation {
		vm.Status.ObservedGeneration = vm.Generation
		needsUpdate = true
	}

	if needsUpdate {
		log.Info("updating status of machine")

		if err := r.Client.Status().Update(ctx, vm); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to update status of vm - %w", err)
		}
	}

	return ctrl.Result{}, nil
}

func (r *VirtualMachineReconciler) createOrUpdateMachine(ctx context.Context, vm *computev1alpha1.VirtualMachine, domain *libvirtxml.Domain) (controllerutil.OperationResult, error) {
	machine := &corev1alpha1.Machine{}
	machine.Name = string(vm.UID)
	machine.Namespace = vm.Namespace
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
			return ctrl.Result{}, fmt.Errorf("unable to get domain state - %w", err)
		}
		log.Info("got the virtual machine state", "state", state, "reason", reason)
		if libvirt.DomainState(state) == libvirt.DomainRunning || libvirt.DomainState(state) == libvirt.DomainPaused {
			if err := r.LibvirtClient.DomainDestroyFlags(*domain, libvirt.DomainDestroyDefault); err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to destroy vm - %w", err)
			}
		}

		log.V(5).Info("undefining Vm")
		if err := r.LibvirtClient.DomainUndefineFlags(*domain, 0); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to undefine vm - %w", err)
		}
	}

	for _, iface := range vm.Spec.NetworkInterfaces {
		net, err := r.NetworkManager.GetNetwork(iface.Network)
		if err != nil {
			log.V(5).Info("network already removed", "iface", iface)
			continue
		}

		subnet, err := r.NetworkManager.GetSubnet(net.Name(), iface.Subnet)
		if err != nil {
			log.V(5).Info("subnet already removed", "iface", iface)
			continue
		}

		netIface, err := r.NetworkManager.GetInterface(net.Name(), subnet.Name(), iface.Key(vm.Name))
		if err != nil {
			log.V(5).Info("interface already removed", "iface", iface)
			continue
		}
		if err := r.NetworkManager.RemoveInterface(ctx, net.Name(), subnet.Name(), netIface.Name()); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to remove network interface - %w", err)
		}
		log.V(5).Info("interface was successfully removed", "iface", iface)
	}

	for _, volume := range vm.Spec.Volumes {
		if hl := volume.HostLocal; hl != nil {
			pool, err := r.LibvirtClient.StoragePoolLookupByName(hl.PoolName)
			if err == nil && pool.Name != "" {
				hostLocalVolumeName := vm.Name + "-" + hl.VolName
				vol, err := r.LibvirtClient.StorageVolLookupByName(pool, hostLocalVolumeName)
				log.V(5).Info("removing volume", "volume", hostLocalVolumeName, "volume", vol, "err", err)
				if err != nil {
					continue
				}
				if err := r.LibvirtClient.StorageVolDelete(vol, 0); err != nil {
					return ctrl.Result{}, fmt.Errorf("error deleting storage volume %s/%s - %w", hl.PoolName, hostLocalVolumeName, err)
				}
			}
		}

	}

	machine := &corev1alpha1.Machine{}
	machine.Name = string(vm.UID)
	machine.Namespace = vm.Namespace
	if err := r.Client.Delete(ctx, machine); err != nil && !k8err.IsNotFound(err) {
		return ctrl.Result{}, fmt.Errorf("unable to delete machine - %w", err)
	}

	if err := r.removeFinalizer(ctx, vm); err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to remove finalizer - %w", err)
	}

	return ctrl.Result{}, nil
}

func (r *VirtualMachineReconciler) removeFinalizer(ctx context.Context, vm *computev1alpha1.VirtualMachine) error {
	if controllerutil.RemoveFinalizer(vm, FinalizerNameVmProvisioned) {
		if err := r.Client.Update(ctx, vm); err != nil {
			return fmt.Errorf("unable to remove finalizer - %w", err)
		}
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

func libvirtStatus(vms computev1alpha1.VirtualMachineState) libvirt.DomainState {
	switch vms {
	case computev1alpha1.VirtualMachineStateUnknown:
		fallthrough
	case computev1alpha1.VirtualMachineStatePaused:
		return libvirt.DomainPaused
	case computev1alpha1.VirtualMachineStateRunning:
		return libvirt.DomainRunning
	}
	panic("unknown status " + vms)
}

// SetupWithManager sets up the controller with the Manager.
func (r *VirtualMachineReconciler) SetupWithManager(mgr ctrl.Manager) error {
	if r.LibvirtClient == nil {
		r.LibvirtClient = internallibvirt.Local()
	}
	if r.NetworkManager == nil {
		panic("missing network manager")
	}

	// bad context here, needs to come from somewhere that will cancel on close
	chanEvents, err := r.LibvirtClient.LifecycleEvents(context.Background())
	if err != nil {
		return err
	}

	chanWatchers := make(chan event.GenericEvent)
	go func() {
		for evt := range chanEvents {
			// Skip events about the config file being defined as that's us
			if evt.Event == int32(libvirt.DomainEventDefined) {
				continue
			}
			// virsh metadata --domain vault-root-0 --uri 'https://ordiri.com/tenant' --config
			meta, err := r.LibvirtClient.DomainGetMetadata(evt.Dom, int32(libvirt.DomainMetadataElement), libvirt.OptString{"https://ordiri.com/tenant"}, libvirt.DomainAffectLive)
			if err != nil {
				continue
			}
			type Meta struct {
				XMLName xml.Name `xml:"tenant"`
				Tenant  string   `xml:",chardata"`
			}
			metaObj := &Meta{}
			if err := xml.Unmarshal([]byte(meta), &metaObj); err != nil {
				continue
			}

			if metaObj.Tenant == "" {
				continue
			}

			chanWatchers <- (event.GenericEvent{
				Object: &computev1alpha1.VirtualMachine{
					ObjectMeta: v1.ObjectMeta{
						Namespace: metaObj.Tenant,
						Name:      evt.Dom.Name,
					},
				},
			})
		}
	}()

	// todo we should make our own controller class
	// that let's people subscribe to the node obj
	return ctrl.NewControllerManagedBy(mgr).
		For(&computev1alpha1.VirtualMachine{}).
		Owns(&corev1alpha1.Machine{}).
		Watches(&source.Channel{Source: chanWatchers}, &handler.EnqueueRequestForObject{}).
		WithOptions(controller.Options{
			MaxConcurrentReconciles: 5,
		}).
		Complete(r)
}
