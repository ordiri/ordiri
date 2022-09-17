package network

import (
	"net"

	"github.com/ordiri/ordiri/pkg/mac"
	"github.com/ordiri/ordiri/pkg/network/api"
	"inet.af/netaddr"
)

type InterfaceOption func(*netInterface) error

func InterfaceWithMac(mac net.HardwareAddr) InterfaceOption {
	return func(ni *netInterface) error {
		ni.mac = mac
		return nil
	}
}
func InterfaceWithPrivateIps(ip ...netaddr.IP) InterfaceOption {
	return func(ni *netInterface) error {
		ni.privateIps = append(ni.privateIps, ip...)
		return nil
	}
}
func InterfaceWithPublicIps(ip ...netaddr.IP) InterfaceOption {
	return func(ni *netInterface) error {
		ni.publicIps = append(ni.privateIps, ip...)
		return nil
	}
}
func InterfaceWithHostnames(hostnames ...string) InterfaceOption {
	return func(ni *netInterface) error {
		ni.hostnames = append(ni.hostnames, hostnames...)
		return nil
	}
}

func NewInterface(name string, opt ...InterfaceOption) (api.Interface, error) {
	iface := &netInterface{
		name: name,
	}
	for _, f := range opt {
		if err := f(iface); err != nil {
			return nil, err
		}
	}
	if len(iface.mac) == 0 {
		iface.mac = mac.Unicast()
	}

	return iface, nil
}

type netInterface struct {
	name       string
	mac        net.HardwareAddr
	privateIps []netaddr.IP
	publicIps  []netaddr.IP
	hostnames  []string
}

func (ni *netInterface) Name() string {
	return ni.name
}

func (ni *netInterface) Mac() net.HardwareAddr {
	return ni.mac
}

func (ni *netInterface) PublicIp() []netaddr.IP {
	return ni.privateIps
}
func (ni *netInterface) PrivateIp() []netaddr.IP {
	return ni.privateIps
}
func (ni *netInterface) Hostnames() []string {
	return ni.hostnames
}

var _ api.Interface = &netInterface{}
