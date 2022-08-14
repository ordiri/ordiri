package network

import (
	"context"

	"github.com/ordiri/ordiri/pkg/network/api"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

func (ln *networkManager) subnet(nw api.Network, name string) api.Subnet {
	for _, sn := range ln.subnets[nw.Name()] {
		if sn.Name() == name {
			return sn
		}
	}
	return nil
}

func (ln *networkManager) HasSubnet(nw api.Network, name string) bool {
	return ln.subnet(nw, name) != nil
}

func (ln *networkManager) GetSubnet(nw api.Network, name string) api.Subnet {
	if sn := ln.subnet(nw, name); sn != nil {
		return sn
	}

	panic("no such network " + name)
}

func (ln *networkManager) RemoveSubnet(ctx context.Context, nw api.Network, name string) error {
	subnet := ln.GetSubnet(nw, name)
	for _, iface := range ln.interfaces[nw.Name()][name] {
		if err := ln.RemoveInterface(ctx, nw, subnet, iface); err != nil {
			// todo error types
			// return err
		}
	}

	ln.l.Lock()
	defer ln.l.Unlock()

	if err := ln.driver.RemoveSubnet(ctx, nw, subnet); err != nil {
		return err
	}

	sns := []api.Subnet{}
	for _, sn := range ln.subnets[nw.Name()] {
		if sn.Name() == name {
			continue
		}
		sns = append(sns, sn)
	}
	ln.subnets[nw.Name()] = sns
	return nil
}

func (ln *networkManager) EnsureSubnet(ctx context.Context, nw api.Network, sn api.Subnet) error {
	log := log.FromContext(ctx)
	log.Info("ensuring subnet exists")
	ln.l.Lock()
	defer ln.l.Unlock()
	if err := ln.driver.EnsureSubnet(ctx, nw, sn); err != nil {
		return err
	}

	if !ln.HasSubnet(nw, sn.Name()) {
		if ln.subnets[nw.Name()] == nil {
			ln.subnets[nw.Name()] = []api.Subnet{}
		}

		ln.subnets[nw.Name()] = append(ln.subnets[nw.Name()], sn)
	}
	return nil
}

var _ api.Manager = &networkManager{}
