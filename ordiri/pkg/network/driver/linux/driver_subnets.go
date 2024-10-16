package linux

import (
	"context"
	"errors"
	"fmt"
	"net"
	"os"
	"strings"
	"syscall"

	"github.com/coreos/go-systemd/unit"
	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/dhcp"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
	"inet.af/netaddr"
)

func metaMac() net.HardwareAddr {
	addr, err := mac.Parse("00:00:00:00:0A:F6")
	if err != nil {
		panic(err.Error())
	}
	return addr
}

func (ln *linuxDriver) RemoveSubnet(ctx context.Context, nw api.Network, sn api.Subnet) error {
	if err := ln.removeSubnetFlows(ctx, nw, sn); err != nil {
		return fmt.Errorf("error removing subnet flows - %w", err)
	}

	if err := ln.removeMetadataServer(ctx, nw, sn); err != nil {
		return fmt.Errorf("error removing metadata server - %w", err)
	}
	if err := ln.removeDhcp(ctx, nw, sn); err != nil {
		return fmt.Errorf("error removing dhcp - %w", err)
	}

	if err := deleteNetworkNs(namespaceForDhcp(nw, sn)); err != nil {
		return fmt.Errorf("error removing network namespace - %w", err)
	}

	return nil
}

func (ln *linuxDriver) RegisterSubnet(ctx context.Context, nw api.Network, sn api.Subnet) error {
	log := log.FromContext(ctx)
	log.V(8).Info("Installing Services Network")
	if err := ln.createSubnetServicesNs(ctx, nw, sn); err != nil {
		return err
	}

	log.V(8).Info("Installing Services Network")
	if err := ln.installDhcp(ctx, nw, sn); err != nil {
		return err
	}
	log.V(8).Info("Installing MetadataService")
	if err := ln.installMetadataServer(ctx, nw, sn); err != nil {
		return err
	}

	log.V(8).Info("Installing Subnet router")
	if err := ln.EnsureRouter(ctx, nw, sn); err != nil {
		return err
	}

	log.V(8).Info("Subnet Ensured")

	return nil
}

func isPortNotExist(err error) bool {
	if ovs.IsPortNotExist(err) {
		return true
	}

	return strings.Contains(err.Error(), "does not have a port")
}

func (ln *linuxDriver) removeMetadataServer(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	log := log.FromContext(ctx)
	cableName := metadataCableName(nw, subnet)
	unitName := metadataServerUnitName(subnet)

	log.V(8).Info("Deleting port for metadata", "cableName", cableName)
	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.DeletePort(sdn.WorkloadSwitchName, cableName.Root()); err != nil && !isPortNotExist(err) {
		return fmt.Errorf("unable to remove metadata port - %w", err)
	}
	log.V(8).Info("Deleting veth cable for metadata", "cableName", cableName)

	if _, iface := ln.interfaces.search(cableName.Root()); iface != nil {
		if err := netlink.LinkDel(iface.Link); err != nil && !errors.As(err, &netlink.LinkNotFoundError{}) {
			return fmt.Errorf("error removing cable interface - %w", err)
		}
	}

	// remove the metadata directory and the unit file
	baseDir := subnetConfDir(nw, subnet)

	if err := ln.dbus.ReloadContext(ctx); err != nil {
		return fmt.Errorf("unabel to reload systemctl dbus ctx - %w", err)
	}
	units, err := ln.dbus.ListUnitsByNamesContext(ctx, []string{unitName})
	if err != nil {
		return fmt.Errorf("error getting systemctl unit names - %w", err)
	}

	if len(units) > 0 {
		for _, unit := range units {
			if unit.ActiveState == "active" {
				ln.dbus.KillUnitContext(ctx, unit.Name, int32(syscall.SIGTERM))
			}
			if unit.LoadState != "not-found" {
				if _, err := ln.dbus.DisableUnitFilesContext(ctx, []string{unit.Name}, true); err != nil {
					return fmt.Errorf("unable to disable unit file %+v - %w", unit, err)
				}
			}
		}
	}

	if err := os.RemoveAll(baseDir); err != nil {
		return fmt.Errorf("unable to remove subnet runtime files - %w", err)
	}
	return nil
}

