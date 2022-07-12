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
	"math/rand"
	"time"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/ordlet"
)

// NetworkReconciler reconciles a Network object
type NetworkReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	Node ordlet.NodeProvider
}

//+kubebuilder:rbac:groups=network,resources=networks,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=network,resources=networks/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=network,resources=networks/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Network object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *NetworkReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	_ = log.FromContext(ctx)

	nw := &networkv1alpha1.Network{}
	if err := r.Client.Get(ctx, req.NamespacedName, nw); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	changed := false
	if nw.Status.Vni == 0 {
		s1 := rand.NewSource(time.Now().UnixNano())
		r1 := rand.New(s1)

		startAt := int64(4096)
		vni := r1.Int63n(16777215 - startAt)
		vni = vni + startAt
		nw.Status.Vni = uint64(vni)
		changed = true
	}

	if changed {
		err := r.Status().Update(ctx, nw)
		if err != nil {
			return ctrl.Result{}, err
		}
	}

	// TODO(user): your logic here

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *NetworkReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&networkv1alpha1.Network{}).
		Watches(&source.Kind{Type: &networkv1alpha1.Subnet{}}, handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
			switch subnet := o.(type) {
			case *networkv1alpha1.Subnet:
				return []reconcile.Request{
					{NamespacedName: types.NamespacedName{Name: subnet.Spec.Network.Name}},
				}
			}
			return nil
		})).
		Complete(r)
}
