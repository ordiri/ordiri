package network

import (
	"net"

	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network/api"
	"inet.af/netaddr"
)

type RouterOption func(*router) error

func WithDistributedMac(mac net.HardwareAddr) RouterOption {
	return func(r *router) error {
		r.distributedMac = mac
		return nil
	}
}
func WithLocalMac(mac net.HardwareAddr) RouterOption {
	return func(r *router) error {
		r.localMac = mac
		return nil
	}
}

func NewRouter(name string, ip netaddr.IPPrefix, segment int, opt ...RouterOption) (*router, error) {
	rtr := &router{
		name:    name,
		ip:      ip,
		segment: segment,
	}
	for _, f := range opt {
		if err := f(rtr); err != nil {
			return nil, err
		}
	}

	if len(rtr.localMac) == 0 {
		rtr.localMac = mac.Unicast()
	}

	if len(rtr.distributedMac) == 0 {
		rtr.distributedMac = mac.Unicast()
	}

	return rtr, nil
}

type router struct {
	// The name for this network
	name           string
	distributedMac net.HardwareAddr
	localMac       net.HardwareAddr
	segment        int
	ip             netaddr.IPPrefix
}

func (rtr *router) Name() string {
	return rtr.name
}

func (rtr *router) Mac() net.HardwareAddr {
	return rtr.localMac
}
func (rtr *router) GlobalMac() net.HardwareAddr {
	return rtr.distributedMac
}

func (rtr *router) IP() netaddr.IPPrefix {
	return rtr.ip
}

func (rtr *router) Segment() int {
	return rtr.segment
}

var _ api.Router = &router{}
