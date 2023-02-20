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
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/u-root/u-root/pkg/pci"
	"github.com/vishvananda/netlink"
	"inet.af/netaddr"
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

func NewNodeRunnable(mgmtNet *net.IPNet, mgmt6Net *net.IPNet, allocator api.AddressAllocatorClient, nodeName string, roles []string) *createLocalNodeRunnable {
	node := &corev1alpha1.Node{}
	node.Name = nodeName
	nodeRoles := []corev1alpha1.NodeRole{}
	for _, role := range roles {
		nodeRoles = append(nodeRoles, corev1alpha1.NodeRole(role))
	}

	node.Spec.NodeRoles = nodeRoles

	return NewNodeRunnableWithNode(mgmtNet, mgmt6Net, allocator, node)
}

func NewNodeRunnableWithNode(mgmtNet *net.IPNet, mgmt6Net *net.IPNet, allocator api.AddressAllocatorClient, node *corev1alpha1.Node) *createLocalNodeRunnable {
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

	return &createLocalNodeRunnable{
		mgmtNet:   mgmtNet,
		mgmt6Net:  mgmt6Net,
		roles:     node.Spec.NodeRoles,
		vc:        vc,
		allocator: allocator,
		Node:      node,
	}
}

type createLocalNodeRunnable struct {
	client    versioned.Interface
	log       logr.Logger
	allocator api.AddressAllocatorClient
	vc        *vault.Client

	Node     *corev1alpha1.Node
	mgmtNet  *net.IPNet
	mgmt6Net *net.IPNet
	roles    []corev1alpha1.NodeRole
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

	reader, err := pci.NewBusReader()
	if err != nil {
		return fmt.Errorf("unable to create PCI device bus reader")
	}

	devices, err := reader.Read(func(p *pci.PCI) bool {
		// strip out matrox VGA adaptors
		if p.Vendor == 4139 {
			return false
		}

		return p.ClassName == "DisplayVGA"
		// return strings.Contains(strings.ToLower(p.VendorName), "nvidia")
	})
	if err != nil {
		return fmt.Errorf("unable to read PCI devices")
	}
	// spew.Dump(devices)

	for _, role := range clnr.roles {
		if role == "storage" {
			if _, err := vaultLogin(clnr.vc); err != nil {
				panic(fmt.Sprintf("unable to login to vault: %v", err.Error()))
			} else {
				go renewToken(clnr.vc)
			}
		}
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
		iface, err := net.InterfaceByName("ordiri-external")
		if err != nil {
			return false, err
		}
		addrs, err := iface.Addrs()
		if err != nil {
			return false, err
		}

		newAddrs := []string{}
		hasIp6 := false
		for _, iface := range addrs {
			fmt.Printf("checking iface %+v addr\n", iface)
			// check the address type and if it is not a loopback the display it
			if ipnet, ok := iface.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && !ipnet.IP.IsUnspecified() && (clnr.mgmtNet.Contains(ipnet.IP) || clnr.mgmt6Net.Contains(ipnet.IP)) {
				newAddrs = append(newAddrs, ipnet.String())
				hasIp6 = hasIp6 || ipnet.IP.To4() == nil
			}
		}

		if !hasIp6 {
			allocated, err := clnr.allocator.Allocate(context.Background(), &api.AllocateRequest{
				BlockName: "_shared::mgmt6",
			})
			if err != nil {
				return false, fmt.Errorf("unable to allocate mgmt ipv6 addr - %w", err)
			}

			fmt.Printf("Allocated %+v for interface \n", allocated)

			link, _ := netlink.LinkByName("ordiri-external")
			if err := netlink.AddrAdd(link, &netlink.Addr{
				IPNet: netaddr.MustParseIPPrefix(allocated.Address).IPNet(),
				// Label: "ordirimgmt",
			}); err != nil {
				return false, fmt.Errorf("unable to set mgmt ipv6 addr - %w", err)
			}
			newAddrs = append(newAddrs, allocated.Address)
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

	for _, device := range devices {
		log.Info("registering device", "device", *device)
		found := false
		for _, existing := range clnr.Node.Status.Devices {
			if existing.Address == device.FullPath {
				found = true
			}
		}

		if !found {
			clnr.Node.Status.Devices = append(clnr.Node.Status.Devices, corev1alpha1.NodeDevice{
				Address:         device.FullPath,
				DeviceName:      device.DeviceName,
				VendorName:      device.VendorName,
				DeviceClassName: device.ClassName,
			})
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
