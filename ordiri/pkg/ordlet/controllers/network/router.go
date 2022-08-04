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

	"github.com/c-robinson/iplib"
	"github.com/digitalocean/go-openvswitch/ovs"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/ordiri/ordiri/pkg/ordlet"
	"github.com/vishvananda/netns"
)

// RouterReconciler reconciles a Router object
type RouterReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	Node ordlet.NodeProvider
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
	_ = log.FromContext(ctx)

	router := &networkv1alpha1.Router{}
	if err := r.Client.Get(ctx, req.NamespacedName, router); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	node := r.Node.GetNode()
	nodeWantsRouter := false

	// var finalizer = "changeme-" + r.Node.GetNode().Name

	for _, nws := range node.Status.Networks {
		if nws.Name == router.Name {
			nodeWantsRouter = true
		}
	}

	if nodeWantsRouter && !r.Node.GetNode().HasRole(corev1alpha1.NodeRoleNetwork) {
		nodeWantsRouter = false
	}

	network := &networkv1alpha1.Network{}
	if err := r.Client.Get(ctx, req.NamespacedName, network); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}
	wg := sync.WaitGroup{}
	errs := []error{}
	for _, selector := range router.Spec.Subnets {
		thisSel := selector
		wg.Add(1)
		// not safe
		go func() {
			defer wg.Done()
			subnet := &networkv1alpha1.Subnet{}
			subnet.Name = thisSel.Name
			if err := r.Client.Get(ctx, client.ObjectKeyFromObject(subnet), subnet); err != nil {
				errs = append(errs, err)
				return
			}

			if !nodeWantsRouter {
				if err := r.removeRouter(ctx, network, subnet); err != nil {
					errs = append(errs, err)
				}

			} else {
				if err := r.installRouter(ctx, network, subnet); err != nil {
					errs = append(errs, err)
				}
			}
		}()
	}
	wg.Wait()

	if len(errs) > 0 {
		return ctrl.Result{}, fmt.Errorf("errrors encountered %+v", errs)
	}

	return ctrl.Result{}, nil
}

func (r *RouterReconciler) removeRouter(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
	log := log.FromContext(ctx)
	internalCableName := subnet.RouterNetworkInternalCableName()
	log.Info("Deleting port for router ", "cableName", internalCableName)
	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.DeletePort(sdn.WorkloadSwitchName, internalCableName+"-out"); err != nil && !isPortNotExist(err) {
		return fmt.Errorf("unable to remove ovs port - %w", err)
	}

	log.Info("Deleting veth cable for router ", "cableName", internalCableName)
	if err := removeVeth(internalCableName); err != nil {
		return fmt.Errorf("unable to remove ethernet cable - %w", err)
	}
	ruleSets := r.rulesets(nw.RouterNetworkPublicGatewayCableName()+"-in", internalCableName+"-in")
	if handle, err := netns.GetFromName(subnet.RouterNetworkNamespace()); err == nil {
		log.Info("removing ip table rules ", "ns", subnet.RouterNetworkNamespace(), "rule_count", len(ruleSets))
		defer handle.Close()
		ipt, err := sdn.Iptables(subnet.RouterNetworkNamespace())
		if err != nil {
			return fmt.Errorf("create iptables - %w", err)
		}
		for _, ruleSet := range ruleSets {
			for _, rule := range ruleSet.Rules {
				err := ipt.DeleteIfExists(ruleSet.Table, ruleSet.Chain, rule...)
				if err != nil {
					return err
				}
			}
		}
	} else {
		log.Info("router network namespace does not exist, skipping ", "ns", subnet.RouterNetworkNamespace(), "rule_count", len(ruleSets))
	}
	log.Info("router has been removed from node")
	return nil
}
func (r *RouterReconciler) installRouter(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
	err := createNetworkNs(subnet.RouterNetworkNamespace())
	if err != nil {
		return fmt.Errorf("unable to create router network namespace - %w", err)
	}

	internetNetworkRouterCable := subnet.RouterNetworkInternalCableName()
	if err := createVeth(internetNetworkRouterCable, subnet.RouterNetworkNamespace()); err != nil {
		return fmt.Errorf("unable to create internal veth cable - %w", err)
	}

	vlan, err := r.Node.GetNode().SubnetVlanId(subnet.Name)
	if err != nil {
		return fmt.Errorf("unable to get subnet vladi id for router - %w", err)
	}

	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.AddPort(sdn.WorkloadSwitchName, internetNetworkRouterCable+"-out"); err != nil {
		return err
	}

	if err := sdn.Ovs().VSwitch.Set.Port(internetNetworkRouterCable+"-out", ovs.PortOptions{
		Tag: vlan,
	}); err != nil {
		return err
	}

	_, dhcpNet, err := iplib.ParseCIDR(subnet.Spec.Cidr)
	if err != nil {
		return fmt.Errorf("unable to parse router cidr - %w", err)
	}

	dhcpAddr := dhcpNet.FirstAddress()

	ones, _ := dhcpNet.Mask().Size()

	if err := setNsVethIp(subnet.RouterNetworkNamespace(), fmt.Sprintf("%s/%d", dhcpAddr.String(), ones), internetNetworkRouterCable); err != nil {
		return fmt.Errorf("unable to set router ip on internal cable %s - %W", internetNetworkRouterCable, err)
	}

	ipt, err := sdn.Iptables(subnet.RouterNetworkNamespace())
	if err != nil {
		return err
	}

	ruleSets := r.rulesets(nw.RouterNetworkPublicGatewayCableName()+"-in", internetNetworkRouterCable+"-in")

	for _, ruleSet := range ruleSets {
		for _, rule := range ruleSet.Rules {
			err := ipt.AppendUnique(ruleSet.Table, ruleSet.Chain, rule...)
			if err != nil {
				return err
			}
		}
	}

	return nil
	// return fmt.Errorf("not uimplemented")
}

func (nw *RouterReconciler) rulesets(externalCablename string, internalCableName string) []iptRule {
	return []iptRule{{
		Table: "filter",
		Chain: "FORWARD",
		Rules: [][]string{
			{"-i", externalCablename, "-o", internalCableName, "-j", "ACCEPT"},
			{"-i", internalCableName, "-o", externalCablename, "-j", "ACCEPT"},
		},
	},
	}
}

// SetupWithManager sets up the controller with the Manager.
func (r *RouterReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&networkv1alpha1.Router{}).
		Complete(r)
}
