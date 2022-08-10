package linux

import (
	"context"
	"fmt"
	"io"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/coreos/go-systemd/unit"
	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/dhcp"
	"github.com/ordiri/ordiri/pkg/network/sdn"
)

func (ln *linuxDriver) RemoveSubnet(ctx context.Context, nw api.Network, sn api.Subnet) error {
	return fmt.Errorf("method 'RemoveSubnet' not implemented")
}

func (ln *linuxDriver) EnsureSubnet(ctx context.Context, nw api.Network, sn api.Subnet) error {
	if err := ln.installDhcp(ctx, nw, sn); err != nil {
		return err
	}

	if err := ln.installFlows(ctx, nw, sn); err != nil {
		return err
	}

	return nil
}

func (ln *linuxDriver) installDhcp(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	log := log.FromContext(ctx)
	namespace := namespaceForServices(nw, subnet)

	log.Info("creating network namespace", "namespace", namespace)
	if err := createNetworkNs(namespace); err != nil {
		return fmt.Errorf("unable to create network namespace - %w", err)
	}

	cableName := dhcpCableName(nw, subnet)
	if err := ln.getOrCreateVeth(ctx, namespace, cableName); err != nil {
		return fmt.Errorf("unable to create veth cable %s - %w", cableName, err)
	}

	// need to create flow rules taking this to the vxlan?
	log.Info("adding dhcp cable to workload switch", "cableName", cableName)
	if err := sdn.Ovs().VSwitch.AddPort(sdn.WorkloadSwitchName, cableName.Root()); err != nil {
		return err
	}
	log.Info("ensuring correct vlan tag on dhcp cable", "cableName", cableName)
	if err := sdn.Ovs().VSwitch.Set.Port(cableName.Root(), ovs.PortOptions{
		Tag: int(subnet.Segment()),
	}); err != nil {
		return err
	}

	dhcpCidr := subnet.Cidr()

	dhcpAddr := dhcpCidr.IP().Next().Next()

	if err := setNsVethIp(namespace, fmt.Sprintf("%s/%d", dhcpAddr.String(), dhcpCidr.Bits()), cableName.Namespace()); err != nil {
		return fmt.Errorf("unable to set dhcp ip on internal cable %s - %W", cableName, err)
	}

	// create the dnsmasq config to provide dhcp for this subnet
	baseDir := filepath.Join("/run/ordiri/subnets", subnet.Name(), "dhcp")

	dnsMasqOptions := dhcp.DnsMasqConfig(baseDir, subnet.Name(), subnet.Cidr())
	if err := os.MkdirAll(baseDir, os.ModePerm); err != nil {
		return fmt.Errorf("unable to create directory %s - %w", baseDir, err)
	}

	hostFile := filepath.Join(baseDir, "etc-hosts")
	leaseFile := filepath.Join(baseDir, "dnsmasq.leases")
	if err := touchFiles(hostFile, leaseFile); err != nil {
		return err
	}

	// startCmd := strings.Join(append([]string{"ip", "netns", "exec", namespace, "/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	startCmd := strings.Join(append([]string{"/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	// create the systemd file to manage this dhcp
	unitName := dhcpUnitName(subnet)
	opts := []*unit.UnitOption{
		unit.NewUnitOption("Unit", "Description", "DHCP Service for "+unitName),
		unit.NewUnitOption("Install", "WantedBy", "multi-user.target"),
		// unit.NewUnitOption("Service", "PrivateMounts", "yes"),
		unit.NewUnitOption("Service", "BindPaths", strings.Join([]string{
			hostFile + ":/etc/hosts",
			leaseFile + ":/var/lib/misc/dnsmasq.leases",
		}, " ")),
		unit.NewUnitOption("Service", "NetworkNamespacePath", namespacePath(namespace)),
		unit.NewUnitOption("Service", "ExecStart", startCmd),
	}

	unitReader := unit.Serialize(opts)
	unitBytes, err := io.ReadAll(unitReader)
	if err != nil {
		return fmt.Errorf("unable to get system unit file for dhcp service %w", err)
	}
	unitFile := path.Join(baseDir, unitName)
	if err := os.WriteFile(unitFile, unitBytes, 0644); err != nil {
		return fmt.Errorf("unable to create system unit file %w", err)
	}

	units, err := ln.dbus.ListUnitsByNamesContext(ctx, []string{unitName})
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
		needsReloadProp, err := ln.dbus.GetUnitPropertyContext(ctx, unitName, "NeedDaemonReload")
		if err != nil {
			return err
		}

		if err := needsReloadProp.Value.Store(&needsReload); err != nil {
			return err
		}
	}

	if !running || needsReload {
		log.V(5).Info("No existing DHCP service, creating")
		if err := ln.dbus.ReloadContext(ctx); err != nil {
			return err
		}

		log.V(5).Info("enabling systemd service", "service", string(unitBytes))
		started, _, err := ln.dbus.EnableUnitFilesContext(ctx, []string{unitFile}, true, true)
		if err != nil {
			return fmt.Errorf("unable to enable system unit file %w", err)
		}

		if !started {
			return fmt.Errorf("invalid service unit file, not started")
		}
		pid, err := ln.dbus.RestartUnitContext(ctx, unitName, "replace", nil)

		if err != nil || pid == 0 {
			return fmt.Errorf("unable to start dhcp service - %w", err)

		}

		log.V(5).Info("started dhcp service")
	}

	return nil
}

func (ln *linuxDriver) flows(ctx context.Context, nw api.Network, subnet api.Subnet) ([]sdn.FlowRule, error) {

	return []sdn.FlowRule{
		&sdn.NodeSubnetEgress{
			Switch:        sdn.TunnelSwitchName,
			NodeLocalVlan: subnet.Segment(),
			TunnelId:      nw.Segment(),
		},
		&sdn.NodeSubnetIngress{
			Switch:        sdn.TunnelSwitchName,
			NodeLocalVlan: subnet.Segment(),
			TunnelId:      nw.Segment(),
		},
	}, nil
}

func (ln *linuxDriver) installFlows(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	flows, err := ln.flows(ctx, nw, subnet)
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
