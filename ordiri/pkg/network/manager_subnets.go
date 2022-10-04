package network

import (
	"context"
	"fmt"
	"sync"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *networkManager) GetSubnet(nw string, name string) (api.Subnet, error) {
	ln.l.RLock()
	defer ln.l.RUnlock()
	if nw, ok := ln.networks[nw]; ok {
		nw.l.RLock()
		defer nw.l.RUnlock()
		if sn, ok := nw.subnets[name]; ok {
			return sn.Subnet, nil
		}
	}
	return nil, fmt.Errorf("unknown subnet")
}

func (ln *networkManager) RegisterSubnet(ctx context.Context, nw string, sn api.Subnet) error {
	ln.l.RLock()
	defer ln.l.RUnlock()

	if nw := ln.networks[nw]; nw != nil {
		nw.l.Lock()
		defer nw.l.Unlock()
		if nw.subnets[sn.Name()] == nil {
			nw.subnets[sn.Name()] = &managedSubnet{
				ifaces: make(map[string]*managedIface),
				l:      sync.RWMutex{},
				Subnet: sn,
			}
		}
		nw.subnets[sn.Name()].Subnet = sn
		if nw.subnets[sn.Name()].attached {
			return ln.driver.RegisterSubnet(ctx, nw, sn)
		}
		return ln.driver.EnsureRouter(ctx, nw, sn)
	}

	return fmt.Errorf("unknown network")
}

func (ln *networkManager) RemoveSubnet(ctx context.Context, nw string, sn string) error {
	ln.l.RLock()
	defer ln.l.RUnlock()

	if nw := ln.networks[nw]; nw != nil {
		nw.l.Lock()
		defer nw.l.Unlock()
		if sn, ok := nw.subnets[sn]; ok {
			if err := ln.driver.RemoveSubnet(ctx, nw, sn); err != nil {
				return fmt.Errorf("unable to remove subnet - %w", err)
			}
		}
		delete(nw.subnets, sn)
		return nil
	}

	return fmt.Errorf("unknown network")
}

var _ api.SubnetManager = &networkManager{}
