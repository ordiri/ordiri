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
	"math"
	"reflect"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/log"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

const (
	FinalizerNameReplicaSetController = "compute.ordiri.com/replicaset-controller"
)

// VirtualMachineReplicaSetReconciler reconciles a VirtualMachineReplicaSet object
type VirtualMachineReplicaSetReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=compute,resources=virtualmachinereplicasets,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=compute,resources=virtualmachinereplicasets/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=compute,resources=virtualmachinereplicasets/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the VirtualMachineReplicaSet object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *VirtualMachineReplicaSetReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)

	log.V(5).Info("Starting to reconcile", "request", req)

	rs := &computev1alpha1.VirtualMachineReplicaSet{}
	if err := r.Client.Get(ctx, req.NamespacedName, rs); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}
	log.V(5).Info("found rs", "rs", rs)

	if !rs.DeletionTimestamp.IsZero() {
		log.V(5).Info("Detected replicaset in deletion mode")

		for i := int32(0); i < rs.Spec.Replicas; i++ {
			vm := &computev1alpha1.VirtualMachine{}
			vm.Name = fmt.Sprintf("%s-%d", rs.Name, i)
			vm.Namespace = rs.Namespace
			if err := r.Client.Delete(ctx, vm); err != nil {
				if errors.IsNotFound(err) {
					continue // Doesn't matter if it's already gone
				}
				return ctrl.Result{}, err
			}
		}
		if controllerutil.RemoveFinalizer(rs, FinalizerNameReplicaSetController) {
			if err := r.Client.Update(ctx, rs); err != nil {
				return ctrl.Result{}, err
			}
		}

		return ctrl.Result{}, nil
	}

	if controllerutil.AddFinalizer(rs, FinalizerNameReplicaSetController) {
		log.V(5).Info("adding finalizer to ReplicaSet")
		if err := r.Client.Update(ctx, rs); err != nil {
			return ctrl.Result{}, err
		}
	}

	for i := int32(0); i < int32(math.Max(float64(rs.Spec.Replicas), float64(rs.Status.Replicas))); i++ {
		vm, err := r.createOrDeletePod(ctx, rs, i)
		if err != nil {
			return ctrl.Result{}, err
		}
		if vm == nil {
			continue
		}
	}
	if rs.Spec.Replicas != rs.Status.Replicas {
		rs.Status.Replicas = rs.Spec.Replicas
		if err := r.Client.Status().Update(ctx, rs); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}
func (r *VirtualMachineReplicaSetReconciler) createOrDeletePod(ctx context.Context, rs *computev1alpha1.VirtualMachineReplicaSet, i int32) (*computev1alpha1.VirtualMachine, error) {
	log := log.FromContext(ctx)
	vm := &computev1alpha1.VirtualMachine{}
	vm.Name = fmt.Sprintf("%s-%d", rs.Name, int64(i))
	vm.Namespace = rs.Namespace
	if i >= rs.Spec.Replicas {
		log.Info("deleting item", "vm", vm.Name)
		if err := r.Client.Delete(ctx, vm); err != nil && !errors.IsNotFound(err) {
			return nil, err
		}
		return nil, nil
	} else {
		log.Info("creating item", "vm", vm.Name)
	}

	_, err := ctrl.CreateOrUpdate(ctx, r.Client, vm, func() error {
		replicaSpecTemplate := rs.Spec.Template.Spec.DeepCopy()
		if vm.Spec.ScheduledNode != "" {
			replicaSpecTemplate.ScheduledNode = vm.Spec.ScheduledNode
		}
		for _, iface := range replicaSpecTemplate.NetworkInterfaces {
			iface.Mac = ""
			iface.Ips = []string{}
		}
		vm2 := vm.DeepCopy()
		// vm3 := vm.DeepCopy()
		// todo: hack remove this
		existingIfaces := map[string]*computev1alpha1.VirtualMachineNetworkInterface{}
		for _, nw := range vm2.Spec.NetworkInterfaces {
			existingIfaces[nw.Network+nw.Subnet] = nw.DeepCopy()
			nw.Mac = ""
			nw.Ips = nil
		}
		log.Info("existing iface for machine", "vm", vm.Name, "ifaces", existingIfaces)

		if !reflect.DeepEqual(vm2.Spec, replicaSpecTemplate) {
			replicaSpecTemplate.DeepCopyInto(&vm.Spec)
			for _, nw := range vm.Spec.NetworkInterfaces {
				if existing, ok := existingIfaces[nw.Network+nw.Subnet]; ok {
					nw.Mac = existing.Mac
					nw.Ips = existing.Ips
				}
			}
		}
		if vm.Annotations == nil {
			vm.Annotations = map[string]string{}
		}
		if vm.Labels == nil {
			vm.Labels = map[string]string{}
		}
		for key, val := range rs.Spec.Template.Metadata.GetAnnotations() {
			vm.Annotations[key] = val
		}
		for key, val := range rs.Spec.Template.Metadata.GetLabels() {
			vm.Labels[key] = val
		}

		log.Info("will create or update vm", "vm", vm.Name, "vm", vm.Spec)

		return ctrl.SetControllerReference(rs, vm, r.Scheme)
	})
	if err != nil {
		return nil, err
	}
	log = log.WithValues(fmt.Sprintf("vm-%d", i), vm.Name)
	log.V(5).Info("found vm " + fmt.Sprint(i))
	return vm, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *VirtualMachineReplicaSetReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&computev1alpha1.VirtualMachineReplicaSet{}).
		Owns(&computev1alpha1.VirtualMachine{}).
		Complete(r)
}
