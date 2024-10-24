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
	"reflect"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
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
	_ = node
	_ = log
	// make every net have a single router, better

	// // For each of the selected subnets this router is deployed too
	// // check if this node contains the subnet
	// for _, selector := range router.Spec.Subnets {
	// 	nodeWantsRouter := false // The node wants the router if the current node has it's subnet in the list of node subnets
	// 	if _, err := node.Subnet(router.Spec.Net selector.Name); err == nil {
	// 		log.V(8).Info("node wants router", "subnet", selector)
	// 		nodeWantsRouter = true
	// 	}

	// 	nodeHasRouter := false
	// 	nodeLocalMac := mac.Unicast()
	// 	for _, snh := range router.Status.Hosts {
	// 		if snh.Node == node.Name && snh.Subnet == selector.Name {
	// 			log.V(8).Info("node has router", "subnet", selector)
	// 			nodeHasRouter = true
	// 			nlc, err := net.ParseMAC(snh.Mac)
	// 			if err != nil {
	// 				return ctrl.Result{}, fmt.Errorf("node local mac was not a valid mac addr")
	// 			}
	// 			nodeLocalMac = nlc
	// 		}
	// 	}

	// 	if nodeWantsRouter && !node.HasRole(corev1alpha1.NodeRoleNetwork) {
	// 		nodeWantsRouter = false
	// 	}

	// 	if !nodeHasRouter && !nodeWantsRouter {
	// 		continue
	// 	}

	// 	subnet := &networkv1alpha1.Subnet{}
	// 	subnet.Namespace = selector.Namespace
	// 	if subnet.Namespace == "" { // cross account?
	// 		subnet.Namespace = router.Namespace
	// 	}
	// 	subnet.Name = selector.Name
	// 	if err := r.Client.Get(ctx, client.ObjectKeyFromObject(subnet), subnet); err != nil {
	// 		return ctrl.Result{}, fmt.Errorf("subnet does not exist - %w", err)
	// 	}

	// 	nw := &networkv1alpha1.Network{}
	// 	if err := r.Client.Get(ctx, client.ObjectKey{Namespace: subnet.Namespace, Name: subnet.Spec.Network.Name}, nw); err != nil {
	// 		return ctrl.Result{}, fmt.Errorf("network does not exist - %w", err)
	// 	}

	// 	net := r.NetworkManager.GetNetwork(nw.Name)
	// 	if net == nil {
	// 		return ctrl.Result{RequeueAfter: time.Second * 1}, fmt.Errorf("network manager has no network %s", nw.Name)
	// 	}

	// 	sn := r.NetworkManager.GetSubnet(net, subnet.Name)
	// 	if sn == nil {
	// 		return ctrl.Result{RequeueAfter: time.Second * 1}, fmt.Errorf("network %q has no subnet %q", nw.Name, subnet.Name)
	// 	}

	// 	rtr := r.NetworkManager.GetRouter(net, sn, router.Name)
	// 	if rtr == nil {
	// 		macAddr, err := mac.Parse(selector.Mac)
	// 		if err != nil {
	// 			return ctrl.Result{}, fmt.Errorf("invalid mac address - %w", err)
	// 		}

	// 		// the router ip is always the first ip in the range (10.0.0.0/24 === router ip 10.0.0.1/24)
	// 		ip := netaddr.IPPrefixFrom(sn.Cidr().IP().Next(), sn.Cidr().Bits())
	// 		rtr, err = network.NewRouter(router.Name, ip, sn.Segment(), network.WithDistributedMac(macAddr), network.WithLocalMac(nodeLocalMac))
	// 		if err != nil {
	// 			return ctrl.Result{}, fmt.Errorf("unable to create router - %w", err)
	// 		}
	// 	}

	// 	if !nodeWantsRouter {
	// 		log.V(8).Info("removing router", "subnet", subnet, "wants_router", nodeWantsRouter)
	// 		if err := r.NetworkManager.RemoveRouter(ctx, net, sn, rtr); err != nil {
	// 			return ctrl.Result{}, fmt.Errorf("aoeaoeao - %w", err)
	// 		}
	// 		if err := r.removeNodeSubnetFromRouterStatus(ctx, subnet, router); err != nil {
	// 			return ctrl.Result{}, fmt.Errorf("aoeaoeao - %w", err)
	// 		}
	// 	} else {
	// 		log.V(8).Info("installing router", "subnet", subnet, "wants_router", nodeWantsRouter)
	// 		if err := r.addNodeSubnetToRouterStatus(ctx, subnet, router, nodeLocalMac); err != nil {
	// 			return ctrl.Result{}, fmt.Errorf("aoeaoeao - %w", err)
	// 		}

	// 		vms := &computev1alpha1.VirtualMachineList{}
	// 		if err := r.Client.List(ctx, vms, client.InNamespace(router.Namespace), client.MatchingFields{"VmsToSubnetIndex": nw.Name + subnet.Name}); err != nil {
	// 			return ctrl.Result{}, fmt.Errorf("aoe - %w", err)
	// 		}
	// 		for _, vm := range vms.Items {
	// 			for _, iface := range vm.Spec.NetworkInterfaces {
	// 				if len(iface.Ips) == 0 {
	// 					return ctrl.Result{}, fmt.Errorf("vm %q, interface %+v has no ip yet", vm.Name, iface)
	// 				}
	// 				macAddr, err := mac.Parse(iface.Mac)
	// 				if err != nil {
	// 					return ctrl.Result{}, fmt.Errorf("aoe - %w", err)
	// 				}
	// 				ip, err := netaddr.ParseIP(iface.Ips[0])
	// 				if err != nil {
	// 					return ctrl.Result{}, fmt.Errorf("aoe - %w", err)
	// 				}

	// 				rtr.RegisterMac(ip, macAddr)
	// 			}
	// 		}

	// 		spew.Dump(rtr)

	// 		if err := r.NetworkManager.EnsureRouter(ctx, net, sn, rtr); err != nil {
	// 			return ctrl.Result{}, fmt.Errorf("aoeaoeao - %w", err)
	// 		}
	// 	}
	// }

	return ctrl.Result{}, nil
}

