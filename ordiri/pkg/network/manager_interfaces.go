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

func (ln *networkManager) RegisterInterface(ctx context.Context, nw string, sn string, iface api.Interface) (string, error) {
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
			return "", nil
		}
		return "", fmt.Errorf("unknown subnet")
	}
	return "", fmt.Errorf("unknown network")
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
			delete(subnet.ifaces, iface)
		}
		return fmt.Errorf("unknown subnet")
	}
	return fmt.Errorf("unknown network")
}

var _ api.InterfaceManager = &networkManager{}
