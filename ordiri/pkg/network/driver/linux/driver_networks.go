package linux

import (
	"context"
	"fmt"
	"io/fs"
	"net"
	"os"
	"os/exec"
	"os/user"
	"path/filepath"
	"strconv"
	"strings"
	"text/template"

	"github.com/Masterminds/sprig"
	"github.com/coreos/go-systemd/unit"
	"github.com/gosimple/slug"
	"github.com/ordiri/ordiri/config"
	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
	"inet.af/netaddr"

	"github.com/ordiri/ordiri/pkg/network/sdn"
)

func (ln *linuxDriver) RemoveNetwork(ctx context.Context, nw api.Network) error {
	namespace := namespaceForRouter(nw)
	publicGwCableName := publicGwCable(nw)
	if err := deleteNetworkNs(namespace); err != nil {
		return fmt.Errorf("unable to delete network ns - %w", err)
	}

	if _, iface := ln.interfaces.search(publicGwCableName.Root()); iface != nil {
		if err := netlink.LinkDel(iface); err != nil {
			return err
		}
	}

	if err := sdn.Ovs().VSwitch.DeletePort(sdn.ExternalSwitchName, publicGwCableName.Root()); err != nil {
		return err
	}

	return nil
}

func (ln *linuxDriver) RegisterNetwork(ctx context.Context, nw api.Network) error {
	log := log.FromContext(ctx)
	log.V(5).Info("Ensuring network", "nw", nw)
	if err := ln.installNetworkNat(ctx, nw); err != nil {
		return fmt.Errorf("error installing nat rules - %w", err)
	}

	if err := ln.installNetworkZebra(ctx, nw); err != nil {
		return fmt.Errorf("error installing zebra - %w", err)
	}

	if err := ln.installNetworkBgp(ctx, nw); err != nil {
		return fmt.Errorf("error installing bgp - %w", err)
	}

	if len(nw.DnsRecords()) > 0 {
		hostDir := etcHostMappingDir(nw)
		if err := os.MkdirAll(hostDir, os.ModePerm); err != nil {
			return err
		}
		grouped := map[string][]string{}
		for ip, hostnames := range nw.DnsRecords() {
			for _, hostname := range hostnames {
				grouped[hostname] = append(grouped[hostname], ip.String())
			}
		}
		for hostname, ips := range grouped {
			lines := []string{}
			for _, ip := range ips {
				lines = append(lines, fmt.Sprintf("%s %s", ip, hostname))
			}

			mapping := strings.Join(lines, "\n")
			fileName := slug.Make(hostname)
			mappingFile := filepath.Join(hostDir, fileName)
			if err := os.WriteFile(mappingFile, []byte(mapping), fs.ModePerm); err != nil {
				return fmt.Errorf("unable to write mapping file - %w", err)
			}
		}
	}

	log.V(5).Info("Network ensured")
	return nil
}

