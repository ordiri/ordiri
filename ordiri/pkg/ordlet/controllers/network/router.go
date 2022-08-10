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
	"fmt"
	"sync"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/network"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/ordlet"
)

// RouterReconciler reconciles a Router object
type RouterReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	Node           ordlet.NodeProvider
	NetworkManager api.Manager
}

//+kubebuilder:rbac:groups=network,resources=routers,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=network,resources=routers/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=network,resources=routers/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Router object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *RouterReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)

	router := &networkv1alpha1.Router{}
	if err := r.Client.Get(ctx, req.NamespacedName, router); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	node := r.Node.GetNode()

	wg := sync.WaitGroup{}
	errs := []error{}
	// For each of the selected subnets this router is deployed too
	// check if this node contains the subnet
	for _, selector := range router.Spec.Subnets {
		if _, err := r.Node.GetNode().Subnet(selector.Name); err != nil {
			continue
		}

		thisSel := selector
		wg.Add(1)
		// not safe
		go func() {
			log.Info("starting subnet router install")
			defer wg.Done()
			subnet := &networkv1alpha1.Subnet{}
			subnet.Name = thisSel.Name
			if err := r.Client.Get(ctx, client.ObjectKeyFromObject(subnet), subnet); err != nil {
				errs = append(errs, err)
				return
			}

			nw := &networkv1alpha1.Network{}
			if err := r.Client.Get(ctx, client.ObjectKey{Name: subnet.Spec.Network.Name}, nw); err != nil {
				errs = append(errs, err)
				return
			}

			if !r.NetworkManager.HasNetwork(nw.Name) {
				errs = append(errs, fmt.Errorf("network manager has no network %s, race condition", nw.Name))
				return
			}
			net := r.NetworkManager.GetNetwork(nw.Name)

			if !r.NetworkManager.HasSubnet(net, subnet.Name) {
				errs = append(errs, fmt.Errorf("network manager has no subnet, race condition"))
				return
			}

			sn := r.NetworkManager.GetSubnet(net, subnet.Name)

			subnetWantsRouter := false

			// var finalizer = "changeme-" + r.Node.GetNode().Name

			for _, nws := range node.Status.Networks {
				if nws.Name == nw.Name {
					subnetWantsRouter = true
				}
			}
			var rtr api.Router
			var err error
			if r.NetworkManager.HasRouter(net, sn, router.Name) {
				rtr = r.NetworkManager.GetNetwork(nw.Name)
			} else {
				rtr, err = network.NewRouter(nw.Name)
			}

			if err != nil {
				errs = append(errs, err)
				return
			}

			log.V(5).Info("Starting to ensure router", "network", net)

			if subnetWantsRouter && !r.Node.GetNode().HasRole(corev1alpha1.NodeRoleNetwork) {
				subnetWantsRouter = false
			}

			log.Info("got router", "router", rtr, "wants_router", subnetWantsRouter)

			if !subnetWantsRouter {
				log.Info("removing router", "subnet", subnet, "wants_router", subnetWantsRouter)
				if err := r.NetworkManager.RemoveRouter(ctx, net, sn, rtr); err != nil {
					errs = append(errs, err)
				}

			} else {
				log.Info("installing router", "subnet", subnet, "wants_router", subnetWantsRouter)
				if err := r.NetworkManager.EnsureRouter(ctx, net, sn, rtr); err != nil {
					errs = append(errs, err)
				}
			}
		}()
	}
	log.Info("waiting for groups")
	wg.Wait()

	if len(errs) > 0 {
		return ctrl.Result{}, fmt.Errorf("errrors encountered %+v", errs)
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *RouterReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&networkv1alpha1.Router{}).
		Complete(r)
}
