package linux

import (
	"context"
	"fmt"
	"net"

	"github.com/ordiri/ordiri/pkg/log"
	"github.com/vishvananda/netlink"
	"github.com/vishvananda/netns"
)

type NetworkInterface struct {
	namespace string
	netlink.Link
}

func (ni *NetworkInterface) Name() string {
	return ni.Attrs().Name
}

func (ln *linuxDriver) getOrCreateVeth(ctx context.Context, namespace string, cableName VethCable) error {
	log := log.FromContext(ctx)
	log.V(5).Info("Searching for existing veth cable", "namespace", namespace, "cableName", cableName)
	existingIface := ln.interfaces.get(namespace, cableName.Namespace())

	if existingIface == nil {
		handle, err := netns.GetFromName(namespace)
		if err != nil {
			return fmt.Errorf("unable to get ns for public gateway cable - %w", err)
		}
		link := &netlink.Veth{
			LinkAttrs: netlink.LinkAttrs{
				Name:      cableName.Namespace(),
				Namespace: netlink.NsFd(handle),
				Flags:     net.FlagUp,
			},
			PeerName: cableName.Root(),
		}

		if _, existing := ln.interfaces.search(cableName.Root()); existing != nil {
			log.Info("veth cable in wrong namespace, attempting to move", "namespace", namespace, "cableName", cableName, "actualNamespace", existing.namespace)

			if err := netlink.LinkDel(existing.Link); err != nil {
				return fmt.Errorf("unable to delete link in wrong namespace - %w", err)
			}
		}

		log.V(5).Info("veth not found, creating", "namespace", namespace, "cableName", cableName)
		if err := netlink.LinkAdd(link); err != nil {
			return fmt.Errorf("unable to create public gateway veth '%s' - %w", cableName+"-in", err)
		}
		log.V(5).Info("veth cable was created", "namespace", namespace, "cableName", cableName)
	} else {
		log.V(5).Info("found existing veth cable", "namespace", namespace, "cableName", cableName)
	}

	link, err := netlink.LinkByName(cableName.Root())
	if err != nil {
		return fmt.Errorf("error fetching link - %w", err)
	}

	if err := netlink.LinkSetUp(link); err != nil {
		return fmt.Errorf("unable to set link up - %w", err)
	}

	return nil
}
func (ln *linuxDriver) discoverInterface(ctx context.Context, namespace string, ns netns.NsHandle, msg netlink.LinkUpdate) error {
	log := log.FromContext(ctx)
	log.V(10).Info("discovering interface", "namespace", namespace, "link", msg.Link)
	ln.interfaces.set(namespace, NetworkInterface{
		namespace: namespace,
		Link:      msg,
	})
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
