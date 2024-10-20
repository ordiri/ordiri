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

	"inet.af/netaddr"
	k8err "k8s.io/apimachinery/pkg/api/errors"
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
	"github.com/ordiri/ordiri/pkg/mac"
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
	log.V(8).Info("Starting to reconcile", "request", req)
	subnet := &networkv1alpha1.Subnet{}
	if err := r.Client.Get(ctx, req.NamespacedName, subnet); err != nil {
		if k8err.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	node := r.Node.GetNode()

	nodeWantsSubnet := false
	if _, err := node.Subnet(subnet.Spec.Network.Name, subnet.Name); err == nil {
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
		log.V(8).Info("node does not want subnet, removing")
		if sn, err := r.NetworkManager.GetSubnet(nw.Name, subnet.Name); err == nil {
			log.V(5).Info("removing subnet from network manager", "subnet", sn)
			if err := r.NetworkManager.RemoveSubnet(ctx, nw.Name, subnet.Name); err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to remove subnet from node - %w", err)
			}
			log.V(5).Info("removed subnet from network manager")
		}

		// We want to ensure we remove this node if we need
		log.V(8).Info("removing node from subnet status")
		if err := r.removeNodeFromSubnetStatus(ctx, subnet); err != nil {
			return ctrl.Result{}, fmt.Errorf("error removing node from subnet status: %s from %s", subnet.Name, r.Node.GetNode().GetName())
		}

		log.V(8).Info("removing node finalizers from subnet")
		// finally we remove the finalizer from the subnet
		if err := r.removeNodeFinalizerFromSubnet(ctx, subnet); err != nil {
			return ctrl.Result{}, fmt.Errorf("error removing node from subnet finalizers: %s from %s", subnet.Name, r.Node.GetNode().GetName())
		}

		return ctrl.Result{}, nil
	}
	if err := r.addNodeFinalizerToSubnet(ctx, subnet); err != nil {
		return ctrl.Result{}, err
	}

	hostLocalMac := mac.Unicast()
	for _, m := range subnet.Status.Hosts {
		if m.Node == r.Node.GetNode().Name {
			if m.Router.Mac != "" {
				hlm, err := mac.Parse(m.Router.Mac)
				if err == nil {
					hostLocalMac = hlm
				}
			}
			break
		}
	}

	sn, err := r.NetworkManager.GetSubnet(nw.Name, subnet.Name)
	if err != nil {
		vlan, err := r.Node.GetNode().NetworkVlanId(nw.Name)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("missing vlan on subnet")
		}

		log.V(8).Info("network manager has not seen this subnet yet, creating a new one")
		routerMac, err := mac.Parse(subnet.Spec.Router.Mac)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("error parsing router mac - %w", err)
		}
		newSubnet, err := network.NewSubnet(subnet.Name, subnet.Spec.Cidr, subnet.Spec.Cidr6, vlan, hostLocalMac, routerMac)
		if err != nil {
			return ctrl.Result{}, err
		}
		sn = newSubnet
		log.V(8).Info("got new subnet", "subnet", newSubnet)
	}

	if sn == nil {
		return ctrl.Result{}, fmt.Errorf("unable to ensure subnet is configured correctly")
	}
	vms := &computev1alpha1.VirtualMachineList{}
	if err := r.Client.List(ctx, vms, client.InNamespace(subnet.Namespace), client.MatchingFields{"VmsToSubnetIndex": nw.Name + subnet.Name}); err != nil {
		return ctrl.Result{}, fmt.Errorf("aoe - %w", err)
	}
	for _, vm := range vms.Items {
		for _, iface := range vm.Spec.NetworkInterfaces {
			if len(iface.Ips) == 0 {
				return ctrl.Result{}, fmt.Errorf("vm %q, interface %+v has no ip yet", vm.Name, iface)
			}
			macAddr, err := mac.Parse(iface.Mac)
			if err != nil {
				return ctrl.Result{}, fmt.Errorf("aoe - %w", err)
			}
			for _, ip := range iface.Ips {
				addr, err := netaddr.ParseIPPrefix(ip)
				if err != nil {
					return ctrl.Result{}, fmt.Errorf("unable to parse ip for network interface - %w", err)
				}

				sn.RegisterMac(addr.IP(), macAddr)
			}
		}
	}

	log.V(8).Info("ensuring subnet is configured by the driver", "subnet", sn)
	if err := r.NetworkManager.RegisterSubnet(ctx, nw.Name, sn); err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to ensure subnet is configured correctly - %w", err)
	}

	log.V(8).Info("adding node to status", "subnet", subnet)
	if err := r.addNodeToSubnetStatus(ctx, subnet, hostLocalMac); err != nil {
		return ctrl.Result{}, err
	}
	log.V(8).Info("added node to status", "subnet", subnet)

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

// 		log.V(8).Info("installing NAT on node")
// 		if err := r.installNat(ctx, subnet); err != nil {
// 			return err
// 		}
// 		if subnet.Spec.Dhcp.Enabled {
// 			log.V(8).Info("dhcp enabled, installing dhcp on node")
// 			// Create the DHCP service for this subnet
// 			if err := r.installDhcp(ctx, subnet); err != nil {
// 				return err
// 			}
// 		} else {
// 			log.V(8).Info("dhcp disabled, ensuring dhcp is removed")
// 			if err := r.removeDhcp(ctx, nw, subnet); err != nil {
// 				return err
// 			}
// 		}
// 	}

// 	// Setup all the flow rules for any VM in this subnet
// 	log.V(8).Info("installing openflow rules on node")
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
