package api

import (
	"context"

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

type Manager interface {
	RouterManager
	NetworkManager
	SubnetManager
}

type RunnableManager interface {
	Manager
	Start(context.Context) error
}

type Network interface {
	Name() string
	Cidr() netaddr.IPPrefix
	Segment() int64
}

type Subnet interface {
	Name() string
	Cidr() netaddr.IPPrefix
	Segment() int
	// The name of all the hosts this subnet is deployed too
	Hosts() []string
}

type Router interface {
	Name() string
}
