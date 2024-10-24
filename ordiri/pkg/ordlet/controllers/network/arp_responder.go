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

package network

import (
	"context"
	"time"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	k8log "sigs.k8s.io/controller-runtime/pkg/log"

	"github.com/ordiri/ordiri/pkg/ordlet"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

// ArpResponderReconciler reconciles a VirtualMachine object
type ArpResponderReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	Node ordlet.NodeProvider
}

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the VirtualMachine object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *ArpResponderReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := k8log.FromContext(ctx)
	log.V(5).Info("Starting to reconcile", "request", req)
	if r.Node.GetNode().UID == "" {
		log.V(5).Info("requeueing, no node set yet")
		return ctrl.Result{RequeueAfter: time.Second * 1}, nil
	}

	vm := &computev1alpha1.VirtualMachine{}
	if err := r.Client.Get(ctx, req.NamespacedName, vm); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *ArpResponderReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		Named("mesh").
		For(&computev1alpha1.VirtualMachine{}).
		Complete(r)
}
