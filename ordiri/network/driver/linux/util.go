package linux

import (
	"fmt"
	"hash/fnv"
	"os"
	"os/exec"
	"strings"
	"time"

	"io/ioutil"
	"path"

	"github.com/ordiri/ordiri/network/api"
)

func dhcpUnitName(subnet api.Subnet) string {
	return fmt.Sprintf("dhcp-%s.service", subnet.Name())
}

func namespacePath(namespace string) string {
	return fmt.Sprintf("/var/run/netns/%s", namespace)
}

func hash(s string) string {
	h := fnv.New32a()
	h.Write([]byte(s))
	return string([]byte(fmt.Sprint(h.Sum32()))[0:5])
}

func listNamespaces() (map[string]string, error) {
	namespaces, err := ioutil.ReadDir(networkNamespacePath)
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

func createNetworkNs(name string) error {
	cmd := exec.Command("ip", "netns", "add", name)
	out, err := cmd.CombinedOutput()

	if err != nil && !strings.Contains(string(out), "File exists") {
		return fmt.Errorf("%s: unable to create network namespace - %s - %w", cmd.String(), string(out), err)
	}
	return nil
}

func setNsVethIp(namespace string, addr string, cableName string) error {

	cmd := exec.Command("ip", "netns", "exec", namespace, "ip", "addr", "add", addr, "dev", cableName)
	out, err := cmd.CombinedOutput()
	if err != nil && !strings.Contains(string(out), "File exists") {
		return fmt.Errorf("%s: unable to add ip to ns network interface - %s - %w", cmd.String(), string(out), err)
	}

	return nil
}
