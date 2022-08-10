package network

import (
	"github.com/ordiri/ordiri/pkg/network/api"
	"inet.af/netaddr"
)

type NetworkOption func(api.Network) error

func NewNetwork(name string, cidr string, segment int64, opt ...NetworkOption) (api.Network, error) {
	ipnet, err := netaddr.ParseIPPrefix(cidr)
	if err != nil {
		return nil, err
	}
	nw := &network{
		name:    name,
		segment: segment,
		cidr:    ipnet,
	}
	for _, f := range opt {
		if err := f(nw); err != nil {
			return nil, err
		}
	}

	return nw, nil
}

type network struct {
	// The name for this network
	name string
	// segment is the globally unique tunnel identifier
	segment int64
	cidr    netaddr.IPPrefix
}

func (nw *network) Name() string {
	return nw.name
}
func (nw *network) Segment() int64 {
	return nw.segment
}
func (nw *network) Cidr() netaddr.IPPrefix {
	return nw.cidr.Masked()
}

var _ api.Network = &network{}
