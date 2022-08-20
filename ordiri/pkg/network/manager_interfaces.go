package network

import (
	"context"
	"fmt"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *networkManager) HasInterface(nw api.Network, sn api.Subnet, name string) bool {
	_, subnet := ln.subnet(nw, sn.Name())
	if subnet == nil {
		return false
	}
	for _, rtr := range subnet.interfaces {
		if rtr.Name() == name {
			return true
		}
	}
	return false
}

func (ln *networkManager) GetInterface(nw api.Network, sn api.Subnet, name string) api.Interface {
	_, subnet := ln.subnet(nw, sn.Name())
	if subnet == nil {
		return nil
	}
	interfaces := subnet.interfaces
	for _, iface := range interfaces {
		if iface.Name() == name {
			return iface
		}
	}
	return nil
}

func (ln *networkManager) EnsureInterface(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) (string, error) {
	_, subnet := ln.subnet(nw, sn.Name())
	if subnet == nil {
		return "", fmt.Errorf("subnet does not exist")
	}
	subnet.l.Lock()
	defer subnet.l.Unlock()

	ifaceName, err := ln.driver.EnsureInterface(ctx, nw, sn, iface)
	if err != nil {
		return "", err
	}

	for i, _iface := range subnet.interfaces {
		if iface.Name() == _iface.Name() {
			subnet.interfaces[i] = iface
			return ifaceName, nil
		}
	}
	subnet.interfaces = append(subnet.interfaces, iface)

	return ifaceName, nil
}

func (ln *networkManager) RemoveInterface(ctx context.Context, nw api.Network, sn api.Subnet, iface api.Interface) error {
	_, subnet := ln.subnet(nw, sn.Name())
	if subnet == nil {
		return fmt.Errorf("subnet does not exist")
	}
	subnet.l.Lock()
	defer subnet.l.Unlock()

	if err := ln.driver.RemoveInterface(ctx, nw, sn, iface); err != nil {
		return fmt.Errorf("unable to remove interface - %w", err)
	}

	ifaces := []api.Interface{}
	for _, _iface := range subnet.interfaces {
		if _iface.Name() == iface.Name() {
			continue
		}
		ifaces = append(ifaces, _iface)
	}
	subnet.interfaces = ifaces

	return nil
}
