package ordlet

import (
	"context"
	"encoding/base64"
	"errors"
	"fmt"
	"net"
	"reflect"

	"github.com/digitalocean/go-libvirt"
	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/go-logr/logr"
	"github.com/google/uuid"
	vault "github.com/hashicorp/vault/api"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	ilibvirt "github.com/ordiri/ordiri/pkg/compute/driver/libvirt"
	"github.com/ordiri/ordiri/pkg/generated/clientset/versioned"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"libvirt.org/go/libvirtxml"
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
	config := vault.DefaultConfig()
	config.ConfigureTLS(&vault.TLSConfig{
		CACert:     "/etc/ssl/certs/ca-certificates.crt",
		ClientCert: "/etc/ssl/certs/node.crt",
		ClientKey:  "/etc/ssl/private/node.key",
	})

	vc, err := vault.NewClient(config)
	if err != nil {
		panic(fmt.Sprintf("unable to initialize Vault client: %v", err))
	}

	if _, err = vaultLogin(vc); err != nil {
		panic(fmt.Sprintf("unable to login to vault: %v", err.Error()))
	}
	go renewToken(vc)

	return &createLocalNodeRunnable{
		mgmtNet: mgmtNet,
		roles:   node.Spec.NodeRoles,
		vc:      vc,
		Node:    node,
	}
}

type createLocalNodeRunnable struct {
	client versioned.Interface
	log    logr.Logger
	vc     *vault.Client

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
				newAddrs = append(newAddrs, ipnet.String())
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

	for _, role := range clnr.Node.Spec.NodeRoles {
		if role == "compute" {
			if err := clnr.createCephSecret(); err != nil {
				return fmt.Errorf("error creating ceph secret - %w", err)
			}
		}
	}
	log.Info("updating existing node")

	if _, err := clnr.client.CoreV1alpha1().Nodes().UpdateStatus(ctx, clnr.Node, v1.UpdateOptions{}); err != nil {
		return err
	}

	log.Info("node runnable complette")

	return nil
}

func (clnr *createLocalNodeRunnable) createCephSecret() error {
	cephVirtClient, err := clnr.vc.KVv2("secret").Get(context.Background(), "libvirt/ceph-client")
	if err != nil {
		return fmt.Errorf("unable to fet cepd client secret - %w", err)
	}
	lvc := ilibvirt.Local()
	keyring, ok := cephVirtClient.Data["keyring"].(string)
	if !ok {
		return errors.New("error fetching keyring")
	}
	secrets, _, err := lvc.ConnectListAllSecrets(1, 0)
	if err != nil {
		return fmt.Errorf("error listing libvirt secrets - %w", err)
	}

	existing := &libvirtxml.Secret{}

	for _, secret := range secrets {
		if secret.UsageType == int32(libvirt.SecretUsageTypeCeph) {
			xml, err := lvc.SecretGetXMLDesc(secret, 0)
			if err != nil {
				return fmt.Errorf("error loading secret xml - %w", err)
			}
			potential := &libvirtxml.Secret{}
			if err := potential.Unmarshal(xml); err != nil {
				return fmt.Errorf("error unmarshaling secret xml - %w", err)
			}
			if potential.Description == "ordiri" {
				existing = potential
			}
		}
	}

	existing.Description = "ordiri"
	existing.Usage = &libvirtxml.SecretUsage{
		Type: "ceph",
		Name: "client.libvirt secret",
	}

	xml, err := existing.Marshal()
	if err != nil {
		return fmt.Errorf("error marshaling new secret - %w", err)
	}

	secret, err := lvc.SecretDefineXML(xml, 0)
	if err != nil {
		return fmt.Errorf("error creating new secret - %w", err)
	}
	byts, err := base64.StdEncoding.DecodeString(keyring)
	if err != nil {
		return fmt.Errorf("error decoding keyring secret - %w", err)
	}
	if err := lvc.SecretSetValue(secret, byts, 0); err != nil {
		return fmt.Errorf("error setting secret value - %w", err)
	}

	uuid, err := uuid.Parse(fmt.Sprintf("%x", secret.UUID))
	if err != nil {
		return fmt.Errorf("error parsing secret uuid - %w", err)
	}

	clnr.Node.Status.CephSecretUuid = uuid.String()

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
