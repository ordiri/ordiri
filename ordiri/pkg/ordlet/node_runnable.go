package ordlet

import (
	"context"
	"fmt"
	"net"

	"github.com/go-logr/logr"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"sigs.k8s.io/controller-runtime/pkg/client"
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

func NewNodeRunnable(mgmtNet *net.IPNet, nodeName string, roles []string) RunnableNodeProvider {
	node := &corev1alpha1.Node{}
	node.Name = nodeName
	nodeRoles := []corev1alpha1.NodeRole{}
	for _, role := range roles {
		nodeRoles = append(nodeRoles, corev1alpha1.NodeRole(role))
	}

	node.Spec.NodeRoles = nodeRoles

	return NewNodeRunnableWithNode(mgmtNet, node)
}

func NewNodeRunnableWithNode(mgmtNet *net.IPNet, node *corev1alpha1.Node) RunnableNodeProvider {
	return &createLocalNodeRunnable{
		mgmtNet: mgmtNet,
		roles:   node.Spec.NodeRoles,
		Node:    node,
	}
}

type createLocalNodeRunnable struct {
	client client.Client
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
	return clnr.client.Get(ctx, client.ObjectKeyFromObject(clnr.Node), clnr.Node)
}

func (clnr *createLocalNodeRunnable) Start(ctx context.Context) error {
	if clnr.client == nil {
		return fmt.Errorf("missing client on local node creator")
	}

	log := clnr.log.WithValues("hostname", clnr.Node.Name)
	log.Info("Starting local node runner")

	err := clnr.Refresh(ctx)
	if err != nil {
		return err
	}
	node := clnr.Node
	log.Info("found node")

	ifs, err := net.InterfaceAddrs()
	if err != nil {
		return err
	}

	node.Spec.ManagementAddresses = []string{}
	for _, iface := range ifs {
		// check the address type and if it is not a loopback the display it
		if ipnet, ok := iface.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && !ipnet.IP.IsUnspecified() && clnr.mgmtNet.Contains(ipnet.IP) {
			node.Spec.ManagementAddresses = append(node.Spec.ManagementAddresses, ipnet.IP.String())
		}
	}

	node.Spec.NodeRoles = []corev1alpha1.NodeRole{}
	for _, role := range clnr.roles {
		node.Spec.NodeRoles = append(node.Spec.NodeRoles, corev1alpha1.NodeRole(role))
	}

	ovs := sdn.Ovs()
	if err := ovs.VSwitch.AddBridge(sdn.ExternalSwitchName); err != nil {
		return err
	}
	if err := ovs.VSwitch.AddBridge(sdn.TunnelSwitchName); err != nil {
		return err
	}
	if err := ovs.VSwitch.AddBridge(sdn.WorkloadSwitchName); err != nil {
		return err
	}

	if node.UID == "" {
		log.Info("creating node")
		err := clnr.client.Create(ctx, node)
		if err != nil {
			return err
		}
	} else {
		log.Info("updating existing node")
		if err := clnr.client.Update(ctx, node); err != nil {
			return err
		}
	}

	return nil
}

func (clnr *createLocalNodeRunnable) NeedLeaderElection() bool {
	return false
}
func (clnr *createLocalNodeRunnable) InjectClient(k8Client client.Client) error {
	clnr.client = k8Client
	return nil
}
func (clnr *createLocalNodeRunnable) InjectLogger(log logr.Logger) error {
	clnr.log = log
	return nil
}

var _ manager.Runnable = &createLocalNodeRunnable{}
var _ manager.LeaderElectionRunnable = &createLocalNodeRunnable{}
var _ inject.Client = &createLocalNodeRunnable{}
var _ inject.Logger = &createLocalNodeRunnable{}
var _ NodeProvider = &createLocalNodeRunnable{}