func (ln *linuxDriver) removeDhcp(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	cableName := dhcpCableName(nw, subnet)
	log := log.FromContext(ctx)
	namespace := namespaceForDhcp(nw, subnet)
	unitName := dhcpUnitName(subnet)

	log.V(8).Info("Deleting port for dhcp", "cableName", cableName)
	// need to create flow rules taking this to the vxlan?
	if err := sdn.Ovs().VSwitch.DeletePort(sdn.WorkloadSwitchName, cableName.Root()); err != nil && !isPortNotExist(err) {
		return fmt.Errorf("unable to remove dhcp port - %w", err)
	}
	log.V(8).Info("Deleting veth cable for dhcp ", "cableName", cableName)

	if _, iface := ln.interfaces.search(cableName.Root()); iface != nil {
		if err := netlink.LinkDel(iface.Link); err != nil && !errors.As(err, &netlink.LinkNotFoundError{}) {
			return fmt.Errorf("error removing cable interface - %w", err)
		}
	}

	// create the dnsmasq config to provide dhcp for this subnet
	baseDir := subnetConfDir(nw, subnet)

	if err := ln.dbus.ReloadContext(ctx); err != nil {
		return fmt.Errorf("unabel to reload systemctl dbus ctx - %w", err)
	}
	units, err := ln.dbus.ListUnitsByNamesContext(ctx, []string{unitName})
	if err != nil {
		return fmt.Errorf("error getting systemctl unit names - %w", err)
	}

	if len(units) > 0 {
		for _, unit := range units {
			if unit.ActiveState == "active" {
				ln.dbus.KillUnitContext(ctx, unit.Name, int32(syscall.SIGTERM))
			}
			if unit.LoadState != "not-found" {
				if _, err := ln.dbus.DisableUnitFilesContext(ctx, []string{unit.Name}, true); err != nil {
					return fmt.Errorf("unable to disable unit file %+v - %w", unit, err)
				}
			}
		}
	}

	if err := os.RemoveAll(baseDir); err != nil {
		return fmt.Errorf("unable to remove subnet runtime files - %w", err)
	}

	log.V(8).Info("deleting the network namespace for DHCP ", "ns", namespace)

	return nil
}

func (ln *linuxDriver) installMetadataServer(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	log := log.FromContext(ctx)
	namespace := namespaceForDhcp(nw, subnet)
	cableName := metadataCableName(nw, subnet)

	if err := ln.getOrCreateVeth(ctx, namespace, "md:"+nw.Name()+":"+subnet.Name(), cableName, true, metaMac()); err != nil {
		return fmt.Errorf("unable to create veth cable %s - %w", cableName, err)
	}

	// need to create flow rules taking this to the vxlan?
	log.V(8).Info("adding metadata cable to workload switch", "cableName", cableName)
	if err := sdn.Ovs().VSwitch.AddPort(sdn.WorkloadSwitchName, cableName.Root()); err != nil {
		return err
	}

	log.V(8).Info("ensuring correct vlan tag on metadata cable", "cableName", cableName)
	if err := sdn.Ovs().VSwitch.Set.Port(cableName.Root(), ovs.PortOptions{
		Tag: int(subnet.Segment()),
	}); err != nil {
		return err
	}

	if err := setNsVethIp(namespace, netaddr.MustParseIPPrefix("169.254.169.254/32"), cableName.Namespace()); err != nil {
		return fmt.Errorf("unable to set metadata ip on internal cable %s - %W", cableName, err)
	}

	// create the dnsmasq config to provide metadata for this subnet
	baseDir := subnetConfDir(nw, subnet)
	if err := os.MkdirAll(baseDir, os.ModePerm); err != nil {
		return fmt.Errorf("unable to create directory %s - %w", baseDir, err)
	}

	// startCmd := strings.Join(append([]string{"ip", "netns", "exec", namespace, "/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	startCmd := strings.Join([]string{"/usr/local/bin/ordiri-metadata", "--network", nw.Name(), "--tenant", nw.Tenant(), "--subnet", subnet.Name(), "--cidr", subnet.Cidr().String(), "server"}, " ")
	// create the systemd file to manage this metadata
	unitName := metadataServerUnitName(subnet)
	opts := []*unit.UnitOption{
		unit.NewUnitOption("Unit", "Description", "Ordiri Metadata Service for "+unitName),
		unit.NewUnitOption("Unit", "After", "ordlet.service"),
		unit.NewUnitOption("Unit", "BindsTo", "ordlet.service"),
		// unit.NewUnitOption("Service", "PrivateMounts", "yes"),
		unit.NewUnitOption("Service", "NetworkNamespacePath", namespacePath(namespace)),
		unit.NewUnitOption("Service", "Environment", "KUBECONFIG=/etc/ordiri.conf"),
		unit.NewUnitOption("Service", "ExecStart", startCmd),
		unit.NewUnitOption("Service", "Restart", "always"),
		unit.NewUnitOption("Install", "WantedBy", "multi-user.target"),
	}

	return ln.enableUnitFile(ctx, baseDir, unitName, opts)
	// This should not be part of the core network code
	// return nil
}

