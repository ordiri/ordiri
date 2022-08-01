package manager

type Subnet interface {
	GetName() string
	GetCidr() string
}
