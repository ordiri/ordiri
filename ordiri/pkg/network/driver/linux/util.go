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
	return nil
}

func setNsVethIp(namespace string, addr string, cableName string) error {
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

	ipNw := netaddr.MustParseIPPrefix(addr)
	if err := nl.AddrReplace(link, &netlink.Addr{
		IPNet: ipNw.IPNet(),
	}); err != nil {
		return fmt.Errorf("unable to add address %q to interface %q in namespace %q - %w", ipNw.String(), cableName, namespace, err)
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
