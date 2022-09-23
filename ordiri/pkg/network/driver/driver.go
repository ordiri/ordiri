package driver

import (
	"context"
	"fmt"

	"github.com/ordiri/ordiri/pkg/network/api"
)

type DriverInfo struct {
	Name    string
	Version string
}

func (di DriverInfo) String() string {
	return fmt.Sprintf("Driver: %s - Version: %s", di.Name, di.Version)
}

type Driver interface {
	Info() DriverInfo

	DetatchInterface(context.Context, api.Network, api.Subnet, api.Interface) error
	AttachInterface(context.Context, api.Network, api.Subnet, api.Interface) (string, error)

	RemoveRouter(context.Context, api.Network, api.Subnet, api.Router) error
	EnsureRouter(context.Context, api.Network, api.Subnet, api.Router) error

	RemoveSubnet(context.Context, api.Network, api.Subnet) error
	RegisterSubnet(context.Context, api.Network, api.Subnet) error

	RemoveNetwork(context.Context, api.Network) error
	RegisterNetwork(context.Context, api.Network) error
}

type RunnableDriver interface {
	Driver

	Start(context.Context) error
	Close() error
}
