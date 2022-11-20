package network

import (
	"context"
	"fmt"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *networkManager) GetInterface(nw string, sn string, name string) (api.Interface, error) {
	ln.l.RLock()
	defer ln.l.RUnlock()
	if nw, ok := ln.networks[nw]; ok {
		nw.l.RLock()
		defer nw.l.RUnlock()
		if subnet, ok := nw.subnets[sn]; ok {
			subnet.l.RLock()
			defer subnet.l.RUnlock()
			if iface, ok := subnet.ifaces[name]; ok {
				return iface.Interface, nil
			}
		}
	}
	return nil, fmt.Errorf("no such interface")
}

func (ln *networkManager) AttachInterface(ctx context.Context, nw string, sn string, iface api.Interface) (string, error) {
	if err := ln.RegisterInterface(ctx, nw, sn, iface); err != nil {
		return "", fmt.Errorf("unable to register interface - %w", err)
	}

	ln.l.RLock()
	defer ln.l.RUnlock()
	if nw, ok := ln.networks[nw]; ok {
		nw.l.RLock()
		defer nw.l.RUnlock()
		if err := ln.driver.RegisterNetwork(ctx, nw); err != nil {
			return "", fmt.Errorf("error creating network - %w", err)
		}
		nw.attached = true
		// We create a peer for both the ipv6 and ipv4 because that will allow them to create connections to us
		// given these are passive it's just an "allow this if they talk to us" sort of thing
		// if err := ln.speaker.AddPeer(ctx, apipb.PeerConf{
		// 	NeighborAddress: nw.ExternalIp().IP().String(),
		// 	PeerGroup:       "cloud-routers",
		// }); err != nil {
		// 	return "", fmt.Errorf("error adding tenant network BGP peer - %w", err)
		// }
		// spew.Dump("Allowing ip", nw.ExternalIp().IP().String(), nw.ExternalIp6().IP().String())
		// if err := ln.speaker.AddPeer(ctx, apipb.PeerConf{
		// 	NeighborAddress: nw.ExternalIp6().IP().String(),
		// 	PeerGroup:       "cloud-routers",
		// }); err != nil {
		// 	return "", fmt.Errorf("error adding tenant network BGP peer - %w", err)
		// }
		if sn, ok := nw.subnets[sn]; ok {
			if err := ln.driver.RegisterSubnet(ctx, nw, sn); err != nil {
				return "", fmt.Errorf("error creating subnet - %w", err)
			}
			sn.attached = true
			name, err := ln.driver.AttachInterface(ctx, nw, sn, iface)
			if err != nil {
				return "", fmt.Errorf("error attaching interface - %w", err)
			}

			return name, nil
		}
		return "", fmt.Errorf("missing subnet")
	}
	return "", fmt.Errorf("missing network")
}

func (ln *networkManager) RegisterInterface(ctx context.Context, nw string, sn string, iface api.Interface) error {
	ln.l.RLock()
	defer ln.l.RUnlock()

	if nw, ok := ln.networks[nw]; ok {
		nw.l.RLock()
		defer nw.l.RUnlock()
		if subnet, ok := nw.subnets[sn]; ok {
			subnet.l.Lock()
			defer subnet.l.Unlock()
			subnet.ifaces[iface.Name()] = &managedIface{
				attached:  false,
				Interface: iface,
			}
			return nil
		}
		return fmt.Errorf("unknown subnet")
	}
	return fmt.Errorf("unknown network")
}

func (ln *networkManager) RemoveInterface(ctx context.Context, nw string, sn string, iface string) error {
	ln.l.RLock()
	defer ln.l.RUnlock()

	if nw, ok := ln.networks[nw]; ok {
		nw.l.RLock()
		defer nw.l.RUnlock()
		if subnet, ok := nw.subnets[sn]; ok {
			subnet.l.Lock()
			defer subnet.l.Unlock()
			if iface, ok := subnet.ifaces[iface]; ok {
				if err := ln.driver.DetatchInterface(ctx, nw, subnet, iface); err != nil {
					return fmt.Errorf("error removing interface - %w", err)
				}
			}
			delete(subnet.ifaces, iface)
			return nil
		}
		return fmt.Errorf("unknown subnet")
	}
	return fmt.Errorf("unknown network")
}

var _ api.InterfaceManager = &networkManager{}
