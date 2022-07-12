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

package controllers

import (
	"context"
	"fmt"
	"time"

	"k8s.io/apimachinery/pkg/api/errors"
	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/util/retry"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/ordiri/ordiri/pkg/ordlet"
)

// NetworkReconciler reconciles a Network object
type NetworkReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	Node ordlet.NodeProvider
}

func (r *NetworkReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)
	log.V(5).Info("Starting to reconcile", "request", req)
	if r.Node.GetNode().UID == "" {
		log.V(5).Info("requeueing, no node set yet")
		return ctrl.Result{RequeueAfter: time.Second * 1}, nil
	}

	network := &networkv1alpha1.Network{}
	if err := r.Client.Get(ctx, req.NamespacedName, network); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}
	node := r.Node.GetNode()
	nodeWantsNetwork := false
	networkReferencesNode := false
	for _, nws := range node.Status.Networks {
		if nws.Name == network.Name {
			nodeWantsNetwork = true
		}
	}

	if nodeWantsNetwork && !r.Node.GetNode().HasRole(corev1alpha1.NodeRoleNetwork) {
		nodeWantsNetwork = false
	}
	for _, host := range network.Status.Hosts {
		if host.Node == node.Name {
			networkReferencesNode = true
		}
	}

	if networkReferencesNode && !nodeWantsNetwork {
		log.Info("network references the node but the node doesn't want it, removing")
		if err := r.removeRouter(ctx, network); err != nil {
			return ctrl.Result{}, err
		}

		// We wan to ensure we remove this node if weneed
		err := retry.RetryOnConflict(retry.DefaultBackoff, func() error {
			network := &networkv1alpha1.Network{}
			if err := r.Client.Get(ctx, req.NamespacedName, network); err != nil {
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

		if err != nil {
			return ctrl.Result{}, err
		}
	} else if nodeWantsNetwork {
		log.Info("node wants the network")
		if !networkReferencesNode {
			log.Info("a link from the node to the network")
			// ensure we are referencing the node we are running on in the subnets status so we can decommission the node
			// when removed
			err := retry.RetryOnConflict(retry.DefaultBackoff, func() error {
				node := r.Node.GetNode()
				network := &networkv1alpha1.Network{}
				if err := r.Client.Get(ctx, req.NamespacedName, network); err != nil {
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
					log.Info("creating link from network to host")
					network.Status.Hosts = append(network.Status.Hosts, networkv1alpha1.HostNetworkStatus{
						Node: node.Name,
					})

					if err := r.Client.Status().Update(ctx, network); err != nil {
						return err
					}
				}
				return nil
			})
			if err != nil {
				return ctrl.Result{}, err
			}
		}
		if err := r.installRouter(ctx, network); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}
func (r *NetworkReconciler) removeRouter(ctx context.Context, network *networkv1alpha1.Network) error {
	// Even better, migrate to eBPF... :rocket:
	if err := r.removeNat(ctx, network); err != nil {
		return err
	}

	if err := deleteNetworkNs(network.RouterNetworkNamespace()); err != nil {
		return err
	}

	return nil
}
func (r *NetworkReconciler) removeNat(ctx context.Context, network *networkv1alpha1.Network) error {
	log := log.FromContext(ctx)
	ipt, err := sdn.Iptables(network.RouterNetworkNamespace())

	if err != nil {
		return err
	}

	gatewayCableName := network.RouterNetworkPublicGatewayCableName()
	log.Info("removing veth cable ", "cableName", gatewayCableName)
	if err := removeVeth(gatewayCableName); err != nil {
		return fmt.Errorf("unable to delete internal router veth cable - %w", err)
	}

	log.Info("deleting ovs nat port ", "cableName", gatewayCableName)
	if err := sdn.Ovs().VSwitch.DeletePort(sdn.ExternalSwitchName, gatewayCableName+"-out"); err != nil && !isPortNotExist(err) {
		return fmt.Errorf("unable to delete public gateway cable - %w", err)
	}

	log.Info("removing masquerade rulesets", "cableName", gatewayCableName)
	ruleSets := r.rulesets(network.Spec.Cidr, gatewayCableName+"-in")
	for _, ruleSet := range ruleSets {
		for _, rule := range ruleSet.Rules {
			err := ipt.DeleteIfExists(ruleSet.Table, ruleSet.Chain, rule...)
			if err != nil {
				return err
			}
		}
	}

	return nil
}
func (r *NetworkReconciler) installRouter(ctx context.Context, network *networkv1alpha1.Network) error {
	if err := createNetworkNs(network.RouterNetworkNamespace()); err != nil {
		return fmt.Errorf("unable to create network ns - %s - %w", string(network.RouterNetworkNamespace()), err)
	}

	// Even better, migrate to eBPF... :rocket:
	if network.NatEnabled() {
		if err := r.installNat(ctx, network); err != nil {
			return err
		}
	}

	return nil
}

func (r *NetworkReconciler) installNat(ctx context.Context, network *networkv1alpha1.Network) error {
	ipt, err := sdn.Iptables(network.RouterNetworkNamespace())

	if err != nil {
		return err
	}

	gatewayCableName := network.RouterNetworkPublicGatewayCableName()
	if err := createVeth(gatewayCableName, network.RouterNetworkNamespace()); err != nil {
		return fmt.Errorf("unable to create internal router veth cable - %w", err)
	}

	if err := sdn.Ovs().VSwitch.AddPort(sdn.ExternalSwitchName, gatewayCableName+"-out"); err != nil {
		return err
	}

	ruleSets := r.rulesets(network.Spec.Cidr, gatewayCableName+"-in")

	for _, ruleSet := range ruleSets {
		for _, rule := range ruleSet.Rules {
			err := ipt.AppendUnique(ruleSet.Table, ruleSet.Chain, rule...)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func (nw *NetworkReconciler) rulesets(cidr string, cableName string) []iptRule {
	return []iptRule{
		{
			Table: "raw",
			Chain: "PREROUTING",
			Rules: [][]string{
				{"-p", "udp", "--dport", "69", "-s", cidr, "-j", "CT", "--helper", "tftp"},
			},
		}, {
			Table: "nat",
			Chain: "POSTROUTING",
			Rules: [][]string{
				{"-o", cableName, "-j", "MASQUERADE"},
			},
		},
	}
}

// SetupWithManager sets up the controller with the Manager.
func (r *NetworkReconciler) SetupWithManager(mgr ctrl.Manager) error {
	// ctx := context.Background()

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
