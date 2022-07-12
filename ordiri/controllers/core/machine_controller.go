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

package core

import (
	"context"
	"fmt"

	"k8s.io/apimachinery/pkg/api/errors"
	meta "k8s.io/apimachinery/pkg/api/meta"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

// MachineReconciler reconciles a Machine object
type MachineReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=core,resources=machines,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=core,resources=machines/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=core,resources=machines/finalizers,verbs=update
func (r *MachineReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)
	log.V(5).Info("Starting to reconcile", "request", req)

	m := &corev1alpha1.Machine{}
	if err := r.Client.Get(ctx, req.NamespacedName, m); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	if m.Status.Conditions == nil {
		m.Status.Conditions = []v1.Condition{}
	}

	if m.Spec.Role == "" {
		meta.SetStatusCondition(&m.Status.Conditions, v1.Condition{
			Type:    string(corev1alpha1.ConditionKeyRoleValid),
			Status:  v1.ConditionFalse,
			Reason:  "RoleNotAssigned",
			Message: "Machine has not been assigned a role yet",
		})

		if err := r.Client.Status().Update(ctx, m); err != nil {
			return ctrl.Result{}, err
		}

		return ctrl.Result{}, nil
	}

	mp := &corev1alpha1.MachineProfile{}
	if err := r.Client.Get(ctx, client.ObjectKey{Name: m.Spec.Role}, mp); err != nil {
		if !errors.IsNotFound(err) {
			return ctrl.Result{}, err
		}

		meta.SetStatusCondition(&m.Status.Conditions, v1.Condition{
			Type:    string(corev1alpha1.ConditionKeyRoleValid),
			Status:  v1.ConditionFalse,
			Reason:  "RoleMissing",
			Message: fmt.Sprintf("Unable to find a MachineProfile named %s", m.Spec.Role),
		})

		if err := r.Client.Status().Update(ctx, m); err != nil {
			return ctrl.Result{}, err
		}
	}

	newStatus := corev1alpha1.MachineStatus{
		Conditions: m.Status.Conditions,
	}

	// log = log.WithValues("machine", m).WithValues("profile", mp)

	meta.SetStatusCondition(&newStatus.Conditions, v1.Condition{
		Type:    string(corev1alpha1.ConditionKeyRoleValid),
		Status:  v1.ConditionTrue,
		Reason:  "RoleValid",
		Message: "Role is valid",
	})

	if m.Spec.Approved == nil {
		meta.SetStatusCondition(&newStatus.Conditions, v1.Condition{
			Type:    string(corev1alpha1.ConditionKeyApproved),
			Status:  v1.ConditionUnknown,
			Reason:  "Pending",
			Message: "Machine has not yet been approved",
		})
	} else if *m.Spec.Approved {
		meta.SetStatusCondition(&newStatus.Conditions, v1.Condition{
			Type:    string(corev1alpha1.ConditionKeyApproved),
			Status:  v1.ConditionTrue,
			Reason:  "Approved",
			Message: "Machine has been approved",
		})
	} else if !*m.Spec.Approved {
		meta.SetStatusCondition(&newStatus.Conditions, v1.Condition{
			Type:    string(corev1alpha1.ConditionKeyApproved),
			Status:  v1.ConditionFalse,
			Reason:  "Rejected",
			Message: "Machine has been rejected",
		})
	}

	m.Status = newStatus
	m.Status.ObservedGeneration = m.Generation
	if err := r.Client.Status().Update(ctx, m); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

const machineToProfileIndexKey = "MachineToProfile"

// SetupWithManager sets up the controller with the Manager.
func (r *MachineReconciler) SetupWithManager(mgr ctrl.Manager) error {
	// Store machines by their role in the cache so we can efficently retrieve all machines for a role later
	mgr.GetCache().IndexField(context.Background(), &corev1alpha1.Machine{}, machineToProfileIndexKey, func(o client.Object) []string {
		obj := o.(*corev1alpha1.Machine)

		return []string{obj.Spec.Role}
	})

	return ctrl.NewControllerManagedBy(mgr).
		For(&corev1alpha1.Machine{}).
		Watches(&source.Kind{Type: &corev1alpha1.MachineProfile{}}, handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
			// Enqueue changes to the machine when a profile changes
			machines := &corev1alpha1.MachineList{}
			obj := o.(*corev1alpha1.MachineProfile)

			err := mgr.GetClient().List(context.Background(), machines, client.MatchingFields{machineToProfileIndexKey: obj.Name})
			if err != nil {
				panic(err.Error())
			}
			requests := []reconcile.Request{}
			for _, machine := range machines.Items {
				requests = append(requests, reconcile.Request{
					NamespacedName: client.ObjectKeyFromObject(&machine),
				})
			}

			return requests
		})).
		Complete(r)
}
