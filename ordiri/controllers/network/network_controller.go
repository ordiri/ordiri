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
	"sort"
	"time"

	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
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

const (
	NetworkCreatedFinalizer = "network.ordiri.com/network-manager"
)

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

	if !nw.DeletionTimestamp.IsZero() {
		err := r.removeDefaultRouter(ctx, nw)
		if err != nil {
			return ctrl.Result{}, err
		}

		if controllerutil.RemoveFinalizer(nw, NetworkCreatedFinalizer) {
			if err := r.Client.Update(ctx, nw); err != nil {
				return ctrl.Result{}, err
			}
		}

		return ctrl.Result{}, nil
	}

	if controllerutil.AddFinalizer(nw, NetworkCreatedFinalizer) {
		if err := r.Client.Update(ctx, nw); err != nil {
			return ctrl.Result{}, err
		}
	}

	changed := false
	if nw.Status.Vni == 0 {
		s1 := rand.NewSource(time.Now().UnixNano())
		r1 := rand.New(s1)

		startAt := int64(4096)
		vni := r1.Int63n(16777215 - startAt)
		vni = vni + startAt
		nw.Status.Vni = vni
		changed = true
	}

	routerChanged, _, err := r.ensureDefaultRouter(ctx, nw)
	if err != nil {
		return ctrl.Result{}, err
	}

	changed = changed || routerChanged != controllerutil.OperationResultNone

	if changed {
		err := r.Status().Update(ctx, nw)
		if err != nil {
			return ctrl.Result{}, err
		}
	}

	// TODO(user): your logic here

	return ctrl.Result{}, nil
}

func (r *NetworkReconciler) removeDefaultRouter(ctx context.Context, network *networkv1alpha1.Network) error {
	router := &networkv1alpha1.Router{}
	router.Name = network.DefaultRouterName()
	if err := r.Client.Get(ctx, client.ObjectKeyFromObject(router), router); err != nil {
		if errors.IsNotFound(err) {
			return nil
		}
		return err
	}

	return r.Client.Delete(ctx, router)
}

// ensure the default network router exists and is bound to all the subnets in the network
func (r *NetworkReconciler) ensureDefaultRouter(ctx context.Context, network *networkv1alpha1.Network) (controllerutil.OperationResult, *networkv1alpha1.Router, error) {
	router := &networkv1alpha1.Router{}
	router.Name = network.DefaultRouterName()
	result, err := ctrl.CreateOrUpdate(ctx, r.Client, router, func() error {
		subnets := &networkv1alpha1.SubnetList{}
		if err := r.Client.List(ctx, subnets, client.MatchingFields{SubnetByNetworkKey: network.Name}); err != nil {
			return err
		}

		existingSubnetSpec := map[string]networkv1alpha1.RouterSubnetReference{}
		for _, subnet := range router.Spec.Subnets {
			existingSubnetSpec[subnet.Name] = subnet
		}

		routerSubnets := []networkv1alpha1.RouterSubnetReference{}
		for _, subnet := range subnets.Items {
			if existing, ok := existingSubnetSpec[subnet.Name]; ok {
				routerSubnets = append(routerSubnets, existing)
			} else {
				routerSubnets = append(routerSubnets, networkv1alpha1.RouterSubnetReference{
					ObjectReference: v1.ObjectReference{
						Kind:       subnet.Kind,
						APIVersion: subnet.APIVersion,
						Name:       subnet.Name,
						UID:        subnet.UID,
					},
				})
			}
		}

		// sort them so we get a consistent list and don't issue un-needed patches
		sort.SliceStable(routerSubnets, func(i, j int) bool {
			return routerSubnets[i].ObjectReference.Name < routerSubnets[j].ObjectReference.Name
		})

		router.Spec.Subnets = routerSubnets

		return ctrl.SetControllerReference(network, router, r.Scheme)
	})

	if err != nil {
		return result, nil, err
	}

	return result, router, nil
}

const SubnetByNetworkKey = ".internal.network"

// SetupWithManager sets up the controller with the Manager.
func (r *NetworkReconciler) SetupWithManager(mgr ctrl.Manager) error {
	// Store machines by their role in the cache so we can efficently retrieve all machines for a role later
	err := mgr.GetCache().IndexField(context.Background(), &networkv1alpha1.Subnet{}, SubnetByNetworkKey, func(o client.Object) []string {
		obj := o.(*networkv1alpha1.Subnet)

		return []string{obj.Spec.Network.Name}
	})
	if err != nil {
		return err
	}
	return ctrl.NewControllerManagedBy(mgr).
		For(&networkv1alpha1.Network{}).
		Owns(&networkv1alpha1.Router{}).
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