// func (r *RouterReconciler) addNodeSubnetToRouterStatus(ctx context.Context, subnet *networkv1alpha1.Subnet, rtr *networkv1alpha1.Router, nodeLocalMac net.HardwareAddr) error {
// 	return retry.RetryOnConflict(retry.DefaultBackoff, func() error {
// 		node := r.Node.GetNode()
// 		router := &networkv1alpha1.Router{}
// 		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(rtr), router); err != nil {
// 			if errors.IsNotFound(err) {
// 				return nil
// 			}
// 			return err
// 		}

// 		needsUpdate := false
// 		routerContainsNodeSubnet := false
// 		for _, hostBinding := range router.Status.Hosts {
// 			if hostBinding.Node == node.Name && hostBinding.Subnet == subnet.Name {
// 				routerContainsNodeSubnet = true
// 				if hostBinding.Mac != nodeLocalMac.String() {
// 					hostBinding.Mac = nodeLocalMac.String()
// 					needsUpdate = true
// 				}
// 			}
// 		}

// 		if !routerContainsNodeSubnet {
// 			needsUpdate = true
// 			router.Status.Hosts = append(router.Status.Hosts, networkv1alpha1.HostRouterStatus{
// 				Node:   node.Name,
// 				Subnet: subnet.Name,
// 				Mac:    nodeLocalMac.String(),
// 			})

// 		}
// 		if needsUpdate {
// 			if err := r.Client.Status().Update(ctx, router); err != nil {
// 				return err
// 			}
// 		}
// 		return nil
// 	})
// }
// func (r *RouterReconciler) removeNodeSubnetFromRouterStatus(ctx context.Context, subnet *networkv1alpha1.Subnet, rtr *networkv1alpha1.Router) error {
// 	return retry.RetryOnConflict(retry.DefaultBackoff, func() error {
// 		router := &networkv1alpha1.Router{}
// 		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(rtr), router); err != nil {
// 			if errors.IsNotFound(err) {
// 				return nil
// 			}
// 			return err
// 		}
// 		found := false
// 		newHosts := []networkv1alpha1.HostRouterStatus{}
// 		for _, boundHosts := range router.Status.Hosts {
// 			if boundHosts.Node == r.Node.GetNode().Name && boundHosts.Subnet == subnet.Name {
// 				found = true
// 				continue
// 			}
// 			newHosts = append(newHosts, boundHosts)
// 		}

// 		if found {
// 			router.Status.Hosts = newHosts
// 			if err := r.Client.Status().Update(ctx, router); err != nil {
// 				return err
// 			}
// 		}
// 		return nil
// 	})
// }

