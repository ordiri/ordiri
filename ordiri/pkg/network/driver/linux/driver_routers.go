package linux

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"text/template"

	"github.com/Masterminds/sprig"
	"github.com/coreos/go-systemd/unit"
	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
	"inet.af/netaddr"
)

func (ld *linuxDriver) EnsureRouter(ctx context.Context, nw api.Network, sn api.Subnet) error {
	log := log.FromContext(ctx)
	log.Info("ensuring router")
	if err := ld.installRouter(ctx, nw, sn); err != nil {
		return err
	}
	log.Info("ensuring router")
	if err := ld.installNetworkRouterAdvertisement(ctx, nw, sn); err != nil {
		return err
	}
	log.Info("ensuring subnet flows")
	if err := ld.installSubnetFlows(ctx, nw, sn); err != nil {
		return err
	}
	return nil
}

func (ld *linuxDriver) RemoveRouter(ctx context.Context, nw api.Network, sn api.Subnet) error {
	log := log.FromContext(ctx)
	routerNetworkNamespace := namespaceForRouter(nw)

	internalRouterCableName := internalRouterCable(nw, sn)

	if _, iface := ld.interfaces.search(internalRouterCableName.Root()); iface != nil {
		if err := netlink.LinkDel(iface); err != nil {
			return err
		}
	}

	log.Info("Deleting port for router ", "cableName", internalRouterCableName)
	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.DeletePort(sdn.WorkloadSwitchName, internalRouterCableName.Root()); err != nil && !isPortNotExist(err) {
		return fmt.Errorf("unable to remove ovs port - %w", err)
	}

	ruleSets := ld.rulesets(publicGwCable(nw).Namespace(), internalRouterCableName.Namespace())
	if handle, err := netns.GetFromName(routerNetworkNamespace); err == nil {
		log.Info("removing ip table rules ", "ns", routerNetworkNamespace, "rule_count", len(ruleSets))
		defer handle.Close()
		ipt, err := sdn.Iptables(routerNetworkNamespace)
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
		log.Info("router network namespace does not exist, skipping ", "ns", routerNetworkNamespace, "rule_count", len(ruleSets))
	}
	log.Info("router has been removed from node")
	return nil
}

