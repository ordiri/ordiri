package network

import (
	"context"
	"fmt"
	"sync"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *networkManager) GetNetwork(nw string) (api.Network, error) {
	ln.l.RLock()
	defer ln.l.RUnlock()
	if nw, ok := ln.networks[nw]; ok {
		return nw.Network, nil
	}

	return nil, fmt.Errorf("no network")
}

func (ln *networkManager) RegisterNetwork(ctx context.Context, nw api.Network) error {
	ln.l.Lock()
	defer ln.l.Unlock()

	if _, ok := ln.networks[nw.Name()]; !ok {
		ln.networks[nw.Name()] = &managedNet{
			subnets: make(map[string]*managedSubnet),
			l:       sync.RWMutex{},
		}
	}
	ln.networks[nw.Name()].Network = nw

	return nil
}

func (ln *networkManager) RemoveNetwork(ctx context.Context, nw string) error {
	ln.l.Lock()
	defer ln.l.Unlock()

	if net, err := ln.GetNetwork(nw); err != nil {
		if err := ln.driver.RemoveNetwork(ctx, net); err != nil {
			return err
		}
	}

	delete(ln.networks, nw)
	return nil
}

var _ api.NetworkManager = &networkManager{}
