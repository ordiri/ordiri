package network

import (
	"context"
	"fmt"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *networkManager) HasRouter(nw api.Network, sn api.Subnet, name string) bool {
	_, subnet := ln.subnet(nw, sn.Name())
	if subnet == nil {
		return false
	}
	routers := subnet.routers
	for _, rtr := range routers {
		if rtr.Name() == name {
			return true
		}
	}
	return false
}

func (ln *networkManager) GetRouter(nw api.Network, sn api.Subnet, name string) api.Router {
	_, subnet := ln.subnet(nw, sn.Name())
	if subnet == nil {
		return nil
	}
	routers := subnet.routers
	for _, rtr := range routers {
		if rtr.Name() == name {
			return rtr
		}
	}
	return nil
}

func (ln *networkManager) EnsureRouter(ctx context.Context, nw api.Network, sn api.Subnet, rtr api.Router) error {
	_, subnet := ln.subnet(nw, sn.Name())
	if subnet == nil {
		return fmt.Errorf("subnet does not exist")
	}
	// subnet.l.Lock()
	// defer subnet.l.Unlock()

	if err := ln.driver.EnsureRouter(ctx, nw, sn, rtr); err != nil {
		return err
	}
	subnet.l.Lock()
	defer subnet.l.Unlock()

	for i, _rtr := range subnet.routers {
		if rtr.Name() == _rtr.Name() {
			subnet.routers[i] = rtr
			return nil
		}
	}
	subnet.routers = append(subnet.routers, rtr)

	return nil
}

func (ln *networkManager) RemoveRouter(ctx context.Context, nw api.Network, sn api.Subnet, rtr api.Router) error {
	_, subnet := ln.subnet(nw, sn.Name())
	if subnet == nil {
		return fmt.Errorf("subnet does not exist")
	}
	// subnet.l.Lock()
	// defer subnet.l.Unlock()

	if err := ln.driver.RemoveRouter(ctx, nw, sn, rtr); err != nil {
		return err
	}

	subnet.l.Lock()
	defer subnet.l.Unlock()

	rtrs := []api.Router{}
	for _, _rtr := range subnet.routers {
		if _rtr.Name() == rtr.Name() {
			continue
		}
		rtrs = append(rtrs, _rtr)
	}
	subnet.routers = rtrs

	return nil
}
