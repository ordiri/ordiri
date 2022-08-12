package network

import (
	"context"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *networkManager) HasInterface(nw api.Network, sn api.Subnet, name string) bool {
	if _, ok := ln.interfaces[nw.Name()]; !ok {
		return false
	}

	if _, ok := ln.interfaces[nw.Name()][sn.Name()]; !ok {
		return false
	}

	interfaces := ln.interfaces[nw.Name()][sn.Name()]
	for _, rtr := range interfaces {
		if rtr.Name() == name {
			return true
		}
	}
	return false
}

func (ln *networkManager) GetInterface(nw api.Network, sn api.Subnet, name string) api.Interface {
	if _, ok := ln.interfaces[nw.Name()]; ok {
		if _, ok := ln.interfaces[nw.Name()][sn.Name()]; ok {
			interfaces := ln.interfaces[nw.Name()][sn.Name()]
			for _, rtr := range interfaces {
				if rtr.Name() == name {
					return rtr
				}
			}
		}
	}

	panic("interface does not exist")
}

func (ln *networkManager) EnsureInterface(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) (string, error) {
	ln.l.Lock()
	defer ln.l.Unlock()

	ifaceName, err := ln.driver.EnsureInterface(ctx, nw, sn, iface)
	if err != nil {
		return "", err
	}

	if _, ok := ln.interfaces[nw.Name()]; !ok {
		ln.interfaces[nw.Name()] = make(map[string][]api.Interface)
	}

	if _, ok := ln.interfaces[nw.Name()][sn.Name()]; !ok {
		ln.interfaces[nw.Name()][sn.Name()] = []api.Interface{}
	}

	ln.interfaces[nw.Name()][sn.Name()] = append(ln.interfaces[nw.Name()][sn.Name()], iface)

	return ifaceName, nil
}

func (ln *networkManager) RemoveInterface(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) error {
	ln.l.Lock()
	defer ln.l.Unlock()

	if _, ok := ln.interfaces[nw.Name()]; !ok {
		return nil
	}

	if _, ok := ln.interfaces[nw.Name()][sn.Name()]; !ok {
		return nil
	}

	ifaces := []api.Interface{}
	for _, _iface := range ifaces {
		if _iface.Name() == iface.Name() {
			continue
		}
		ifaces = append(ifaces, iface)
	}
	ln.interfaces[nw.Name()][sn.Name()] = ifaces

	return nil
}
