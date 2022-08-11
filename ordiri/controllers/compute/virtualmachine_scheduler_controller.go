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
	"fmt"

	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/util/retry"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	"github.com/ordiri/ordiri/pkg/scheduler"
)

// VirtualMachineReconciler reconciles a VirtualMachine object
type VirtualMachineReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	Scheduler scheduler.Scheduler
}

const (
	FinalizerNameScheduled = "core.ordiri.com/vm-scheduled"
)

func (r *VirtualMachineReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)

	vm := &computev1alpha1.VirtualMachine{}
	if err := r.Client.Get(ctx, req.NamespacedName, vm); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}
	log = log.WithValues("vm", vm.Name)

	if !vm.GetDeletionTimestamp().IsZero() {
		if err := r.unschedule(ctx, vm); err != nil {
			return ctrl.Result{}, err
		}

		finalizers := []string{}
		for _, finalizer := range vm.GetFinalizers() {
			if finalizer != FinalizerNameScheduled {
				finalizers = append(finalizers, finalizer)
			}
		}
		vm.SetFinalizers(finalizers)

		log.V(5).Info("removing scheduler finalizer to VM")
		return ctrl.Result{}, r.Client.Update(ctx, vm)
	}

	hasFinalizer := false
	for _, name := range vm.GetFinalizers() {
		if name == FinalizerNameScheduled {
			hasFinalizer = true
		}
	}

	if !hasFinalizer {
		log.V(5).Info("adding scheduler finalizer to VM")
		vm.SetFinalizers(append(vm.GetFinalizers(), FinalizerNameScheduled))
		if err := r.Client.Update(ctx, vm); err != nil {
			return ctrl.Result{}, err
		}

		return ctrl.Result{}, nil
	}

	if _, scheduled := vm.ScheduledNode(); !scheduled {
		log.Info("scheduling vm ", "vm", vm)
		err := r.schedule(ctx, vm)
		if err != nil {
			return ctrl.Result{}, err
		}
	}

	if err := r.addVmToNodeStatus(ctx, vm); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *VirtualMachineReconciler) unschedule(ctx context.Context, vm *computev1alpha1.VirtualMachine) error {
	return retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		scheduledNode, scheduled := vm.ScheduledNode()
		if !scheduled {
			return nil
		}
		node := &corev1alpha1.Node{}
		node.Name = scheduledNode
		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(node), node); err != nil {
			return err
		}

		changed := false
		vms := []corev1alpha1.NodeVirtualMachineStatus{}
		for _, ref := range node.Status.VirtualMachines {
			if ref.Name == vm.Name {
				changed = true
				continue
			}
			vms = append(vms, ref)
		}

		if changed {
			node.Status.VirtualMachines = vms
			err := r.Client.Status().Update(ctx, node)
			if err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *VirtualMachineReconciler) schedule(ctx context.Context, vm *computev1alpha1.VirtualMachine) error {
	var scheduledNode *corev1alpha1.Node
	// actuall schedule the node
	log := log.FromContext(ctx)

	if _, scheduled := vm.ScheduledNode(); !scheduled {
		nodes := &corev1alpha1.NodeList{}
		if err := r.Client.List(ctx, nodes); err != nil {
			return err
		}
		log.Info("finding node to schedule on")
		scheduledNode = r.Scheduler(nodes.Items)
		if scheduledNode == nil {
			return fmt.Errorf("couldn't schedule node")
		}
		if err := vm.Schedule(scheduledNode.Name); err != nil {
			return err
		}

		if err := r.Client.Update(ctx, vm); err != nil {
			return err
		}
	}
	return nil
}

func (r *VirtualMachineReconciler) addVmToNodeStatus(ctx context.Context, vm *computev1alpha1.VirtualMachine) error {
	scheduledNodeName, isScheduled := vm.ScheduledNode()
	if !isScheduled {
		return fmt.Errorf("node %s is not scheduled to a physical box", scheduledNodeName)
	}
	// ensure the node references this scheduled vm
	return retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		node := &corev1alpha1.Node{}
		node.Name = scheduledNodeName
		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(node), node); err != nil {
			return err
		}

		found := false
		for _, ref := range node.Status.VirtualMachines {
			if ref.Name == vm.Name {
				found = true
			}
		}

		if !found {
			node.Status.VirtualMachines = append(node.Status.VirtualMachines, corev1alpha1.NodeVirtualMachineStatus{
				ObjectReference: v1.ObjectReference{
					Kind:       vm.Kind,
					Name:       vm.Name,
					UID:        vm.UID,
					APIVersion: vm.APIVersion,
				},
			})
			return r.Client.Status().Update(ctx, node)
		}

		return nil

	})
}

// SetupWithManager sets up the controller with the Manager.
func (r *VirtualMachineReconciler) SetupWithManager(mgr ctrl.Manager) error {
	if r.Scheduler == nil {
		r.Scheduler = scheduler.CompactScheduler()
	}
	return ctrl.NewControllerManagedBy(mgr).
		For(&computev1alpha1.VirtualMachine{}).
		Complete(r)
}
