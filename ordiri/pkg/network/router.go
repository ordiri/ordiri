package network

import (
	"net"

	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network/api"
	"inet.af/netaddr"
)

type RouterOption func(*router) error

func WithMac(mac net.HardwareAddr) RouterOption {
	return func(r *router) error {
		r.mac = mac
		return nil
	}
}

func NewRouter(name string, opt ...RouterOption) (api.Router, error) {
	rtr := &router{
		name: name,
	}
	for _, f := range opt {
		if err := f(rtr); err != nil {
			return nil, err
		}
	}

	if len(rtr.mac) == 0 {
		rtr.mac = mac.Unicast()
	}

	return rtr, nil
}

type router struct {
	// The name for this network
	name string
	mac  net.HardwareAddr
	ip   netaddr.IP
}

func (rtr *router) Name() string {
	return rtr.name
}

func (rtr *router) Mac() net.HardwareAddr {
	return rtr.mac
}

func (rtr *router) IP() netaddr.IP {
	return rtr.ip
}

var _ api.Router = &router{}
