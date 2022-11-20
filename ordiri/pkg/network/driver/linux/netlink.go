package linux

import (
	"context"
	"fmt"
	"net"

	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
	"golang.org/x/sys/unix"
)

type NetworkInterface struct {
	namespace string
	netlink.Link
}

func (ni *NetworkInterface) Name() string {
	return ni.Attrs().Name
}

func (ln *linuxDriver) getOrCreateVeth(ctx context.Context, namespace, name string, cableName VethCable, enforceMac bool, macAddr net.HardwareAddr) error {
	log := log.FromContext(ctx)
	log.V(5).Info("Searching for existing veth cable", "namespace", namespace, "cableName", cableName)
	_, err := netlink.LinkByName(cableName.Root())
	altnames := []string{namespace + ":" + name}

	if err != nil {
		handle, err := netns.GetFromName(namespace)
		if err != nil {
			return fmt.Errorf("unable to get ns for public gateway cable - %w", err)
		}
		defer handle.Close()
		link := &netlink.Veth{
			LinkAttrs: netlink.LinkAttrs{
				Name:         cableName.Namespace(),
				Namespace:    netlink.NsFd(handle),
				Flags:        net.FlagUp,
				HardwareAddr: macAddr,
				MTU:          sdn.OverlayMTU,
				AltNames:     altnames,
			},
			PeerName: cableName.Root(),
		}

		log.V(5).Info("veth not found, creating", "namespace", namespace, "cableName", cableName)
		if err := netlink.LinkAdd(link); err != nil {
			return fmt.Errorf("unable to create veth '%s' - %w", cableName.Namespace(), err)
		}
		log.V(5).Info("veth cable was created", "namespace", namespace, "cableName", cableName)
	} else {
		log.V(5).Info("found existing veth cable", "namespace", namespace, "cableName", cableName)
	}

	handle, err := netns.GetFromName(namespace)
	if err != nil {
		return fmt.Errorf("unable to get namespace - %w", err)
	}
	defer handle.Close()
	nlhandle, err := netlink.NewHandleAt(handle)
	if err != nil {
		return fmt.Errorf("unable to get namespace - %w", err)
	}
	defer nlhandle.Close()

	namespaceLink, err := nlhandle.LinkByName(cableName.Namespace())
	if err != nil {
		return fmt.Errorf("error fetching link - %w", err)
	}
	if namespaceLink.Attrs().MTU != sdn.OverlayMTU {
		if err := nlhandle.LinkSetMTU(namespaceLink, sdn.OverlayMTU); err != nil {
			return fmt.Errorf("unable to set mtu - %w", err)
		}
	}

	if enforceMac && namespaceLink.Attrs().HardwareAddr.String() != macAddr.String() {
		if err := nlhandle.LinkSetHardwareAddr(namespaceLink, macAddr); err != nil {
			return fmt.Errorf("unable to set the mac address - %w", err)
		}
	}
	namespaceLink.Attrs().AltNames = altnames
	if err := nlhandle.EnsureLinkProps(namespaceLink); err != nil {
		return fmt.Errorf("error setting link props during create - %w", err)
	}
	link, err := netlink.LinkByName(cableName.Root())
	if err != nil {
		return fmt.Errorf("error fetching link - %w", err)
	}
	if link.Attrs().MTU != sdn.OverlayMTU {
		if err := netlink.LinkSetMTU(link, sdn.OverlayMTU); err != nil {
			return fmt.Errorf("unable to set mtu - %w", err)
		}
	}
	log.V(5).Info("ensuring link up", "namespace", namespace, "cableName", cableName)
	if err := netlink.LinkSetUp(link); err != nil {
		return fmt.Errorf("unable to set link up - %w", err)
	}

	link.Attrs().AltNames = altnames
	if err := netlink.EnsureLinkProps(link); err != nil {
		return fmt.Errorf("error setting link props - %w", err)
	}

	return nil
}
func (ln *linuxDriver) discoverInterface(ctx context.Context, namespace string, ns netns.NsHandle, msg netlink.LinkUpdate) error {
	log := log.FromContext(ctx)
	if msg.Header.Type == unix.RTM_DELLINK {
		log.V(10).Info("deleting interface", "namespace", namespace, "link", msg.Link)
		ln.interfaces.delete(namespace, NetworkInterface{
			namespace: namespace,
			Link:      msg,
		})
	} else {
		log.V(10).Info("discovering interface", "namespace", namespace, "link", msg.Link)
		ln.interfaces.set(namespace, NetworkInterface{
			namespace: namespace,
			Link:      msg,
		})
	}
	return nil
}

func (ln *linuxDriver) watchNamespaceInterfaces(ctx context.Context, name string, ns netns.NsHandle) error {
	itemCh := make(chan netlink.LinkUpdate)
	defer close(itemCh)

	if err := netlink.LinkSubscribeWithOptions(itemCh, ln.stopCh, netlink.LinkSubscribeOptions{
		Namespace:    &ns,
		ListExisting: true,
	}); err != nil {
		return err
	}

	for {
		select {
		case <-ctx.Done():
			ln.stopCh <- struct{}{}
			return ctx.Err()
		case res := <-itemCh:
			if err := ln.discoverInterface(ctx, name, ns, res); err != nil {
				return err
			}
		}
	}
}
