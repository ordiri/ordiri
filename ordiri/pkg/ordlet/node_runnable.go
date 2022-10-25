package ordlet

import (
	"context"
	"fmt"
	"net"
	"reflect"

	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/go-logr/logr"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	"github.com/ordiri/ordiri/pkg/generated/clientset/versioned"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/controller-runtime/pkg/manager"
	"sigs.k8s.io/controller-runtime/pkg/runtime/inject"
)

type NodeProvider interface {
	GetNode() *corev1alpha1.Node
	Refresh(ctx context.Context) error
}

type RunnableNodeProvider interface {
	NodeProvider
	manager.Runnable
}

func NewNodeRunnable(mgmtNet *net.IPNet, nodeName string, roles []string) *createLocalNodeRunnable {
	node := &corev1alpha1.Node{}
	node.Name = nodeName
	nodeRoles := []corev1alpha1.NodeRole{}
	for _, role := range roles {
		nodeRoles = append(nodeRoles, corev1alpha1.NodeRole(role))
	}

	node.Spec.NodeRoles = nodeRoles

	return NewNodeRunnableWithNode(mgmtNet, node)
}

func NewNodeRunnableWithNode(mgmtNet *net.IPNet, node *corev1alpha1.Node) *createLocalNodeRunnable {
	return &createLocalNodeRunnable{
		mgmtNet: mgmtNet,
		roles:   node.Spec.NodeRoles,
		Node:    node,
	}
}

type createLocalNodeRunnable struct {
	client versioned.Interface
	log    logr.Logger

	Node    *corev1alpha1.Node
	mgmtNet *net.IPNet
	roles   []corev1alpha1.NodeRole
}

func (clnr *createLocalNodeRunnable) GetNode() *corev1alpha1.Node {
	if err := clnr.Refresh(context.Background()); err != nil {
		panic("error refreshing local node: " + err.Error())
	}

	return clnr.Node
}

func (clnr *createLocalNodeRunnable) Refresh(ctx context.Context) error {
	node, err := clnr.client.CoreV1alpha1().Nodes().Get(ctx, clnr.Node.Name, v1.GetOptions{})
	if err != nil {
		if clnr.Node.UID == "" {
			return nil
		}
		return err
	}
	clnr.Node = node

	return nil
}

func (clnr *createLocalNodeRunnable) Start(ctx context.Context) error {
	if clnr.client == nil {
		return fmt.Errorf("missing client on local node creator")
	}

	log := clnr.log.WithValues("hostname", clnr.Node.Name)
	log.Info("Starting local node runner")

	ovsClient := sdn.Ovs()
	if err := ovsClient.VSwitch.AddBridge(sdn.ExternalSwitchName); err != nil {
		return err
	}
	if err := ovsClient.VSwitch.Set.Interface(sdn.ExternalSwitchName, ovs.InterfaceOptions{
		MTURequest: sdn.UnderlayMTU,
	}); err != nil {
		return err
	}
	if err := ovsClient.VSwitch.AddBridge(sdn.TunnelSwitchName); err != nil {
		return err
	}
	if err := ovsClient.VSwitch.Set.Interface(sdn.TunnelSwitchName, ovs.InterfaceOptions{
		MTURequest: sdn.UnderlayMTU,
	}); err != nil {
		return err
	}
	if err := ovsClient.VSwitch.AddBridge(sdn.WorkloadSwitchName); err != nil {
		return err
	}
	if err := ovsClient.VSwitch.Set.Interface(sdn.WorkloadSwitchName, ovs.InterfaceOptions{
		MTURequest: sdn.UnderlayMTU,
	}); err != nil {
		return err
	}

	if err := ovsClient.VSwitch.AddPort(sdn.WorkloadSwitchName, "patch-internal"); err != nil {
		return fmt.Errorf("unable to create patch-internal patch port - %w", err)
	}
	if err := ovsClient.VSwitch.AddPort(sdn.TunnelSwitchName, "patch-vms"); err != nil {
		return fmt.Errorf("unable to create patch-vms patch port - %w", err)
	}

	if err := ovsClient.VSwitch.Set.Interface("patch-vms", ovs.InterfaceOptions{
		Type: ovs.InterfaceTypePatch,
		Peer: "patch-internal",
	}); err != nil {
		return fmt.Errorf("unable to wire patch-vm peer - %w", err)
	}
	if err := ovsClient.VSwitch.Set.Interface("patch-internal", ovs.InterfaceOptions{
		Type: ovs.InterfaceTypePatch,
		Peer: "patch-vms",
	}); err != nil {
		return fmt.Errorf("unable to wire patch-internal peer - %w", err)
	}

	if err := clnr.Refresh(ctx); err != nil {
		return err
	}

	flowRules := &sdn.Node{}
	if err := flowRules.Install(ovsClient); err != nil {
		return err
	}

	var updateAddrs = func(node *corev1alpha1.Node) (bool, error) {
		ifs, err := net.InterfaceAddrs()
		if err != nil {
			return false, err
		}

		newAddrs := []string{}
		for _, iface := range ifs {
			// check the address type and if it is not a loopback the display it
			if ipnet, ok := iface.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && !ipnet.IP.IsUnspecified() && clnr.mgmtNet.Contains(ipnet.IP) {
				newAddrs = append(newAddrs, ipnet.IP.String())
			}
		}
		changed := reflect.DeepEqual(node.Spec.ManagementAddresses, newAddrs)
		node.Spec.ManagementAddresses = newAddrs

		return changed, nil
	}

	if _, err := updateAddrs(clnr.Node); err != nil {
		return err
	}

	clnr.Node.Spec.NodeRoles = []corev1alpha1.NodeRole{}
	for _, role := range clnr.roles {
		clnr.Node.Spec.NodeRoles = append(clnr.Node.Spec.NodeRoles, corev1alpha1.NodeRole(role))
	}

	for _, role := range clnr.Node.Spec.NodeRoles {
		if role == "compute" {
			clnr.load
		}
	}

	if clnr.Node.UID == "" {
		log.Info("creating node")
		node, err := clnr.client.CoreV1alpha1().Nodes().Create(ctx, clnr.Node, v1.CreateOptions{})
		if err != nil {
			return err
		}
		clnr.Node = node
	} else {
		log.Info("updating existing node")
		node, err := clnr.client.CoreV1alpha1().Nodes().Update(ctx, clnr.Node, v1.UpdateOptions{})
		if err != nil {
			return err
		}
		clnr.Node = node
	}

	log.Info("node runnable complette")

	return nil
}

func (clnr *createLocalNodeRunnable) loadVaultSecrets() error {
	return nil
}
func (clnr *createLocalNodeRunnable) NeedLeaderElection() bool {
	return false
}
func (clnr *createLocalNodeRunnable) InjectClient(k8Client versioned.Interface) error {
	clnr.client = k8Client
	return nil
}
func (clnr *createLocalNodeRunnable) InjectLogger(log logr.Logger) error {
	clnr.log = log
	return nil
}

var _ manager.Runnable = &createLocalNodeRunnable{}
var _ manager.LeaderElectionRunnable = &createLocalNodeRunnable{}
var _ inject.Logger = &createLocalNodeRunnable{}
var _ NodeProvider = &createLocalNodeRunnable{}
