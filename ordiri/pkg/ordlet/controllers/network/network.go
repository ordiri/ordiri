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

	"inet.af/netaddr"
	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/util/retry"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/network"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/ordlet"
)

// NetworkReconciler reconciles a Network object
type NetworkReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	Node           ordlet.NodeProvider
	NetworkManager api.NetworkManager
}

// Controls internet gateway & floating ip etc ona node
func (r *NetworkReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)
	log.V(5).Info("Starting to reconcile", "request", req)

	nw := &networkv1alpha1.Network{}
	if err := r.Client.Get(ctx, req.NamespacedName, nw); err != nil {
		if k8err.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	node := r.Node.GetNode()
	nodeHasNetwork := r.NetworkManager.HasNetwork(nw.Name)
	nodeWantsNetwork := false
	for _, nws := range node.Status.Networks {
		if nws.Name == nw.Name {
			nodeWantsNetwork = true
		}
	}

	if !r.Node.GetNode().HasRole(corev1alpha1.NodeRoleNetwork) {
		nodeWantsNetwork = false
	}

	var net api.Network
	if r.NetworkManager.HasNetwork(nw.Name) {
		net = r.NetworkManager.GetNetwork(nw.Name)
	} else {
		_net, err := network.NewNetwork(nw.Namespace, nw.Name, nw.Spec.Cidr, nw.Status.Vni)
		if err != nil {
			return ctrl.Result{}, err
		}
		net = _net
	}

	if !nodeWantsNetwork {
		if nodeHasNetwork {
			log.V(5).Info("removing node from network", "nodeWantsNetwork", nodeWantsNetwork, "nodeHasNetwork", nodeHasNetwork, "network", net)
			if err := r.NetworkManager.RemoveNetwork(ctx, net.Name()); err != nil {
				return ctrl.Result{}, err
			}
			log.Info("network references the node but the node doesn't want it, removing")
		} else {
			log.V(5).Info("network not on this node, skipping")
		}

		// We want to ensure we remove this node if weneed
		if err := r.removeNodeFromNetworkStatus(ctx, nw); err != nil {
			return ctrl.Result{}, err
		}
	} else if nodeWantsNetwork {
		log.V(5).Info("Starting to build networking", "nodeWantsNetwork", nodeWantsNetwork, "nodeHasNetwork", nodeHasNetwork, "network", net)
		vmsInNetwork := &computev1alpha1.VirtualMachineList{}
		if err := r.Client.List(ctx, vmsInNetwork, client.InNamespace(nw.Namespace), client.MatchingFields{"VmsByNetwork": nw.Name}); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to get vms in this network - %w", err)
		}

		for _, vm := range vmsInNetwork.Items {
			for _, iface := range vm.Spec.NetworkInterfaces {
				for _, ip := range iface.Ips {
					parsedIp, err := netaddr.ParseIP(ip)
					if err != nil {
						return ctrl.Result{}, err
					}
					net.WithDns(parsedIp, []string{vm.Name})
				}
			}
		}

		if err := r.NetworkManager.EnsureNetwork(ctx, net); err != nil {
			return ctrl.Result{}, err
		}
		log.Info("node wants the network")
		if !nodeHasNetwork {
			log.Info("a link from the node to the network")
			// ensure we are referencing the node we are running on in the subnets status so we can decommission the node
			// when removed
			err := r.addNodeToNetworkStatus(ctx, nw)
			if err != nil {
				return ctrl.Result{}, err
			}
		}
	} else {
		return ctrl.Result{}, fmt.Errorf("unknown action?")
	}

	return ctrl.Result{}, nil
}

func (r *NetworkReconciler) addNodeToNetworkStatus(ctx context.Context, nw *networkv1alpha1.Network) error {
	return retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		node := r.Node.GetNode()
		network := &networkv1alpha1.Network{}
		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(nw), network); err != nil {
			if k8err.IsNotFound(err) {
				return nil
			}
			return err
		}

		networkContainsNode := false
		for _, hostBinding := range network.Status.Hosts {
			if hostBinding.Node == node.Name {
				networkContainsNode = true
			}
		}

		if !networkContainsNode {
			network.Status.Hosts = append(network.Status.Hosts, networkv1alpha1.HostNetworkStatus{
				Node: node.Name,
			})

			if err := r.Client.Status().Update(ctx, network); err != nil {
				return err
			}
		}
		return nil
	})
}
func (r *NetworkReconciler) removeNodeFromNetworkStatus(ctx context.Context, nw *networkv1alpha1.Network) error {
	return retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		network := &networkv1alpha1.Network{}
		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(nw), network); err != nil {
			if k8err.IsNotFound(err) {
				return nil
			}
			return err
		}
		found := false
		newHosts := []networkv1alpha1.HostNetworkStatus{}
		for _, boundHosts := range network.Status.Hosts {
			if boundHosts.Node == r.Node.GetNode().Name {
				found = true
				continue
			}
			newHosts = append(newHosts, boundHosts)
		}
		if found {
			network.Status.Hosts = newHosts
			if err := r.Client.Status().Update(ctx, network); err != nil {
				return err
			}
		}
		return nil
	})
}

