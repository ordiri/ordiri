package api

import (
	"context"
	"net"

	"github.com/ordiri/ordiri/pkg/network/bgp"
	"inet.af/netaddr"
)

type NetworkManager interface {
	GetSpeaker() *bgp.Speaker
	GetNetwork(name string) (Network, error)
	RegisterNetwork(ctx context.Context, nw Network) error
	RemoveNetwork(ctx context.Context, nw string) error
}

type SubnetManager interface {
	GetSubnet(nw string, name string) (Subnet, error)
	RegisterSubnet(ctx context.Context, nw string, sn Subnet) error
	RemoveSubnet(ctx context.Context, nw string, sn string) error
}

type InterfaceManager interface {
	GetInterface(nw string, sn string, name string) (Interface, error)
	RegisterInterface(ctx context.Context, nw string, sn string, iface Interface) error
	AttachInterface(ctx context.Context, nw string, sn string, iface Interface) (string, error)
	RemoveInterface(ctx context.Context, nw string, sn string, ifaceName string) error
}

type Manager interface {
	InterfaceManager
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
	Cidr6() netaddr.IPPrefix
	Segment() int64
	MgmtIp() netaddr.IPPrefix
	MgmtIp6() netaddr.IPPrefix
	ExternalIp() netaddr.IPPrefix
	ExternalIp6() netaddr.IPPrefix
	DnsRecords() map[netaddr.IP][]string

	WithDns(netaddr.IP, []string) bool
}

type Subnet interface {
	Name() string
	Cidr() netaddr.IPPrefix
	Cidr6() netaddr.IPPrefix
	Segment() int
	RouterGlobalMac() net.HardwareAddr
	RouterMac() net.HardwareAddr
	KnownMacs() map[netaddr.IP]net.HardwareAddr
	RegisterMac(netaddr.IP, net.HardwareAddr) bool
}

type Router interface {
	Name() string
	Segment() int
	GlobalMac() net.HardwareAddr
	Mac() net.HardwareAddr
	IP() netaddr.IPPrefix
	IP6() netaddr.IPPrefix
	KnownMacs() map[netaddr.IP]net.HardwareAddr
	RegisterMac(netaddr.IP, net.HardwareAddr) bool
}

type Interface interface {
	Name() string
	Hostnames() []string
	Mac() net.HardwareAddr
	PrivateIp() []netaddr.IPPrefix
	PublicIp() []netaddr.IPPrefix
}