// SetupWithManager sets up the controller with the Manager.
func (r *RouterReconciler) SetupWithManager(mgr ctrl.Manager) error {
	enqueueRequestForRouter := handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
		reqs := []reconcile.Request{}
		switch obj := o.(type) {
		case *networkv1alpha1.Subnet:
			rtrs := &networkv1alpha1.RouterList{}
			if err := r.Client.List(context.Background(), rtrs, client.InNamespace(obj.Namespace), client.MatchingFields{"RouterToSubnetIndex": obj.GetName()}); err != nil {
				fmt.Printf("got error listing routers - %s", err.Error())
				return nil
			}
			for _, rtr := range rtrs.Items {
				reqs = append(reqs, reconcile.Request{
					NamespacedName: types.NamespacedName{
						Namespace: obj.Namespace,
						Name:      rtr.Name,
					},
				})
			}
		case *networkv1alpha1.Network:
			rtrs := &networkv1alpha1.RouterList{}
			if err := r.Client.List(context.Background(), rtrs, client.InNamespace(obj.Namespace), client.MatchingFields{"RouterToNetworkIndex": obj.Name}); err != nil {
				fmt.Printf("got error listing routers - %s", err.Error())
				return nil
			}
			for _, rtr := range rtrs.Items {
				reqs = append(reqs, reconcile.Request{
					NamespacedName: types.NamespacedName{
						Namespace: obj.Namespace,
						Name:      rtr.Name,
					},
				})
			}
		case *computev1alpha1.VirtualMachine:
			for _, iface := range obj.Spec.NetworkInterfaces {
				reqs = append(reqs, reconcile.Request{
					NamespacedName: types.NamespacedName{
						Namespace: obj.Namespace,
						Name:      "router-" + iface.Network,
					},
				})
			}
		case *corev1alpha1.Node:
			rtrs := &networkv1alpha1.RouterList{}
			if err := r.Client.List(context.Background(), rtrs, client.InNamespace(obj.Namespace), client.MatchingFields{"RouterToNodeIndex": obj.Name}); err != nil {
				fmt.Printf("got error listing routers - %s", err.Error())
				return nil
			}
			for _, rtr := range rtrs.Items {
				reqs = append(reqs, reconcile.Request{
					NamespacedName: types.NamespacedName{
						Namespace: obj.Namespace,
						Name:      rtr.Name,
					},
				})
			}
			reqs = append(reqs, reconcile.Request{
				NamespacedName: types.NamespacedName{
					Namespace: obj.Namespace,
					Name:      "router-" + obj.Name,
				},
			})
		default:
			panic(fmt.Sprintf("unexpected %s", reflect.TypeOf(o).String()))

		}
		return reqs
	})

	mgr.GetFieldIndexer().IndexField(context.Background(), &computev1alpha1.VirtualMachine{}, "VmsToSubnetIndex", func(o client.Object) []string {
		obj := o.(*computev1alpha1.VirtualMachine)
		keys := []string{}
		for _, sn := range obj.Spec.NetworkInterfaces {
			keys = append(keys, sn.Network+sn.Subnet)
		}
		return keys
	})
	mgr.GetFieldIndexer().IndexField(context.Background(), &networkv1alpha1.Router{}, "RouterToSubnetIndex", func(o client.Object) []string {
		obj := o.(*networkv1alpha1.Router)
		keys := []string{}
		for _, sn := range obj.Spec.Subnets {
			keys = append(keys, sn.Name)
		}
		return keys
	})
	mgr.GetFieldIndexer().IndexField(context.Background(), &networkv1alpha1.Router{}, "RouterToNetworkIndex", func(o client.Object) []string {
		obj := o.(*networkv1alpha1.Router)
		keys := []string{}
		for _, sn := range obj.OwnerReferences {
			if sn.Kind == "Network" && sn.APIVersion == "network.ordiri.com/v1alpha1" {
				keys = append(keys, sn.Name)
			}
		}
		return keys
	})

	mgr.GetFieldIndexer().IndexField(context.Background(), &networkv1alpha1.Router{}, "RouterToNodeIndex", func(o client.Object) []string {
		obj := o.(*networkv1alpha1.Router)
		keys := []string{}
		for _, sn := range obj.Status.Hosts {
			keys = append(keys, sn.Node)
		}
		return keys
	})

	return ctrl.NewControllerManagedBy(mgr).
		For(&networkv1alpha1.Router{}).
		Watches(&source.Kind{Type: &computev1alpha1.VirtualMachine{}}, enqueueRequestForRouter).
		Watches(&source.Kind{Type: &networkv1alpha1.Subnet{}}, enqueueRequestForRouter).
		Watches(&source.Kind{Type: &networkv1alpha1.Network{}}, enqueueRequestForRouter).
		Watches(&source.Kind{Type: &corev1alpha1.Node{}}, enqueueRequestForRouter).
		Complete(r)
}
