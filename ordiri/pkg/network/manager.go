package network

import (
	"context"
	"fmt"
	"sync"

	"github.com/ordiri/ordiri/config"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/bgp"
	"github.com/ordiri/ordiri/pkg/network/driver"
	apipb "github.com/osrg/gobgp/v3/api"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

type managedNet struct {
	api.Network
	l        sync.RWMutex
	subnets  map[string]*managedSubnet
	attached bool
}

type managedSubnet struct {
	api.Subnet
	l        sync.RWMutex
	ifaces   map[string]*managedIface
	attached bool
}

type managedIface struct {
	api.Interface
	attached bool
}

func NewManager(speaker *bgp.Speaker, driver driver.Driver) (api.RunnableManager, error) {
	return &networkManager{
		driver:   driver,
		speaker:  speaker,
		networks: make(map[string]*managedNet),
		l:        sync.RWMutex{},
	}, nil
}

type networkManager struct {
	driver   driver.Driver
	speaker  *bgp.Speaker
	networks map[string]*managedNet
	l        sync.RWMutex
}

func (ln *networkManager) GetSpeaker() *bgp.Speaker {
	return ln.speaker
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

	err := ln.speaker.AddPeerGroup(ctx, apipb.PeerGroup{
		Conf: &apipb.PeerGroupConf{
			PeerGroupName: "cloud-routers",
			PeerAsn:       uint32(config.CloudRouterAsn),
		},
		AfiSafis: []*apipb.AfiSafi{
			{
				Config: &apipb.AfiSafiConfig{
					Family: &apipb.Family{
						Afi:  apipb.Family_AFI_IP,
						Safi: apipb.Family_SAFI_UNICAST,
					},
				},
			},
			{
				Config: &apipb.AfiSafiConfig{
					Family: &apipb.Family{
						Afi:  apipb.Family_AFI_IP6,
						Safi: apipb.Family_SAFI_UNICAST,
					},
				},
			},
		},
	})

	if err := ln.speaker.AddDynamicNeighbor(ctx, apipb.DynamicNeighbor{
		Prefix:    config.NetworkInternetGatewayV6Cidr.String(),
		PeerGroup: "cloud-routers",
	}); err != nil {
		return fmt.Errorf("error adding tenant network BGP peer - %w", err)
	}

	if err != nil {
		return fmt.Errorf("error registering cloud router BGP peer group - %w", err)
	}

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
