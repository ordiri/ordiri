package api

import (
	"context"
	"net"

	"inet.af/netaddr"
)

type NetworkManager interface {
	HasNetwork(name string) bool
	GetNetwork(name string) Network
	EnsureNetwork(context.Context, Network) error
	RemoveNetwork(ctx context.Context, name string) error
}

type SubnetManager interface {
	HasSubnet(nw Network, name string) bool
	GetSubnet(nw Network, name string) Subnet
	EnsureSubnet(ctx context.Context, nw Network, sn Subnet) error
	RemoveSubnet(ctx context.Context, nw Network, name string) error
}

type RouterManager interface {
	HasRouter(nw Network, sn Subnet, name string) bool
	GetRouter(nw Network, sn Subnet, name string) Router
	EnsureRouter(ctx context.Context, nw Network, sn Subnet, rtr Router) error
	RemoveRouter(ctx context.Context, nw Network, sn Subnet, rtr Router) error
}
type InterfaceManager interface {
	HasInterface(nw Network, sn Subnet, name string) bool
	GetInterface(nw Network, sn Subnet, name string) Interface
	EnsureInterface(ctx context.Context, nw Network, sn Subnet, iface Interface) (string, error)
	RemoveInterface(ctx context.Context, nw Network, sn Subnet, iface Interface) error
}

type Manager interface {
	InterfaceManager
	RouterManager
	NetworkManager
	SubnetManager
}

type RunnableManager interface {
	Manager
	Start(context.Context) error
}

type Network interface {
	Tenant() string
	Name() string
	Cidr() netaddr.IPPrefix
	Segment() int64
	DnsRecords() map[netaddr.IP][]string

	WithDns(netaddr.IP, []string) bool
}

type Subnet interface {
	Tenant() string
	Name() string
	Cidr() netaddr.IPPrefix
	Segment() int
}

type Router interface {
	Name() string
	Segment() int
	GlobalMac() net.HardwareAddr
	Mac() net.HardwareAddr
	IP() netaddr.IPPrefix
	KnownMacs() map[netaddr.IP]net.HardwareAddr
	RegisterMac(netaddr.IP, net.HardwareAddr) bool
}

type Interface interface {
	Name() string
	Hostnames() []string
	Mac() net.HardwareAddr
	PrivateIp() []netaddr.IP
	PublicIp() []netaddr.IP
}
