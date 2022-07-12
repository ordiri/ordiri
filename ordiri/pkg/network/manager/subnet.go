package manager

type Subnet interface {
	*Network
	GetName() string
	GetCidr() string
}