func (ln *linuxDriver) installNetworkBgp(ctx context.Context, nw api.Network) error {
	if !nw.MgmtIp().IsValid() {
		return nil
	}
	namespace := namespaceForRouter(nw)

	// create the dnsmasq config to provide metadata for this subnet
	baseDir := subnetConfDir(nw, nil)
	if err := os.MkdirAll(baseDir, os.ModePerm); err != nil {
		return fmt.Errorf("unable to create directory %s - %w", baseDir, err)
	}

	cfgFile := filepath.Join(baseDir, "gobgpd.yaml")
	zebraSocketFile := filepath.Join(baseDir, "zebra/zebra.socket")
	pidFile := filepath.Join(baseDir, "gobgpd.socket")

	// , config.CustomerAsn, nw.Cidr().String(), nw.Cidr6().String(), nw.MgmtIp6().IP().String(), config.LocalAsn, nw.ExternalIp6().IP().String(), zebraSocketFile, nw.Cidr6().String())
	cfg := `global:
  config:
    as: {{ .CloudRouterAsn }}
    router-id: {{ .CloudRouterId }}
    local-address-list: ["{{ .CloudRouterAddress4 }}", "{{ .CloudRouterAddress6 }}"]
  apply-policy:
    config:
      export-policy-list:
      - globalexport
      import-policy-list:
      - globalimport
      default-import-policy: accept-route
      default-export-policy: accept-route

peer-groups:
- config:
    peer-group-name: subnet-nodes
    peer-as: {{ .TenantAsn }}
  afi-safis:
  - config:
      afi-safi-name: ipv4-unicast
  - config:
      afi-safi-name: ipv6-unicast
  transport:
    config: 
      local-address: {{ .CloudRouterAddress6 }}
  apply-policy:
    config:
      export-policy-list:
      - globalexport

dynamic-neighbors:
- config:
    prefix: {{ .TenantNetwork6 }}
    peer-group: subnet-nodes
- config:
    prefix: {{ .TenantNetwork }}
    peer-group: subnet-nodes
- config:
    prefix: 10.240.0.0/16
    peer-group: subnet-nodes
- config:
    prefix: 2403:5806:97ec:6300::/56
    peer-group: subnet-nodes

neighbors:
- config:
    peer-as: {{ .OrdletAsn }}
    neighbor-address: {{ .OrdletAddress }}
  transport:
    config: 
      local-address: {{ .CloudRouterAddress6 }}
  ebgp-multihop:
    config:
      enabled: true
      multihop-ttl: 10
  apply-policy:
    config:
      export-policy-list:
      - globalexport
      import-policy-list:
      - globalimport
  afi-safis:
  - config:
      afi-safi-name: ipv4-unicast
  - config:
      afi-safi-name: ipv6-unicast

zebra:
  config:
    enabled: true
    url: unix:{{ .ZebraSocketFile }}
    redistribute-route-type-list: [] # An empty list means don't write routes
#     redistribute-route-type-list: [connect]
    version: 6
    software-name: frr7.5

defined-sets:
  prefix-sets:
  - prefix-set-name: private-addrs
    prefix-list:
    - ip-prefix: fc00::/7
      masklength-range: "7..128"
    - ip-prefix: 2403:5806:97ec:1::/64
      masklength-range: "64..128"

policy-definitions:

- name: globalimport
  statements:
  - name: globalimport6-drop-ula
    conditions:
      match-prefix-set:
        prefix-set: private-addrs
        match-set-options: any
    actions:
      route-disposition: reject-route
  - name: globalimport6-main
    actions:
      route-disposition: accept-route

- name: globalexport
  statements:
  - name: globalexport6-drop-ula
    conditions:
      match-prefix-set:
        prefix-set: private-addrs
        match-set-options: any
    actions:
      route-disposition: reject-route
  - name: globalexport6-main
    actions:
      route-disposition: accept-route

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
			"CloudRouterAsn":      config.CloudRouterAsn,
			"CloudRouterId":       nw.ExternalIp().IP().String(),
			"CloudRouterAddress4": nw.ExternalIp().IP().String(),
			"CloudRouterAddress6": nw.ExternalIp6().IP().String(),

			"TenantAsn":      config.CustomerAsn,
			"TenantNetwork":  nw.Cidr().String(),
			"TenantNetwork6": nw.Cidr6().String(),

			"OrdletAsn":     config.LocalAsn,
			"OrdletAddress": nw.MgmtIp6().IP().String(),

			"LocalAsn":        config.LocalAsn,
			"CustomerAsn":     config.CustomerAsn,
			"ExternalIp":      nw.ExternalIp().IP().String(),
			"ExternalIp6":     nw.ExternalIp6().IP().String(),
			"MgmtIp6":         nw.MgmtIp6().IP().String(),
			"ZebraSocketFile": zebraSocketFile,
		}
		return tpl.Execute(tplFile, &vars)
	}()
	if err != nil {
		return fmt.Errorf("unable to render template - %w", err)
	}
	// startCmd := strings.Join(append([]string{"ip", "netns", "exec", namespace, "/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	cleanupCommand := strings.Join([]string{"/usr/bin/rm", "-f", pidFile}, " ")
	startCmd := strings.Join([]string{"/usr/local/bin/gobgpd", "-ldebug", "-t", "yaml", "-f", cfgFile, "--api-hosts", fmt.Sprintf("unix://%s", pidFile)}, " ")
	// create the systemd file to manage this metadata
	unitName := networkBgpRouterUnitName(nw)
	zebraUnitName := networkBgpZebraUnitName(nw)
	opts := []*unit.UnitOption{
		unit.NewUnitOption("Unit", "Description", "Ordiri BGP Service for "+unitName),
		unit.NewUnitOption("Unit", "After", "ordlet.service "+zebraUnitName),
		unit.NewUnitOption("Unit", "Wants", zebraUnitName),
		unit.NewUnitOption("Unit", "BindsTo", "ordlet.service"),
		// unit.NewUnitOption("Service", "PrivateMounts", "yes"),
		unit.NewUnitOption("Service", "NetworkNamespacePath", namespacePath(namespace)),
		unit.NewUnitOption("Service", "ExecStartPre", cleanupCommand),
		unit.NewUnitOption("Service", "ExecStart", startCmd),
		unit.NewUnitOption("Service", "Restart", "always"),
		unit.NewUnitOption("Install", "WantedBy", "multi-user.target"),
	}

	return ln.enableUnitFile(ctx, baseDir, unitName, opts)
}

func (ln *linuxDriver) installNetworkZebra(ctx context.Context, nw api.Network) error {
	if !nw.MgmtIp().IsValid() {
		return nil
	}
	namespace := namespaceForRouter(nw)

	// create the dnsmasq config to provide metadata for this subnet
	baseDir := filepath.Join(subnetConfDir(nw, nil), "zebra")
	if err := os.MkdirAll(baseDir, os.ModePerm); err != nil {
		return fmt.Errorf("unable to create directory %s - %w", baseDir, err)
	}
	frrUser, err := user.Lookup("frr")
	if err != nil {
		return fmt.Errorf("unable to find frr user - %w", err)
	}
	uid, err := strconv.Atoi(frrUser.Uid)
	if err != nil {
		return fmt.Errorf("error converting uid to an int - %q - %w", frrUser.Uid, err)
	}
	gid, err := strconv.Atoi(frrUser.Gid)
	if err != nil {
		return fmt.Errorf("error converting gid to an int - %q - %w", frrUser.Gid, err)
	}

	if err := os.Chown(baseDir, uid, gid); err != nil {
		return fmt.Errorf("unable to chown zebra dir to zebra user")
	}

	zebraSocketFile := filepath.Join(baseDir, "zebra.socket")
	zebraPidFile := filepath.Join(baseDir, "zebra.pid")

	// startCmd := strings.Join(append([]string{"ip", "netns", "exec", namespace, "/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	startCmd := strings.Join([]string{"/usr/lib/frr/zebra", "--config_file", "/dev/null", "--socket", zebraSocketFile, "--pid_file", zebraPidFile, "--log-level", "debug"}, " ")
	// create the systemd file to manage this metadata
	unitName := networkBgpZebraUnitName(nw)
	opts := []*unit.UnitOption{
		unit.NewUnitOption("Unit", "Description", "Ordiri Zebra Service for "+unitName),
		unit.NewUnitOption("Unit", "After", "ordlet.service"),
		unit.NewUnitOption("Unit", "BindsTo", "ordlet.service"),
		unit.NewUnitOption("Service", "User", "frr"),
		unit.NewUnitOption("Service", "AmbientCapabilities", "CAP_NET_ADMIN CAP_NET_RAW CAP_SYS_ADMIN"),
		unit.NewUnitOption("Service", "CapabilityBoundingSet", "CAP_NET_ADMIN CAP_NET_RAW CAP_SYS_ADMIN"), // CAP_SYS_CHROOT CAP_NET_BIND_SERVICE CAP_SETUID CAP_SETGID CAP_SYS_NICE CAP_SYS_PTRACE CAP_SYS_ADMIN CAP_FOWNER CAP_IPC_LOCK CAP_SYS_RAWIO"),
		// unit.NewUnitOption("Service", "PrivateMounts", "yes"),
		unit.NewUnitOption("Service", "NetworkNamespacePath", namespacePath(namespace)),
		unit.NewUnitOption("Service", "ExecStart", startCmd),
		unit.NewUnitOption("Service", "Restart", "always"),
		unit.NewUnitOption("Install", "WantedBy", "multi-user.target"),
	}

	return ln.enableUnitFile(ctx, baseDir, unitName, opts)
}

func (ln *linuxDriver) installNetworkNat(ctx context.Context, nw api.Network) error {
	log := log.FromContext(ctx)
	namespace := namespaceForRouter(nw)
	publicGwCableName := publicGwCable(nw)
	cidr := nw.Cidr()
	log.V(5).Info("Installing NAT", "nw", nw, "cidr", cidr, "namespace", namespace)
	if err := createNetworkNs(namespace); err != nil {
		return fmt.Errorf("error creating network namespace for NAT")
	}

	if err := ln.getOrCreateVeth(ctx, namespace, "public:"+nw.Name(), publicGwCableName, false, mac.Unicast()); err != nil {
		return err
	}

	log.V(5).Info("Add OVS port")
	if err := sdn.Ovs().VSwitch.AddPort(sdn.ExternalSwitchName, publicGwCableName.Root()); err != nil {
		return err
	}

	ipt, err := sdn.Iptables(namespace)
	if err != nil {
		return err
	}

	log.V(5).Info("Apply IPTables Rules")
	ruleSets := rulesets(cidr.String(), publicGwCableName.Namespace())
	for _, ruleSet := range ruleSets {
		for _, rule := range ruleSet.Rules {
			err := ipt.AppendUnique(ruleSet.Table, ruleSet.Chain, rule...)
			if err != nil {
				return err
			}
		}
	}

	// todo lol
	if nw.ExternalIp().IsValid() {
		if err := setNsVethIp(namespace, nw.ExternalIp(), publicGwCableName.Namespace()); err != nil {
			return fmt.Errorf("unable to set public gateway external address - %w", err)
		}
		handle, err := netns.GetFromName(namespace)
		if err != nil {
			return fmt.Errorf("unable to get namespace - %w", err)
		}
		nl, err := netlink.NewHandleAt(handle)
		if err != nil {
			return fmt.Errorf("unable to get netlink handle - %w", err)
		}
		link, err := nl.LinkByName(publicGwCableName.Namespace())
		if err != nil {
			return fmt.Errorf("error fetching public gw link - %w", err)
		}
		if err := nl.RouteReplace(&netlink.Route{
			Dst:       netaddr.MustParseIPPrefix("10.0.1.0/24").IPNet(),
			LinkIndex: link.Attrs().Index,
			Scope:     netlink.SCOPE_LINK,
		}); err != nil {
			return fmt.Errorf("error creating route - %w", err)
		}
		if err := nl.RouteReplace(&netlink.Route{
			Gw:        net.IPv4(10, 0, 1, 1),
			Dst:       nil,
			LinkIndex: link.Attrs().Index,
		}); err != nil {
			return fmt.Errorf("error creating route - %w", err)
		}
	}
	// todo lol
	if nw.ExternalIp6().IsValid() {
		// we are a router but we are also dynamically configured so we want to enable_ra mode 2
		// but we only do this on the single public egress interface or the cloudrouters will end up
		// sending each other router adverts (which they will accept if we use all/default sysctl groups) and nothing will work
		cmd := exec.Command("ip", "netns", "exec", namespace, "sysctl", "-w", fmt.Sprintf("net.ipv6.conf.%s.accept_ra=2", publicGwCableName.Namespace()))
		out, err := cmd.CombinedOutput()
		if err != nil {
			return fmt.Errorf("%s: unable to set sysctl all accept_ra prop - %q - %w", cmd.String(), string(out), err)
		}

		if err := setNsVethIp(namespace, nw.ExternalIp6(), publicGwCableName.Namespace()); err != nil {
			return fmt.Errorf("unable to set public gateway external address - %w", err)
		}
	}

	log.V(5).Info("Network NAT configured")

	return nil
}

func rulesets(cidr string, publicInterface string) []iptRule {
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
				{"-o", publicInterface, "-j", "MASQUERADE"},
			},
		},
	}
}

func (ln *linuxDriver) networkFlows(ctx context.Context, nw api.Network) ([]sdn.FlowRule, error) {
	return []sdn.FlowRule{}, nil
}

func (ln *linuxDriver) removeNetworkFlows(ctx context.Context, nw api.Network) error {
	flows, err := ln.networkFlows(ctx, nw)
	if err != nil {
		return err
	}
	ovsClient := sdn.Ovs()

	for _, flow := range flows {
		if err := flow.Remove(ovsClient); err != nil {
			return fmt.Errorf("error adding flow - %w", err)
		}
	}

	return nil

}

func (ln *linuxDriver) installNetworkFlows(ctx context.Context, nw api.Network) error {
	flows, err := ln.networkFlows(ctx, nw)
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
