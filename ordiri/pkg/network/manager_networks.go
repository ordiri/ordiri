package network

import (
	"context"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *networkManager) List(ctx context.Context) []api.Network {
	nws := []api.Network{}
	// nwMap := map[int32]Network{}
	// for _, iface := range ln.interfaces {
	// 	masterTxt := ""
	// 	if iface.Attributes.Master != nil {
	// 		masterTxt = fmt.Sprintf("%d@", *iface.Attributes.Master)
	// 	}
	// 	if _, ok := nwMap[iface.Attributes.NsId]; !ok {
	// 		nsName := ln.ns[iface.Attributes.NsId]
	// 		if nsName == "" {
	// 			nsName = "default"
	// 		}
	// 		nw, err := NewNetwork(nsName)
	// 		if err != nil {
	// 			panic(err)
	// 		}
	// 		nwMap[iface.Attributes.NsId] = nw
	// 	}

	// 	subnet, err := NewSubnet(iface.Name())
	// 	if err != nil {
	// 		panic(err)
	// 	}
	// 	nwMap[iface.Attributes.NsId].AddSubnet(subnet)

	// 	fmt.Printf("Got the iface %s%s(%d)\n", masterTxt, iface.Name(), iface.Attributes.NsId)
	// }
	// spew.Dump(nwMap)
	return nws
}

func (ln *networkManager) HasNetwork(name string) bool {
	return ln.network(name) != nil
}

func (ln *networkManager) GetNetwork(name string) api.Network {
	if nw := ln.network(name); nw != nil {
		return nw
	}

	panic("no such network " + name)
}

func (ln *networkManager) RemoveNetwork(ctx context.Context, name string) error {
	nw := ln.GetNetwork(name)

	for _, subnet := range ln.subnets[nw.Name()] {
		if err := ln.RemoveSubnet(ctx, nw, subnet.Name()); err != nil {
			return err
		}
	}

	ln.l.Lock()
	defer ln.l.Unlock()

	if err := ln.driver.RemoveNetwork(ctx, nw); err != nil {
		return err
	}
	nws := []api.Network{}
	for _, nw := range ln.networks {
		if nw.Name() == name {
			continue
		}
		nws = append(nws, nw)
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
		ln.networks = append(ln.networks, nw)
	}

	return nil
}
