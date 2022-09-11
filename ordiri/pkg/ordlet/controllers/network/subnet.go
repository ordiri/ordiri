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
	"time"

	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	"github.com/ordiri/ordiri/pkg/network"
	"github.com/ordiri/ordiri/pkg/network/api"

	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/ordlet"

	"github.com/coreos/go-systemd/v22/dbus"
)

// SubnetReconciler reconciles a Subnet object
type SubnetReconciler struct {
	client.Client
	Scheme *runtime.Scheme
	dbus   *dbus.Conn

	Node           ordlet.NodeProvider
	NetworkManager api.Manager
}

func (r *SubnetReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)
	log.Info("Starting to reconcile", "request", req)
	subnet := &networkv1alpha1.Subnet{}
	if err := r.Client.Get(ctx, req.NamespacedName, subnet); err != nil {
		if k8err.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	node := r.Node.GetNode()

	nodeWantsSubnet := false
	if _, err := node.Subnet(subnet.Name); err == nil {
		nodeWantsSubnet = true
	}

	subnetHasNode := false
	for _, host := range subnet.Status.Hosts {
		if host.Node == node.Name {
			subnetHasNode = true
		}
	}

	if !nodeWantsSubnet && !subnetHasNode {
		return ctrl.Result{}, nil
	}

	nw := &networkv1alpha1.Network{}
	if err := r.Client.Get(ctx, types.NamespacedName{Namespace: subnet.Namespace, Name: subnet.Spec.Network.Name}, nw); err != nil {
		return ctrl.Result{}, err
	}

	// If the node doesn't want this subnet anymore
	// but the subnet is setup on it, we need to remove all the subnet configs from it
	if !nodeWantsSubnet {
		log.Info("node does not want subnet, removing")
		if r.NetworkManager.HasNetwork(nw.Name) {
			net := r.NetworkManager.GetNetwork(nw.Name)
			if r.NetworkManager.HasSubnet(net, subnet.Name) {
				log.V(5).Info("removing subnet from network manager")
				if err := r.NetworkManager.RemoveSubnet(ctx, net, subnet.Name); err != nil {
					return ctrl.Result{}, fmt.Errorf("unable to remove subnet from node - %w", err)
				}
				log.V(5).Info("removed subnet from network manager")
			}
		}

		// We want to ensure we remove this node if we need
		log.Info("removing node from subnet status")
		if err := r.removeNodeFromSubnetStatus(ctx, subnet); err != nil {
			return ctrl.Result{}, fmt.Errorf("error removing node from subnet status: %s from %s", subnet.Name, r.Node.GetNode().GetName())
		}

		log.Info("removing node finalizers from subnet")
		// finally we remove the finalizer from the subnet
		if err := r.removeNodeFinalizerFromSubnet(ctx, subnet); err != nil {
			return ctrl.Result{}, fmt.Errorf("error removing node from subnet finalizers: %s from %s", subnet.Name, r.Node.GetNode().GetName())
		}

		return ctrl.Result{}, nil
	}

	if !r.NetworkManager.HasNetwork(nw.Name) {
		log.Info("waiting for network manager to start", "name", nw.Name)
		return ctrl.Result{RequeueAfter: time.Second * 1}, nil
	}

	if err := r.addNodeFinalizerToSubnet(ctx, subnet); err != nil {
		return ctrl.Result{}, err
	}

	net := r.NetworkManager.GetNetwork(nw.Name)

	var sn api.Subnet
	if !r.NetworkManager.HasSubnet(net, subnet.Name) {
		vlan, err := r.Node.GetNode().SubnetVlanId(subnet.Name)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("missing vlan on subnet")
		}

		log.Info("network manager has not seen this subnet yet, creating a new one")
		newSubnet, err := network.NewSubnet(subnet.Namespace, subnet.Name, subnet.Spec.Cidr, vlan)
		if err != nil {
			return ctrl.Result{}, err
		}
		sn = newSubnet
	} else {
		log.Info("network manager knows about this subnet, retrieving existing details")
		newSubnet := r.NetworkManager.GetSubnet(net, subnet.Name)
		sn = newSubnet
	}

	log.Info("ensuring subnet is configured by the driver")
	if err := r.NetworkManager.EnsureSubnet(ctx, net, sn); err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to ensure subnet is configured correctly - %w", err)
	}

	if err := r.addNodeToSubnetStatus(ctx, subnet); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

// func (r *SubnetReconciler) unconfigure(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
// 	// // Create the DHCP service for this subnet
// 	// if err := r.removeDhcp(ctx, nw, subnet); err != nil {
// 	// 	return fmt.Errorf("unable to unconfigure dhcp - %w", err)
// 	// }
// 	ovsClient := sdn.Ovs()

// 	vlanId, err := r.Node.GetNode().SubnetVlanId(subnet.Name)
// 	if err == nil {
// 		// Setup all the flow rules for any VM in this subnet
// 		flows, err := r.flows(ctx, nw, subnet, vlanId)
// 		if err != nil {
// 			return fmt.Errorf("unable to unconfigure openflow - %w", err)
// 		}

// 		for _, flow := range flows {
// 			if err := flow.Remove(ovsClient); err != nil {
// 				return fmt.Errorf("unable to unconfigure openflow rule %+v - %w", flow, err)
// 			}
// 		}
// 	}
// 	return nil
// }

// func (r *SubnetReconciler) configure(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
// 	log := log.FromContext(ctx).WithValues("stage", "configure")

// 	// ensure we are referencing the node we are running on in the subnets status so we can decommission the node
// 	// when removed
// 	err := r.addNodeToSubnetStatus(ctx, subnet)
// 	if err != nil {
// 		return err
// 	}
// 	if r.Node.GetNode().HasRole(corev1alpha1.NodeRoleNetwork) {

// 		log.Info("installing NAT on node")
// 		if err := r.installNat(ctx, subnet); err != nil {
// 			return err
// 		}
// 		if subnet.Spec.Dhcp.Enabled {
// 			log.Info("dhcp enabled, installing dhcp on node")
// 			// Create the DHCP service for this subnet
// 			if err := r.installDhcp(ctx, subnet); err != nil {
// 				return err
// 			}
// 		} else {
// 			log.Info("dhcp disabled, ensuring dhcp is removed")
// 			if err := r.removeDhcp(ctx, nw, subnet); err != nil {
// 				return err
// 			}
// 		}
// 	}

// 	// Setup all the flow rules for any VM in this subnet
// 	log.Info("installing openflow rules on node")
// 	if err := r.installFlows(ctx, subnet); err != nil {
// 		return err
// 	}
// 	return nil
// }

// SetupWithManager sets up the controller with the Manager.
func (r *SubnetReconciler) SetupWithManager(mgr ctrl.Manager) error {
	ctx := context.Background()
	conn, err := dbus.NewWithContext(ctx)
	if err != nil {
		return err
	}

	r.dbus = conn

	enqueueRequestFromNode := handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
		reqs := []reconcile.Request{}
		switch obj := o.(type) {
		case *corev1alpha1.Node:
			for _, iface := range obj.Status.Subnets {
				reqs = append(reqs, reconcile.Request{
					NamespacedName: types.NamespacedName{
						Namespace: obj.Namespace,
						Name:      iface.Name,
					},
				})
			}
		default:
			panic(fmt.Sprintf("unexpected %s", reflect.TypeOf(o).String()))

		}
		return reqs
	})

	return ctrl.NewControllerManagedBy(mgr).
		For(&networkv1alpha1.Subnet{}).
		Watches(&source.Kind{Type: &corev1alpha1.Node{}}, enqueueRequestFromNode).
		Complete(r)
}
