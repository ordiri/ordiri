package network

import (
	"context"
	"fmt"

	"github.com/ordiri/ordiri/pkg/network/api"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

func (ln *networkManager) subnet(nw api.Network, name string) (*managedNet, *managedSubnet) {
	net := ln.network(nw.Name())
	if net == nil {
		return nil, nil
	}

	for _, sn := range net.subnets {
		if sn != nil && name == sn.sn.Name() {
			return net, sn
		}
	}
	return nil, nil
}

func (ln *networkManager) HasSubnet(nw api.Network, name string) bool {
	_, sn := ln.subnet(nw, name)
	return sn != nil
}

func (ln *networkManager) GetSubnet(nw api.Network, name string) api.Subnet {
	if _, sn := ln.subnet(nw, name); sn != nil {
		return sn.sn
	}

	panic("no such network " + name)
}

func (ln *networkManager) RemoveSubnet(ctx context.Context, nw api.Network, name string) error {
	ln.l.Lock()
	defer ln.l.Unlock()
	net, sn := ln.subnet(nw, name)
	if sn == nil {
		return nil
	}

	if len(sn.interfaces) > 0 || len(sn.routers) > 0 {
		return fmt.Errorf("subnet still has interfaces(%d) or routers(%d)", len(sn.interfaces), len(sn.routers))
	}

	if err := ln.driver.RemoveSubnet(ctx, nw, sn.sn); err != nil {
		return err
	}

	// sn.l.Lock()
	// defer sn.l.Unlock()

	sns := []*managedSubnet{}
	for _, msn := range net.subnets {
		if msn != sn {
			sns = append(sns, msn)
		}
	}
	net.subnets = sns

	return nil
}

func (ln *networkManager) EnsureSubnet(ctx context.Context, nw api.Network, sn api.Subnet) error {
	ln.l.Lock()
	defer ln.l.Unlock()
	log := log.FromContext(ctx)
	log.Info("ensuring subnet exists")
	if err := ln.driver.EnsureSubnet(ctx, nw, sn); err != nil {
		return err
	}

	net := ln.network(nw.Name())
	net.subnets = append(net.subnets, &managedSubnet{
		sn:         sn,
		routers:    []api.Router{},
		interfaces: []api.Interface{},
	})

	return nil
}

var _ api.Manager = &networkManager{}
