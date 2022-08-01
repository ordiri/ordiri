package manager

type Network interface {
	GetName() string
	GetCidr() string
	GetSubnets() string
}
