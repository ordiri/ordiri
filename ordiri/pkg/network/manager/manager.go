package manager

type SubnetManager interface {
	GetSubnets() []Network
	GetSubnet(name string) Subnet
	AddSubnet(Subnet) error
	RemoveSubnet(Subnet) error
}
type NetworkManager interface {
	GetNetworks() []Network
	GetNetwork(name string) Network
	AddNetwork(Network) error
	RemoveNetwork(Network) error
}
