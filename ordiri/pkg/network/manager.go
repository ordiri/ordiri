package network

import (
	"context"
	"sync"

	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/driver"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

func NewManager(driver driver.Driver) (api.RunnableManager, error) {
	return &networkManager{
		driver:   driver,
		networks: []*managedNet{},
	}, nil
}

type managedSubnet struct {
	sn         api.Subnet
	routers    []api.Router
	interfaces []api.Interface
}

type managedNet struct {
	nw      api.Network
	subnets []*managedSubnet
}

type networkManager struct {
	networks []*managedNet
	// subnets    map[string][]api.Subnet
	// routers    map[string]map[string][]api.Router
	// interfaces map[string]map[string][]api.Interface
	driver driver.Driver

	l sync.Mutex
}

func (ln *networkManager) Close() error {
	if closer, isCloser := ln.driver.(driver.RunnableDriver); isCloser {
		if err := closer.Close(); err != nil {
			return err
		}
	}
	return nil
}

// Start a subscriber that listens for netlink events
// and stops when the context finishes
func (ln *networkManager) Start(ctx context.Context) error {
	log := log.FromContext(ctx)
	log.Info("Starting NetworkManager", "driver", ln.driver.Info().String())
	if starter, isStarter := ln.driver.(driver.RunnableDriver); isStarter {
		log.Info("Starting driver")
		if err := starter.Start(ctx); err != nil {
			log.Error(err, "Error encountered running driver")
			return err
		}
	}
	log.Info("Shutting down network manager")

	return nil
}

var _ api.Manager = &networkManager{}
