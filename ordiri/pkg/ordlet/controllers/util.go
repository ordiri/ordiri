package controllers

import (
	"errors"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
)

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

func createVeth(cableName string, namespace string) error {
	ns, err := netns.GetFromName(namespace)
	if err != nil {
		return err
	}

	// check the out as the in is in a namespace
	nl, err := netlink.LinkByName(cableName + "-out")
	if err != nil && errors.As(err, &netlink.LinkNotFoundError{}) {
		if !ns.IsOpen() {
			return fmt.Errorf("ns is nt open")
		}
		la := netlink.NewLinkAttrs()

		// la.Namespace = namespace
		la.Name = cableName + "-in"
		la.Namespace = netlink.NsFd(ns)
		nl = &netlink.Veth{
			LinkAttrs: la,
			PeerName:  cableName + "-out",
		}

		if err := netlink.LinkAdd(nl); err != nil {
			return fmt.Errorf("unable to create a veth to attach the dhcp to subnet - %w", err)
		}
	} else if err != nil {
		return fmt.Errorf("unknown error attaching veth cable to subnet - %w", err)
	}

	// switch veth := nl.(type) {
	// case *netlink.Veth:
	// 	spew.Dump(veth)
	// }

	if nl == nil {
		panic("error creating veth cable for dhcp")
	}

	if err := netlink.LinkSetUp(nl); err != nil {
		return fmt.Errorf("unable to start veth cable - %w", err)
	}

	cmd := exec.Command("ip", "netns", "exec", namespace, "ip", "link", "set", "up", "dev", "lo")
	out, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("%s: unable to start loopback interface in ns %s - %s - %w", cmd.String(), namespace, string(out), err)
	}

	cmd = exec.Command("ip", "netns", "exec", namespace, "ip", "link", "set", "up", "dev", cableName+"-in")
	out, err = cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("%s: unable to start patch cable interface in ns %s - %s - %w", cmd.String(), namespace, string(out), err)
	}
	cmd = exec.Command("ip", "link", "set", "up", "dev", cableName+"-out")
	out, err = cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("%s: unable to start external patch cable %s - %s - %w", cmd.String(), namespace, string(out), err)
	}

	return nil
}
func removeVeth(cableName string) error {
	// check the out as the in is in a namespace

	if nl, err := netlink.LinkByName(cableName + "-out"); err == nil {
		if err := netlink.LinkDel(nl); err != nil {
			return fmt.Errorf("unable to start veth cable - %w", err)
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

func deleteNetworkNs(name string) error {
	cmd := exec.Command("ip", "netns", "delete", name)
	out, err := cmd.CombinedOutput()

	if err != nil && !strings.Contains(string(out), "No such file or directory") {
		return fmt.Errorf("%s: error removing network ns - %s - %w", cmd.String(), string(out), err)
	}
	return nil
}

func setNsVethIp(namespace string, addr string, cableName string) error {

	cmd := exec.Command("ip", "netns", "exec", namespace, "ip", "addr", "add", addr, "dev", cableName+"-in")
	out, err := cmd.CombinedOutput()
	if err != nil && !strings.Contains(string(out), "File exists") {
		return fmt.Errorf("%s: unable to add ip to ns network interface - %s - %w", cmd.String(), string(out), err)
	}

	return nil
}
