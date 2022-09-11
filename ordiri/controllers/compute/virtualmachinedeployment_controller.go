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
	"reflect"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

// VirtualMachineDeploymentReconciler reconciles a VirtualMachineDeployment object
type VirtualMachineDeploymentReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

const (
	FinalizerNameDeploymentController = "compute.ordiri.com/deployment-controller"
)

//+kubebuilder:rbac:groups=compute,resources=virtualmachinedeployments,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=compute,resources=virtualmachinedeployments/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=compute,resources=virtualmachinedeployments/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the VirtualMachineDeployment object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *VirtualMachineDeploymentReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)

	log.V(5).Info("Starting to reconcile", "request", req)

	deployment := &computev1alpha1.VirtualMachineDeployment{}
	if err := r.Client.Get(ctx, req.NamespacedName, deployment); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}
	log = log.WithValues("deployment", deployment.Name)
	log.V(5).Info("found deployment", "request", req)

	hasFinalizer := false
	for _, name := range deployment.GetFinalizers() {
		if name == FinalizerNameDeploymentController {
			hasFinalizer = true
		}
	}

	if !deployment.DeletionTimestamp.IsZero() {
		log.V(5).Info("Detected Deployment in deletion mode")

		rs := &computev1alpha1.VirtualMachineReplicaSet{}
		rs.Name = deployment.Name
		rs.Namespace = deployment.Namespace
		if err := r.Client.Delete(ctx, rs); err != nil {
			if errors.IsNotFound(err) {
				return ctrl.Result{}, nil
			}
			return ctrl.Result{}, err
		}
		finalizers := []string{}
		for _, finalizer := range deployment.GetFinalizers() {
			if finalizer != FinalizerNameDeploymentController {
				finalizers = append(finalizers, finalizer)
			}
		}
		deployment.SetFinalizers(finalizers)
		if err := r.Client.Update(ctx, deployment); err != nil {
			return ctrl.Result{}, err
		}

		return ctrl.Result{}, nil
	}

	if !hasFinalizer {
		log.V(5).Info("adding finalizer to Deployment")
		deployment.SetFinalizers(append(deployment.GetFinalizers(), FinalizerNameDeploymentController))
		if err := r.Client.Update(ctx, deployment); err != nil {
			return ctrl.Result{}, err
		}

		return ctrl.Result{}, nil
	}

	rs := &computev1alpha1.VirtualMachineReplicaSet{}
	rs.Name = deployment.Name
	rs.Namespace = deployment.Namespace

	_, err := ctrl.CreateOrUpdate(ctx, r.Client, rs, func() error {
		if !reflect.DeepEqual(rs.Spec.Template, deployment.Spec.Template) {
			rs.Spec.Template = deployment.Spec.Template
		}

		rs.Spec.Replicas = deployment.Spec.Replicas

		return ctrl.SetControllerReference(deployment, rs, r.Scheme)
	})

	log.V(5).Info("found replicaset for deployment", "rs", rs)

	if err != nil {
		return ctrl.Result{}, err
	}
	if deployment.Spec.Replicas != deployment.Status.Replicas {
		deployment.Status.Replicas = deployment.Spec.Replicas
		if err := r.Client.Status().Update(ctx, deployment); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *VirtualMachineDeploymentReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&computev1alpha1.VirtualMachineDeployment{}).
		Owns(&computev1alpha1.VirtualMachineReplicaSet{}).
		Complete(r)
}
