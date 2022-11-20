package network

import (
	"net"

	"github.com/ordiri/ordiri/pkg/network/api"
	"inet.af/netaddr"
)

type SubnetOption func(api.Subnet) error

func NewSubnet(name string, cidr string, cidr6 string, segment int, routerMac, hostLocalMac net.HardwareAddr, opt ...SubnetOption) (api.Subnet, error) {
	ipnet, err := netaddr.ParseIPPrefix(cidr)
	if err != nil {
		return nil, err
	}
	ipnet6, err := netaddr.ParseIPPrefix(cidr6)
	if err != nil {
		return nil, err
	}
	s := &subnet{
		name:            name,
		cidr:            ipnet,
		cidr6:           ipnet6,
		vlanId:          segment,
		routerGlobalMac: hostLocalMac,
		routerMac:       routerMac,
		knownMacs:       map[netaddr.IP]net.HardwareAddr{},
	}
	for _, f := range opt {
		if err := f(s); err != nil {
			return nil, err
		}
	}

	return s, nil
}

type subnet struct {
	name            string
	vlanId          int
	hosts           []string
	cidr            netaddr.IPPrefix
	cidr6           netaddr.IPPrefix
	routerGlobalMac net.HardwareAddr
	routerMac       net.HardwareAddr
	knownMacs       map[netaddr.IP]net.HardwareAddr
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
func (s *subnet) RouterGlobalMac() net.HardwareAddr {
	return s.routerGlobalMac
}
func (s *subnet) RouterMac() net.HardwareAddr {
	return s.routerMac
}

func (sn *subnet) RegisterMac(ip netaddr.IP, mac net.HardwareAddr) bool {
	if _mac, ok := sn.knownMacs[ip]; ok && _mac.String() == mac.String() {
		return false
	}

	sn.knownMacs[ip] = mac

	return true
}
func (sn *subnet) KnownMacs() map[netaddr.IP]net.HardwareAddr {
	return sn.knownMacs
}
func (s *subnet) Cidr() netaddr.IPPrefix {
	return s.cidr.Masked()
}
func (s *subnet) Cidr6() netaddr.IPPrefix {
	return s.cidr6.Masked()
}

var _ api.Subnet = &subnet{}