func (ld *linuxDriver) installRouter(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	routerNetworkNamespace := namespaceForRouter(nw)
	err := createNetworkNs(routerNetworkNamespace)
	if err != nil {
		return fmt.Errorf("unable to create router network namespace - %w", err)
	}

	internalRouterCableName := internalRouterCable(nw, subnet)
	if err := ld.getOrCreateVeth(ctx, routerNetworkNamespace, "router:"+nw.Name()+":"+subnet.Name(), internalRouterCableName, true, subnet.RouterGlobalMac()); err != nil {
		return fmt.Errorf("unable to create internal veth cable - %w", err)
	}

	// Get the first ip
	rtrIp := netaddr.IPPrefixFrom(subnet.Cidr().IP().Next(), subnet.Cidr().Bits())
	if err := setNsVethIp(routerNetworkNamespace, rtrIp, internalRouterCableName.Namespace()); err != nil {
		return fmt.Errorf("unable to set router address - %w", err)
	}
	// Get the first ip
	rtr6Ip := netaddr.IPPrefixFrom(subnet.Cidr6().IP().Next(), subnet.Cidr6().Bits())
	if err := setNsVethIp(routerNetworkNamespace, rtr6Ip, internalRouterCableName.Namespace()); err != nil {
		return fmt.Errorf("unable to set router address - %w", err)
	}
	ovsClient := sdn.Ovs()

	// need to create flow rules taking this to the vxlan?
	if err := ovsClient.VSwitch.AddPort(sdn.WorkloadSwitchName, internalRouterCableName.Root()); err != nil {
		return err
	}

	if err := ovsClient.VSwitch.Set.Port(internalRouterCableName.Root(), ovs.PortOptions{
		Tag: subnet.Segment(),
	}); err != nil {
		return err
	}

	curNs, err := netns.Get()
	if err != nil {
		return fmt.Errorf("unable to get current network ns - %w", err)
	}
	curNs.Close()
	handle, err := netns.GetFromName(routerNetworkNamespace)
	if err != nil {
		return fmt.Errorf("unable to get namespace for public gateway ns - %w", err)
	}

	defer handle.Close()
	ctx, cancel := context.WithCancel(context.Background())
	// only in a goroutine to keep it away from other namespaces
	go func(targetNs netns.NsHandle, curNs netns.NsHandle) {
		defer cancel()
		handle, err := netlink.NewHandleAt(handle)
		if err != nil {
			panic(err.Error())
		}
		iface, err := handle.LinkByName(internalRouterCableName.Namespace())
		if err != nil {
			panic(err.Error())
		}
		for ip, mac := range subnet.KnownMacs() {

			err := handle.NeighSet(&netlink.Neigh{
				LinkIndex:    iface.Attrs().Index,
				State:        netlink.NUD_PERMANENT,
				IP:           ip.IPAddr().IP,
				HardwareAddr: mac,
			})
			if err != nil {
				panic(err)
			}
		}
	}(handle, curNs)
	<-ctx.Done()

	routerFlow := &sdn.Router{
		DistributedMac: subnet.RouterGlobalMac(),
		HostLocalMac:   subnet.RouterMac(),
		IP:             subnet.Cidr().IP().Next(),
		Segment:        subnet.Segment(),
	}

	if err := routerFlow.Install(ovsClient); err != nil {
		return fmt.Errorf("unable to install flows for router - %w", err)
	}
	// staticEntryFlow := &sdn.StaticPortEntry{
	// 	Switch:  sdn.WorkloadSwitchName,
	// 	Port:    internalRouterCableName.Root(),
	// 	Segment: subnet.Segment(),
	// 	MacAddr: rtr.Mac(),
	// }
	// if err := staticEntryFlow.Install(ovsClient); err != nil {
	// 	return fmt.Errorf("unable to install static mac entry flow for router")
	// }

	ipt, err := sdn.Iptables(routerNetworkNamespace)
	if err != nil {
		return err
	}

	publicGwCableName := publicGwCable(nw)

	ruleSets := ld.rulesets(publicGwCableName.Namespace(), internalRouterCableName.Namespace())

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

func (ln *linuxDriver) installNetworkRouterAdvertisement(ctx context.Context, nw api.Network, sn api.Subnet) error {
	if !nw.MgmtIp().IsValid() {
		return nil
	}

	namespace := namespaceForRouter(nw)
	internalRouterCableName := internalRouterCable(nw, sn)

	// create the dnsmasq config to provide metadata for this subnet
	baseDir := subnetConfDir(nw, sn)
	if err := os.MkdirAll(baseDir, os.ModePerm); err != nil {
		return fmt.Errorf("unable to create directory %s - %w", baseDir, err)
	}

	cfgFile := filepath.Join(baseDir, "corerad.toml")
	cfg := `
[[interfaces]]
name = "{{ .RouterInterface }}"
advertise = true
unicast_only = true
verbose = true
managed = false
other_config = false

preference = "high"

[[interfaces.route]]
prefix = "::/0"
  [[interfaces.prefix]]
    prefix = "{{ .NetworkPrefix }}"
    autonomous = true
  [[interfaces.rdnss]]
    lifetime = "auto"
    servers = ["{{ .DNSAddress }}"]
  [[interfaces.dnssl]]
    lifetime = "auto"
    domain_names = ["ordiri"]
[debug]
`

	tpl := template.Must(
		template.New("base").Funcs(sprig.TxtFuncMap()).Parse(cfg),
	)

	err := func() error {
		tplFile, err := os.OpenFile(cfgFile, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0644)
		if err != nil {
			return fmt.Errorf("unable to open file for bgp config - %w", err)
		}
		defer tplFile.Close()

		vars := map[string]interface{}{
			"RouterInterface": internalRouterCableName.Namespace(),
			"NetworkPrefix":   sn.Cidr6().String(),
			"DNSAddress":      sn.Cidr6().IP().Next().Next().String(),
		}
		return tpl.Execute(tplFile, &vars)
	}()
	if err != nil {
		return fmt.Errorf("unable to render template - %w", err)
	}

	// startCmd := strings.Join(append([]string{"ip", "netns", "exec", namespace, "/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	startCmd := strings.Join([]string{"/usr/local/bin/corerad", "-c", cfgFile}, " ")
	// create the systemd file to manage this metadata
	unitName := networkRouterAdvertisementUnitName(nw, sn)
	opts := []*unit.UnitOption{
		unit.NewUnitOption("Unit", "Description", "Ordiri RouterAdvertisement Service for "+unitName),
		unit.NewUnitOption("Unit", "After", "ordlet.service"),
		unit.NewUnitOption("Unit", "BindsTo", "ordlet.service"),
		// unit.NewUnitOption("Service", "PrivateMounts", "yes"),
		unit.NewUnitOption("Service", "NetworkNamespacePath", namespacePath(namespace)),
		unit.NewUnitOption("Service", "AmbientCapabilities", "CAP_NET_ADMIN CAP_NET_RAW"),
		unit.NewUnitOption("Service", "CapabilityBoundingSet", "CAP_NET_ADMIN CAP_NET_RAW"),
		// unit.NewUnitOption("Service", "DynamicUser", "true"),
		unit.NewUnitOption("Service", "ExecStart", startCmd),
		unit.NewUnitOption("Service", "LimitNOFILE", "1048576"),
		unit.NewUnitOption("Service", "LimitNPROC", "512"),
		// unit.NewUnitOption("Service", "NoNewPrivileges", "true"),
		unit.NewUnitOption("Service", "NotifyAccess", "main"),
		unit.NewUnitOption("Service", "Restart", "on-failure"),
		unit.NewUnitOption("Service", "RestartKillSignal", "SIGHUP"),
		unit.NewUnitOption("Service", "Type", "notify"),
		unit.NewUnitOption("Install", "WantedBy", "multi-user.target"),
	}

	return ln.enableUnitFile(ctx, baseDir, unitName, opts)
}

func (nw *linuxDriver) rulesets(externalCablename string, internalCableName string) []iptRule {
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
