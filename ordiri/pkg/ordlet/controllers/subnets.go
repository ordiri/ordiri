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
	"io"
	"os"
	"path"
	"path/filepath"
	"reflect"
	"strings"
	"syscall"

	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/util/retry"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"sigs.k8s.io/controller-runtime/pkg/source"

	"github.com/c-robinson/iplib"
	"github.com/digitalocean/go-openvswitch/ovs"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	"github.com/vishvananda/netns"

	network "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/network/dhcp"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/ordiri/ordiri/pkg/ordlet"

	"github.com/coreos/go-systemd/v22/dbus"
	"github.com/coreos/go-systemd/v22/unit"
)

// SubnetReconciler reconciles a Subnet object
type SubnetReconciler struct {
	client.Client
	Scheme *runtime.Scheme
	dbus   *dbus.Conn

	Node ordlet.NodeProvider
}

const (
	SubnetProvisionedFinalizer = "ordlet.ordiri.com/node"
)

func (r *SubnetReconciler) Finalizer() string {
	return fmt.Sprintf("%s-%s", SubnetProvisionedFinalizer, r.Node.GetNode().Name)
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

	nw := &networkv1alpha1.Network{}
	if err := r.Client.Get(ctx, types.NamespacedName{Name: subnet.Spec.Network.Name}, nw); err != nil {
		return ctrl.Result{}, err
	}
	log.Info("got to here with the subnet node")

	// If the node doesn't want this subnet anymore
	// but the subnet is setup on it, we need to remove all the subnet configs from it
	if _, err := r.Node.GetNode().SubnetVlanId(subnet.Name); err != nil {
		nodeHasSubnet := false
		for _, boundHosts := range subnet.Status.Hosts {
			if boundHosts.Node == r.Node.GetNode().Name {
				nodeHasSubnet = true
				break
			}
		}
		if !nodeHasSubnet {
			log.Info("node does not contain subnet")
			return ctrl.Result{}, nil
		}
		log.Info("unconfiguring node")
		err := r.unconfigure(ctx, nw, subnet)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to unconfigure subnet - %w", err)
		}

		// We wan to ensure we remove this node if weneed
		retry.RetryOnConflict(retry.DefaultBackoff, func() error {
			subnet := &networkv1alpha1.Subnet{}
			if err := r.Client.Get(ctx, req.NamespacedName, subnet); err != nil {
				if k8err.IsNotFound(err) {
					return nil
				}
				return err
			}
			found := false
			newHosts := []networkv1alpha1.HostSubnetStatus{}
			for _, boundHosts := range subnet.Status.Hosts {
				if boundHosts.Node == r.Node.GetNode().Name {
					found = true
					continue
				}
				newHosts = append(newHosts, boundHosts)
			}
			if found {
				subnet.Status.Hosts = newHosts
				if err := r.Client.Status().Update(ctx, subnet); err != nil {
					return err
				}
			}
			return nil
		})

		finalizers := []string{}
		for _, finalizer := range subnet.GetFinalizers() {
			if finalizer == r.Finalizer() {
				continue
			}
			finalizers = append(finalizers, finalizer)
		}
		if !reflect.DeepEqual(finalizers, subnet.GetFinalizers()) {
			log.Info("removing finalizer")
			subnet.SetFinalizers(finalizers)
			if err := r.Client.Update(ctx, subnet); err != nil {
				return ctrl.Result{}, err
			}
		} else {
			log.Info("no finalizer to remove")
		}

		// newHosts := []v1alpha1.Network{}

		return ctrl.Result{}, err
	}
	log.Info("node needs subnet, ensuring finalizers exist")

	finalizers := subnet.GetFinalizers()
	found := false
	for _, finalizer := range subnet.GetFinalizers() {
		found = finalizer == r.Finalizer() || found
	}

	if !found {
		finalizers = append(finalizers, r.Finalizer())
	}

	if !reflect.DeepEqual(finalizers, subnet.GetFinalizers()) {
		subnet.SetFinalizers(finalizers)
		if err := r.Client.Update(ctx, subnet); err != nil {
			return ctrl.Result{}, err
		}
	}

	log.Info("configuring subnet on node")
	err := r.configure(ctx, nw, subnet)
	if err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *SubnetReconciler) unconfigure(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
	if err := r.removeRouter(ctx, nw, subnet); err != nil {
		return fmt.Errorf("unable to unconfigure router - %w", err)
	}
	// Create the DHCP service for this subnet
	if err := r.removeDhcp(ctx, nw, subnet); err != nil {
		return fmt.Errorf("unable to unconfigure dhcp - %w", err)
	}
	ovsClient := sdn.Ovs()

	vlanId, err := r.Node.GetNode().SubnetVlanId(subnet.Name)
	if err == nil {
		// Setup all the flow rules for any VM in this subnet
		flows, err := r.flows(ctx, nw, subnet, vlanId)
		if err != nil {
			return fmt.Errorf("unable to unconfigure openflow - %w", err)
		}

		for _, flow := range flows {
			if err := flow.Remove(ovsClient); err != nil {
				return fmt.Errorf("unable to unconfigure openflow rule %+v - %w", flow, err)
			}
		}
	}
	return nil
}
func (r *SubnetReconciler) configure(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
	log := log.FromContext(ctx).WithValues("stage", "configure")

	// ensure we are referencing the node we are running on in the subnets status so we can decommission the node
	// when removed
	err := retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		node := r.Node.GetNode()
		subnetLinksToNode := false
		for _, hostBinding := range subnet.Status.Hosts {
			if hostBinding.Node == node.Name {
				subnetLinksToNode = true
			}
		}

		if !subnetLinksToNode {
			log.Info("creating link from subnet to host")
			vlanId, err := node.SubnetVlanId(subnet.Name)
			if err != nil {
				return err
			}
			subnet.Status.Hosts = append(subnet.Status.Hosts, networkv1alpha1.HostSubnetStatus{
				Node:   node.Name,
				VlanId: vlanId,
			})

			if err := r.Client.Status().Update(ctx, subnet); err != nil {
				return err
			}
		}
		return nil
	})
	if err != nil {
		return err
	}
	if r.Node.GetNode().HasRole(corev1alpha1.NodeRoleNetwork) {
		log.Info("installing router on node")
		if err := r.installRouter(ctx, nw, subnet); err != nil {
			return err
		}
		log.Info("installing NAT on node")
		if err := r.installNat(ctx, subnet); err != nil {
			return err
		}
		if subnet.Spec.Dhcp.Enabled {
			log.Info("dhcp enabled, installing dhcp on node")
			// Create the DHCP service for this subnet
			if err := r.installDhcp(ctx, subnet); err != nil {
				return err
			}
		} else {
			log.Info("dhcp disabled, ensuring dhcp is removed")
			if err := r.removeDhcp(ctx, nw, subnet); err != nil {
				return err
			}
		}
	}

	// Setup all the flow rules for any VM in this subnet
	log.Info("installing openflow rules on node")
	if err := r.installFlows(ctx, subnet); err != nil {
		return err
	}
	return nil
}
func (r *SubnetReconciler) removeRouter(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
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
func (r *SubnetReconciler) removeDhcp(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
	cableName := subnet.ServiceNetworkCableName()
	log := log.FromContext(ctx)

	log.Info("Deleting port for dhcp", "cableName", cableName)
	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.DeletePort(sdn.WorkloadSwitchName, cableName+"-out"); err != nil && !isPortNotExist(err) {
		return fmt.Errorf("unable to remove dhcp port - %w", err)
	}
	log.Info("Deleting veth cable for router ", "cableName", cableName)
	if err := removeVeth(cableName); err != nil {
		return fmt.Errorf("unable to delete veth cable %s - %w", cableName, err)
	}

	// create the dnsmasq config to provide dhcp for this subnet
	baseDir := filepath.Join("/run/ordiri/subnets", subnet.Name, "dhcp")

	if err := r.dbus.ReloadContext(ctx); err != nil {
		return err
	}
	units, err := r.dbus.ListUnitsByNamesContext(ctx, []string{subnet.DhcpUnitName()})
	if err != nil {
		return err
	}

	if len(units) > 0 {
		for _, unit := range units {
			if unit.ActiveState == "active" {
				r.dbus.KillUnitContext(ctx, unit.Name, int32(syscall.SIGTERM))
			}
			if unit.LoadState != "not-found" {
				if _, err := r.dbus.DisableUnitFilesContext(ctx, []string{unit.Name}, true); err != nil {
					return fmt.Errorf("unable to disable unit file %+v - %w", unit, err)
				}
			}
		}
	}

	if err := os.RemoveAll(baseDir); err != nil {
		return fmt.Errorf("unable to remove subnet runtime files - %w", err)
	}

	log.Info("deleting the network namespace for DHCP ", "ns", subnet.ServiceNetworkNamespace())

	if err := deleteNetworkNs(subnet.ServiceNetworkNamespace()); err != nil {
		return fmt.Errorf("unable to delete network namespace - %w", err)
	}

	return nil
}

func (r *SubnetReconciler) installRouter(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet) error {
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

func (nw *SubnetReconciler) rulesets(externalCablename string, internalCableName string) []iptRule {
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

func (r *SubnetReconciler) installNat(ctx context.Context, subnet *networkv1alpha1.Subnet) error {
	return nil
	// return fmt.Errorf("not uimplemented")
}

func (r *SubnetReconciler) installDhcp(ctx context.Context, subnet *networkv1alpha1.Subnet) error {
	log := log.FromContext(ctx)

	err := createNetworkNs(subnet.ServiceNetworkNamespace())

	if err != nil {
		return fmt.Errorf("unable to create network namespace - %w", err)
	}

	cableName := subnet.ServiceNetworkCableName()
	if err := createVeth(cableName, subnet.ServiceNetworkNamespace()); err != nil {
		return fmt.Errorf("unable to create veth cable %s - %w", cableName, err)
	}

	vlan, err := r.Node.GetNode().SubnetVlanId(subnet.Name)
	if err != nil {
		return fmt.Errorf("unable to get subnet vlan when installing dhcp - %w", err)
	}

	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.AddPort(sdn.WorkloadSwitchName, cableName+"-out"); err != nil {
		return err
	}
	if err := sdn.Ovs().VSwitch.Set.Port(cableName+"-out", ovs.PortOptions{
		Tag: vlan,
	}); err != nil {
		return err
	}

	_, dhcpNet, err := iplib.ParseCIDR(subnet.Spec.Cidr)
	if err != nil {
		return fmt.Errorf("unable to dhcp parse cidr addr - %w", err)
	}

	ones, _ := dhcpNet.Mask().Size()

	dhcpAddr := iplib.NextIP(dhcpNet.FirstAddress())

	if err := setNsVethIp(subnet.ServiceNetworkNamespace(), fmt.Sprintf("%s/%d", dhcpAddr.String(), ones), cableName); err != nil {
		return fmt.Errorf("unable to set dhcp ip on internal cable %s - %W", cableName, err)
	}

	// create the dnsmasq config to provide dhcp for this subnet
	baseDir := filepath.Join("/run/ordiri/subnets", subnet.Name, "dhcp")

	dnsMasqOptions := dhcp.DnsMasqConfig(baseDir, subnet.Name, dhcpNet)
	if err := os.MkdirAll(baseDir, os.ModePerm); err != nil {
		return fmt.Errorf("unable to create directory %s - %w", baseDir, err)
	}

	hostFile := filepath.Join(baseDir, "etc-hosts")
	leaseFile := filepath.Join(baseDir, "dnsmasq.leases")
	if err := touchFiles(hostFile, leaseFile); err != nil {
		return err
	}

	// startCmd := strings.Join(append([]string{"ip", "netns", "exec", subnet.ServiceNetworkNamespace(), "/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	startCmd := strings.Join(append([]string{"/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	// create the systemd file to manage this dhcp
	opts := []*unit.UnitOption{
		unit.NewUnitOption("Unit", "Description", "DHCP Service for "+subnet.DhcpUnitName()),
		unit.NewUnitOption("Install", "WantedBy", "multi-user.target"),
		// unit.NewUnitOption("Service", "PrivateMounts", "yes"),
		unit.NewUnitOption("Service", "BindPaths", strings.Join([]string{
			hostFile + ":/etc/hosts",
			leaseFile + ":/var/lib/misc/dnsmasq.leases",
		}, " ")),
		unit.NewUnitOption("Service", "NetworkNamespacePath", subnet.ServiceNetworkNamespacePath()),
		unit.NewUnitOption("Service", "ExecStart", startCmd),
	}

	unitReader := unit.Serialize(opts)
	unitBytes, err := io.ReadAll(unitReader)
	if err != nil {
		return fmt.Errorf("unable to get system unit file for dhcp service %w", err)
	}
	unitFile := path.Join(baseDir, subnet.DhcpUnitName())
	if err := os.WriteFile(unitFile, unitBytes, 0644); err != nil {
		return fmt.Errorf("unable to create system unit file %w", err)
	}

	units, err := r.dbus.ListUnitsByNamesContext(ctx, []string{subnet.DhcpUnitName()})
	if err != nil {
		return err
	}
	running := false
	for _, unit := range units {
		if unit.ActiveState == "active" {
			running = true
		}
	}
	needsReload := false
	if running {
		needsReloadProp, err := r.dbus.GetUnitPropertyContext(ctx, subnet.DhcpUnitName(), "NeedDaemonReload")
		if err != nil {
			return err
		}

		if err := needsReloadProp.Value.Store(&needsReload); err != nil {
			return err
		}
	}

	if !running || needsReload {
		log.V(5).Info("No existing DHCP service, creating")
		if err := r.dbus.ReloadContext(ctx); err != nil {
			return err
		}

		log.V(5).Info("enabling systemd service", "service", string(unitBytes))
		started, _, err := r.dbus.EnableUnitFilesContext(ctx, []string{unitFile}, true, true)
		if err != nil {
			return fmt.Errorf("unable to enable system unit file %w", err)
		}

		if !started {
			return fmt.Errorf("invalid service unit file, not started")
		}
		pid, err := r.dbus.RestartUnitContext(ctx, subnet.DhcpUnitName(), "replace", nil)

		if err != nil || pid == 0 {
			return fmt.Errorf("unable to start dhcp service - %w", err)

		}

		log.V(5).Info("started dhcp service")
	}

	return nil
}

func (r *SubnetReconciler) flows(ctx context.Context, nw *networkv1alpha1.Network, subnet *networkv1alpha1.Subnet, vlanId int) ([]sdn.FlowRule, error) {

	return []sdn.FlowRule{
		&sdn.NodeSubnetEgress{
			Switch:        sdn.TunnelSwitchName,
			NodeLocalVlan: vlanId,
			TunnelId:      nw.Status.Vni,
		},
		&sdn.NodeSubnetIngress{
			Switch:        sdn.TunnelSwitchName,
			NodeLocalVlan: vlanId,
			TunnelId:      nw.Status.Vni,
		},
	}, nil
}

func (r *SubnetReconciler) installFlows(ctx context.Context, subnet *networkv1alpha1.Subnet) error {
	nw := &network.Network{}
	nw.Name = subnet.Spec.Network.Name
	if err := r.Client.Get(ctx, client.ObjectKeyFromObject(nw), nw); err != nil {
		return err
	}

	vlanId, err := r.Node.GetNode().SubnetVlanId(subnet.Name)
	if err != nil {
		return fmt.Errorf("unable to get VLAN id for %s - %w", subnet.Name, err)
	}

	flows, err := r.flows(ctx, nw, subnet, vlanId)
	if err != nil {
		return err
	}
	ovsClient := sdn.Ovs()

	for _, flow := range flows {

		if err := flow.Install(ovsClient); err != nil {
			return fmt.Errorf("error adding flow - %w", err)
		}
	}

	return nil
}

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
						Name: iface.Name,
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

func isPortNotExist(err error) bool {
	if ovs.IsPortNotExist(err) {
		return true
	}

	return strings.Contains(err.Error(), "does not have a port")
}
