package linux

import (
	"fmt"
	"hash/fnv"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"path"

	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
	"inet.af/netaddr"
)

func dhcpUnitName(subnet api.Subnet) string {
	return fmt.Sprintf("dhcp-%s.service", subnet.Name())
}
func metadataServerUnitName(subnet api.Subnet) string {
	return fmt.Sprintf("ordiri-md-%s.service", subnet.Name())
}
func networkBgpRouterUnitName(nw api.Network) string {
	return fmt.Sprintf("ordiri-bgp-%s.service", nw.Name())
}
func networkRouterAdvertisementUnitName(nw api.Network, sn api.Subnet) string {
	return fmt.Sprintf("ordiri-rad-%s-%s.service", nw.Name(), sn.Name())
}
func networkBgpZebraUnitName(nw api.Network) string {
	return fmt.Sprintf("ordiri-zebra-%s.service", nw.Name())
}

func namespacePath(namespace string) string {
	return fmt.Sprintf("/var/run/netns/%s", namespace)
}

func hash(s string, size int) string {
	h := fnv.New32a()
	h.Write([]byte(s))
	hash := fmt.Sprint(h.Sum32())
	if size == 0 {
		size = len(hash)
	}
	return string([]byte(hash)[0:size])
}

func listNamespaces() (map[string]string, error) {
	namespaces, err := os.ReadDir(networkNamespacePath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil
		}
		return nil, err
	}

	nss := map[string]string{}
	for _, finfo := range namespaces {
		// if finfo.
		nss[path.Join(networkNamespacePath, finfo.Name())] = finfo.Name()
	}

	return nss, nil
}

type iptRule struct {
	Table string
	Chain string
	Rules [][]string
}

func touchFiles(fileNames ...string) error {
	for _, f := range fileNames {
		if err := touchFile(f); err != nil {
			return err
		}
	}
	return nil
}
func touchFile(fileName string) error {
	_, err := os.Stat(fileName)
	if os.IsNotExist(err) {
		file, err := os.Create(fileName)
		if err != nil {
			return err
		}
		defer file.Close()
	} else {
		currentTime := time.Now().Local()
		err = os.Chtimes(fileName, currentTime, currentTime)
		if err != nil {
			return err
		}
	}

	return nil

}

func deleteNetworkNs(name string) error {
	cmd := exec.Command("ip", "netns", "delete", name)
	out, err := cmd.CombinedOutput()

	if err != nil && !strings.Contains(string(out), "No such file or directory") {
		return fmt.Errorf("%s: error removing network ns - %s - %w", cmd.String(), string(out), err)
	}
	return nil
}

func createNetworkNs(name string) error {
	cmd := exec.Command("ip", "netns", "add", name)
	out, err := cmd.CombinedOutput()

	if err != nil && !strings.Contains(string(out), "File exists") {
		return fmt.Errorf("%s: unable to create network namespace - %q - %w", cmd.String(), string(out), err)
	}

	cmd = exec.Command("ip", "netns", "exec", name, "sysctl", "-w", "net.ipv6.conf.all.forwarding=1")
	out, err = cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("%s: unable to set sysctl all forwarding prop - %q - %w", cmd.String(), string(out), err)
	}

	cmd = exec.Command("ip", "netns", "exec", name, "sysctl", "-w", "net.ipv6.conf.default.forwarding=1")
	out, err = cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("%s: unable to set sysctl default forwarding prop - %q - %w", cmd.String(), string(out), err)
	}

	if err != nil {
		return fmt.Errorf("%s: unable to set loopback link up - %q - %w", cmd.String(), string(out), err)
	}

	return nil
}

func setNsVethIp(namespace string, addr netaddr.IPPrefix, cableName string) error {
	if addr.IsZero() {
		panic("is zero?!")
	}
	fmt.Printf("Adding ns veth ip %q to %q\n", addr.String(), cableName)
	nsHandle, err := netns.GetFromName(namespace)
	if err != nil {
		return fmt.Errorf("unable to get namespace %q - %w", namespace, err)
	}
	defer nsHandle.Close()

	nl, err := netlink.NewHandleAt(nsHandle)
	if err != nil {
		return fmt.Errorf("unable to create netlink handle for namespace %q - %w", namespace, err)
	}
	link, err := nl.LinkByName(cableName)
	if err != nil {
		return fmt.Errorf("unable to get interface %q in namespace %q - %w", cableName, namespace, err)
	}

	addrs, err := nl.AddrList(link, netlink.FAMILY_ALL)
	if err != nil {
		return fmt.Errorf("unable to get interface addresses for %q in namespace %q - %w", cableName, namespace, err)
	}

	needs := true
	for _, _addr := range addrs {
		if addr.IP().IPAddr().IP.Equal(_addr.IP) {
			needs = false
			break
		}
	}
	if needs {
		fmt.Printf("needs the ip %s\n", addr.IPNet())
		if err := nl.AddrAdd(link, &netlink.Addr{
			IPNet: addr.IPNet(),
		}); err != nil {
			return fmt.Errorf("unable to add address %q to interface %q in namespace %q - %w", addr.String(), cableName, namespace, err)
		}
	} else {
		fmt.Printf("Already has ip %s\n", addr.String())
	}

	return nil
}

// dhcpLeaseFilePath returns the path
func dhcpLeaseFilePath(nw api.Network, subnet api.Subnet) string {
	return filepath.Join(dhcpConfDir(nw, subnet), "dnsmasq.leases")
}

func dhcpHostsFilePath(nw api.Network, subnet api.Subnet) string {
	return filepath.Join(dhcpConfDir(nw, subnet), "etc-hosts")
}

func dhcpHostMappingDir(nw api.Network, subnet api.Subnet) string {
	return filepath.Join(dhcpConfDir(nw, subnet), "/host-mappings")
}

func etcHostMappingDir(nw api.Network) string {
	return filepath.Join(dhcpConfDir(nw, nil), "/etc-hosts.d")
}

func dhcpConfDir(nw api.Network, subnet api.Subnet) string {
	return filepath.Join(subnetConfDir(nw, subnet), "dhcp")
}

func subnetConfDir(nw api.Network, subnet api.Subnet) string {
	sn := "_shared"
	if subnet != nil {
		sn = subnet.Name()
	}

	return filepath.Join(confDir, "networks", nw.Name(), "subnets", sn)
}