// SetupWithManager sets up the controller with the Manager.
func (r *NetworkReconciler) SetupWithManager(mgr ctrl.Manager) error {
	// ctx := context.Background()

	mgr.GetFieldIndexer().IndexField(context.TODO(), &computev1alpha1.VirtualMachine{}, "VmsByNetwork", func(o client.Object) []string {
		nws := []string{}
		obj := o.(*computev1alpha1.VirtualMachine)
		for _, iface := range obj.Spec.NetworkInterfaces {
			nws = append(nws, iface.Network)
		}
		return nws
	})

	return ctrl.NewControllerManagedBy(mgr).
		For(&networkv1alpha1.Network{}).
		// We want to watch nodes as they have the ability to request a network be scheduled on them
		Watches(&source.Kind{Type: &corev1alpha1.Node{}}, handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
			reqs := []reconcile.Request{}
			switch o := o.(type) {
			case *corev1alpha1.Node:
				for _, nw := range o.Status.Networks {
					reqs = append(reqs, reconcile.Request{
						NamespacedName: client.ObjectKey{Name: nw.Name},
					})
				}
			}
			return reqs
		})).
		Watches(&source.Kind{Type: &computev1alpha1.VirtualMachine{}}, handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
			reqs := []reconcile.Request{}
			switch o := o.(type) {
			case *computev1alpha1.VirtualMachine:
				for _, iface := range o.Spec.NetworkInterfaces {
					reqs = append(reqs, reconcile.Request{
						NamespacedName: client.ObjectKey{Name: iface.Network},
					})
				}
			}
			return reqs
		})).
		Complete(r)
}

// for around the natNabled section
// todo: Migrate to nftables...
// todo: need a network controller that listens on a channel for network events like "new subnet" and confugers
// not on a per code basic shelling to netlink...

// 	fmt.Printf("about to get the namespace\n")
// 	ns, err := netns.GetFromName(network.RouterNetworkNamespace())
// 	if err != nil {
// 		return err
// 	}
// 	defer ns.Close()
// 	if ns <= 0 {
// 		return fmt.Errorf("error getting network ns for router")
// 	}

// 	fmt.Printf("about to use the namespace %d\n", int(ns))
// 	nft, err := nftables.New(nftables.WithNetNSFd(int(ns)), nftables.AsLasting())
// 	if err != nil {
// 		return err
// 	}
// 	table := nft.AddTable(&firewall.Table{
// 		Name:   "ordiri",
// 		Family: nftables.TableFamilyIPv4,
// 	})

// 	postrouting := nft.AddChain(&firewall.Chain{
// 		Name:     "postrouting",
// 		Hooknum:  nftables.ChainHookPostrouting,
// 		Priority: nftables.ChainPriorityNATSource,
// 		Table:    table,
// 		Type:     nftables.ChainTypeNAT,
// 	})

// 	rules, err := nft.GetRules(table, postrouting)
// 	if err != nil {
// 		return fmt.Errorf("unabel to get firewall rules - %w", err)
// 	}
// 	_, cidrnet, err := net.ParseCIDR(network.Spec.Cidr)
// 	if err != nil {
// 		return err
// 	}
// 	// spew.Dump(nft.GetObjects(table))
// 	// nft.AddObject(&expr.Ct{})
// 	masq := firewall.Masquerade(table, postrouting, cidrnet)
// 	ftpConntrackHelper := &nftables.ConntrackHelperObj{
// 		NftTable: table,
// 		Name:     "ftp-standard",
// 		Type:     "ftp",
// 		L3Proto:  unix.NFPROTO_IPV4,
// 		L4Proto:  unix.IPPROTO_TCP,
// 	}

// 	nft.AddObject(ftpConntrackHelper)

// 	needs := []*firewall.Rule{
// 		masq,
// 	}
// 	for _, rule := range rules {
// 		if rule.UserData == nil {
// 			continue
// 		}
// 		for idx, need := range needs {
// 			if need == nil {
// 				continue
// 			}
// 			if bytes.Compare(rule.UserData, need.UserData) == 0 {
// 				needs[idx] = nil
// 			}
// 		}
// 	}

// 	for _, need := range needs {
// 		if need != nil {
// 			nft.AddRule(need)
// 		}
// 	}

// 	if err := nft.Flush(); err != nil {
// 		return err
// 	}

// }
