package manager

type NetworkManager interface {
	GetNetworks() []Network
	GetNetwork(name string) Network
}
