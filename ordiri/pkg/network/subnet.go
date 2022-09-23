package network

import (
	"github.com/ordiri/ordiri/pkg/network/api"
	"inet.af/netaddr"
)

type SubnetOption func(api.Subnet) error

func NewSubnet(name string, cidr string, segment int, opt ...SubnetOption) (api.Subnet, error) {
	ipnet, err := netaddr.ParseIPPrefix(cidr)
	if err != nil {
		return nil, err
	}
	s := &subnet{
		name:   name,
		cidr:   ipnet,
		vlanId: segment,
	}
	for _, f := range opt {
		if err := f(s); err != nil {
			return nil, err
		}
	}

	return s, nil
}

type subnet struct {
	name   string
	vlanId int
	hosts  []string
	cidr   netaddr.IPPrefix
}

func (s *subnet) Segment() int {
	return s.vlanId
}

func (s *subnet) Name() string {
	return s.name
}

func (s *subnet) Hosts() []string {
	return s.hosts
}

func (s *subnet) Cidr() netaddr.IPPrefix {
	return s.cidr.Masked()
}