func (ln *linuxDriver) createSubnetServicesNs(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	log := log.FromContext(ctx)
	dhcpNamespace := namespaceForDhcp(nw, subnet)

	log.V(8).Info("creating dhcp namespace", "namespace", dhcpNamespace)
	if err := createNetworkNs(dhcpNamespace); err != nil {
		return fmt.Errorf("unable to create dhcp namespace - %w", err)
	}

	return nil
}

func (ln *linuxDriver) installDhcp(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	log := log.FromContext(ctx)
	namespace := namespaceForDhcp(nw, subnet)
	cableName := dhcpCableName(nw, subnet)
	if err := ln.getOrCreateVeth(ctx, namespace, "dhcp:"+nw.Name()+":"+subnet.Name(), cableName, false, mac.Unicast()); err != nil {
		return fmt.Errorf("unable to create veth cable %s - %w", cableName, err)
	}

	// need to create flow rules taking this to the vxlan?
	log.V(8).Info("adding dhcp cable to workload switch", "cableName", cableName)
	if err := sdn.Ovs().VSwitch.AddPort(sdn.WorkloadSwitchName, cableName.Root()); err != nil {
		return err
	}
	log.V(8).Info("ensuring correct vlan tag on dhcp cable", "cableName", cableName)
	if err := sdn.Ovs().VSwitch.Set.Port(cableName.Root(), ovs.PortOptions{
		Tag: int(subnet.Segment()),
	}); err != nil {
		return err
	}

	dhcpCidr := subnet.Cidr()
	dhcp6Cidr := subnet.Cidr6()

	routerAddr := dhcpCidr.IP().Next()
	router6Addr := dhcp6Cidr.IP().Next()
	dhcpAddr := routerAddr.Next()
	dhcp6Addr := router6Addr.Next()
	dhcpIpCidr := netaddr.IPPrefixFrom(dhcpAddr, dhcpCidr.Bits())
	dhcpIp6Cidr := netaddr.IPPrefixFrom(dhcp6Addr, dhcp6Cidr.Bits())

	if err := setNsVethIp(namespace, dhcpIpCidr, cableName.Namespace()); err != nil {
		return fmt.Errorf("unable to set dhcp ip on internal cable %s - %W", cableName, err)
	}

	if err := setNsVethIp(namespace, dhcpIp6Cidr, cableName.Namespace()); err != nil {
		return fmt.Errorf("unable to set dhcp ip on internal cable %s - %W", cableName, err)
	}

	curNs, err := netns.Get()
	if err != nil {
		return fmt.Errorf("unable to get current network ns - %w", err)
	}
	curNs.Close()
	handle, err := netns.GetFromName(namespace)
	if err != nil {
		return fmt.Errorf("unable to get namespace for public gateway ns - %w", err)
	}

	result := make(chan error)

	// in a way i'm suprised this works, i would think it would affect the
	// pkgHandle used by the generic Netlink functions
	go func(targetNs netns.NsHandle, curNs netns.NsHandle) {
		closeNs, err := ExecuteInNetns(targetNs, curNs)
		if err != nil {
			return
		}
		defer closeNs()
		if err := netlink.RouteReplace(&netlink.Route{
			Gw:  routerAddr.IPAddr().IP,
			Src: dhcpAddr.IPAddr().IP,
		}); err != nil {
			result <- fmt.Errorf("unable to set services namespace route - %w", err)
		}
		close(result)
	}(handle, curNs)

	if err := <-result; err != nil {
		return fmt.Errorf("unable to set route for dhcp namespace - %w", err)
	}

	// create the dnsmasq config to provide dhcp for this subnet
	baseDir := dhcpConfDir(nw, subnet)
	dhcpHostDir := dhcpHostMappingDir(nw, subnet)
	etcHostsDir := etcHostMappingDir(nw)

	dnsMasqOptions := dhcp.DnsMasqConfig(baseDir, subnet.Name(), cableName.Namespace(), subnet.Cidr(), subnet.Cidr6(), etcHostsDir, dhcpHostDir)
	// easier to just make the host dir as it's deeper in the tree than the root conf dir
	if err := os.MkdirAll(etcHostsDir, os.ModePerm); err != nil {
		return fmt.Errorf("unable to create hosts directory %s - %w", baseDir, err)
	}
	// easier to just make the host dir as it's deeper in the tree than the root conf dir
	if err := os.MkdirAll(dhcpHostDir, os.ModePerm); err != nil {
		return fmt.Errorf("unable to create dhcp directory %s - %w", baseDir, err)
	}

	hostFile := dhcpHostsFilePath(nw, subnet)
	leaseFile := dhcpLeaseFilePath(nw, subnet)
	if err := touchFiles(hostFile, leaseFile); err != nil {
		return err
	}

	// startCmd := strings.Join(append([]string{"ip", "netns", "exec", namespace, "/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	startCmd := strings.Join(append([]string{"/usr/sbin/dnsmasq"}, dnsMasqOptions.Args()...), " ")
	// create the systemd file to manage this dhcp
	unitName := dhcpUnitName(subnet)
	opts := []*unit.UnitOption{
		unit.NewUnitOption("Unit", "Description", "DHCP Service for "+unitName),
		unit.NewUnitOption("Unit", "After", "ordlet.service"),
		unit.NewUnitOption("Unit", "BindsTo", "ordlet.service"),
		unit.NewUnitOption("Install", "WantedBy", "multi-user.target"),
		// unit.NewUnitOption("Service", "PrivateMounts", "yes"),
		unit.NewUnitOption("Service", "BindPaths", strings.Join([]string{
			hostFile + ":/etc/hosts",
			leaseFile + ":/var/lib/misc/dnsmasq.leases",
		}, " ")),
		unit.NewUnitOption("Service", "NetworkNamespacePath", namespacePath(namespace)),
		unit.NewUnitOption("Service", "ExecStart", startCmd),
		unit.NewUnitOption("Service", "Restart", "always"),
	}

	return ln.enableUnitFile(ctx, baseDir, unitName, opts)
}

func (ln *linuxDriver) flows(ctx context.Context, nw api.Network, subnet api.Subnet) ([]sdn.FlowRule, error) {
	return []sdn.FlowRule{
		&sdn.NodeSubnetEgress{
			NodeLocalVlan: subnet.Segment(),
			TunnelId:      nw.Segment(),
		},
		&sdn.NodeSubnetIngress{
			NodeLocalVlan: subnet.Segment(),
			TunnelId:      nw.Segment(),
			Cidr:          subnet.Cidr().Masked(),
		},
	}, nil
}

func (ln *linuxDriver) removeSubnetFlows(ctx context.Context, nw api.Network, subnet api.Subnet) error {
	flows, err := ln.flows(ctx, nw, subnet)
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

func (ln *linuxDriver) installSubnetFlows(ctx context.Context, nw api.Network, subnet api.Subnet) error {
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
