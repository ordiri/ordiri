package network

import (
	"context"

	"github.com/ordiri/ordiri/network/api"
)

func (ln *networkManager) HasRouter(nw api.Network, sn api.Subnet, name string) bool {
	if _, ok := ln.routers[nw.Name()]; !ok {
		return false
	}

	if _, ok := ln.routers[nw.Name()][sn.Name()]; !ok {
		return false
	}

	routers := ln.routers[nw.Name()][sn.Name()]
	for _, rtr := range routers {
		if rtr.Name() == name {
			return true
		}
	}
	return false
}

func (ln *networkManager) GetRouter(nw api.Network, sn api.Subnet, name string) api.Router {
	if _, ok := ln.routers[nw.Name()]; ok {
		if _, ok := ln.routers[nw.Name()][sn.Name()]; ok {
			routers := ln.routers[nw.Name()][sn.Name()]
			for _, rtr := range routers {
				if rtr.Name() == name {
					return rtr
				}
			}
		}
	}

	panic("router does not exist")
}

func (ln *networkManager) EnsureRouter(ctx context.Context, nw api.Network, sn api.Subnet, rtr api.Router) error {
	ln.l.Lock()
	defer ln.l.Unlock()

	if err := ln.driver.EnsureRouter(ctx, nw, sn, rtr); err != nil {
		return err
	}

	if _, ok := ln.routers[nw.Name()]; !ok {
		ln.routers[nw.Name()] = make(map[string][]api.Router)
	}

	if _, ok := ln.routers[nw.Name()][sn.Name()]; !ok {
		ln.routers[nw.Name()][sn.Name()] = []api.Router{}
	}

	ln.routers[nw.Name()][sn.Name()] = append(ln.routers[nw.Name()][sn.Name()], rtr)

	return nil
}

func (ln *networkManager) RemoveRouter(ctx context.Context, nw api.Network, sn api.Subnet, rtr api.Router) error {
	ln.l.Lock()
	defer ln.l.Unlock()

	if _, ok := ln.routers[nw.Name()]; !ok {
		return nil
	}

	if _, ok := ln.routers[nw.Name()][sn.Name()]; !ok {
		return nil
	}

	rtrs := []api.Router{}
	for _, router := range rtrs {
		if router.Name() == rtr.Name() {
			continue
		}
		rtrs = append(rtrs, router)
	}
	ln.routers[nw.Name()][sn.Name()] = rtrs

	return nil
}
