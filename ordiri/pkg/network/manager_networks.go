package network

import (
	"context"
	"fmt"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *networkManager) network(name string) *managedNet {
	nws := ln.networks
	for _, nw := range nws {
		if nw != nil && nw.nw.Name() == name {
			return nw
		}
	}
	return nil
}

func (ln *networkManager) HasNetwork(name string) bool {
	return ln.network(name) != nil
}

func (ln *networkManager) GetNetwork(name string) api.Network {
	if nw := ln.network(name); nw != nil {
		return nw.nw
	}

	panic("no such network " + name)
}

func (ln *networkManager) RemoveNetwork(ctx context.Context, name string) error {
	ln.l.Lock()
	defer ln.l.Unlock()

	nw := ln.network(name)
	if nw == nil {
		return nil
	}

	if len(nw.subnets) > 0 {
		return fmt.Errorf("network still has active subnets")
	}

	if err := ln.driver.RemoveNetwork(ctx, nw.nw); err != nil {
		return err
	}

	nws := []*managedNet{}
	for _, net := range ln.networks {
		if nw == net {
			continue
		}
		nws = append(nws, net)
	}
	ln.networks = nws
	return nil
}

func (ln *networkManager) EnsureNetwork(ctx context.Context, nw api.Network) error {
	ln.l.Lock()
	defer ln.l.Unlock()

	if err := ln.driver.EnsureNetwork(ctx, nw); err != nil {
		return err
	}

	if !ln.HasNetwork(nw.Name()) {
		ln.networks = append(ln.networks, &managedNet{nw: nw, subnets: []*managedSubnet{}})
	}

	return nil
}
