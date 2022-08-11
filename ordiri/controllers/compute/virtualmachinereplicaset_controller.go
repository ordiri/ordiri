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
	"reflect"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

const (
	FinalizerNameVmProvisioned = "compute.ordiri.com/replicaset-controller"
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
	log.V(5).Info("found replicaset", "rs", rs)

	hasFinalizer := false
	for _, name := range rs.GetFinalizers() {
		if name == FinalizerNameVmProvisioned {
			hasFinalizer = true
		}
	}

	if !rs.DeletionTimestamp.IsZero() {
		log.V(5).Info("Detected RS it deletion mode")

		for i := 0; i < rs.Spec.Replicas; i++ {
			vm := &computev1alpha1.VirtualMachine{}
			vm.Name = fmt.Sprintf("%s-%d", rs.Name, i)
			if err := r.Client.Delete(ctx, vm); err != nil {
				if errors.IsNotFound(err) {
					return ctrl.Result{}, nil
				}
				return ctrl.Result{}, err
			}
		}
		finalizers := []string{}
		for _, finalizer := range rs.GetFinalizers() {

			if finalizer != FinalizerNameVmProvisioned {
				finalizers = append(finalizers, finalizer)
			}
		}
		rs.SetFinalizers(finalizers)
		if err := r.Client.Update(ctx, rs); err != nil {
			return ctrl.Result{}, err
		}

		return ctrl.Result{}, nil
	}

	if !hasFinalizer {
		log.V(5).Info("adding finalizer to ReplicaSet")
		rs.SetFinalizers(append(rs.GetFinalizers(), FinalizerNameVmProvisioned))
		if err := r.Client.Update(ctx, rs); err != nil {
			return ctrl.Result{}, err
		}

		return ctrl.Result{}, nil
	}

	for i := 0; i < rs.Spec.Replicas; i++ {
		vm := &computev1alpha1.VirtualMachine{}
		vm.Name = fmt.Sprintf("%s-%d", rs.Name, i)
		_, err := ctrl.CreateOrUpdate(ctx, r.Client, vm, func() error {
			rs.Spec.Template.Spec.ScheduledNode = vm.Spec.ScheduledNode
			if !reflect.DeepEqual(vm.Spec, rs.Spec.Template.Spec) {
				vm.Spec = rs.Spec.Template.Spec
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

			return ctrl.SetControllerReference(rs, vm, r.Scheme)
		})
		log = log.WithValues(fmt.Sprintf("vm-%d", i), vm.Name)
		log.V(5).Info("found vm " + fmt.Sprint(i))

		if err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *VirtualMachineReplicaSetReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&computev1alpha1.VirtualMachineReplicaSet{}).
		Owns(&computev1alpha1.VirtualMachine{}).
		Complete(r)
}
