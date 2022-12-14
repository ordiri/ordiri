package bgp

import (
	"context"
	"fmt"
	"strings"

	"github.com/ordiri/ordiri/config"
	api "github.com/osrg/gobgp/v3/api"
	"github.com/osrg/gobgp/v3/pkg/server"

	apb "google.golang.org/protobuf/types/known/anypb"
	"inet.af/netaddr"
)

func NewSpeaker(routerId string, neighbourAsn uint32, neighbourAddr netaddr.IP, listenAddr netaddr.IP) *Speaker {
	return &Speaker{
		routerId:        routerId,
		listenAddr:      listenAddr,
		server:          server.NewBgpServer(),
		NeighbourAsn:    neighbourAsn,
		NeighborAddress: neighbourAddr,
	}
}

type Speaker struct {
	routerId   string
	server     *server.BgpServer
	listenAddr netaddr.IP

	NeighborAddress netaddr.IP
	NeighbourAsn    uint32
}

func (s *Speaker) Announce(ctx context.Context, ip netaddr.IPPrefix, router netaddr.IP) error {
	// add routes
	len := uint32(ip.Bits())

	nlri, _ := apb.New(&api.IPAddressPrefix{
		Prefix:    ip.IP().String(),
		PrefixLen: len,
	})

	a1, _ := apb.New(&api.OriginAttribute{
		Origin: 0,
	})

	attrs := []*apb.Any{a1}
	if router.Is6() {
		v6Attrs, err := apb.New(&api.MpReachNLRIAttribute{
			Family: &api.Family{
				Afi:  api.Family_AFI_IP6,
				Safi: api.Family_SAFI_UNICAST,
			},
			NextHops: []string{router.String()},
			Nlris:    []*apb.Any{nlri},
		})
		if err != nil {
			return err
		}
		attrs = append(attrs, v6Attrs)
	} else {

		a2, err := apb.New(&api.NextHopAttribute{
			NextHop: router.String(),
		})
		if err != nil {
			return err
		}
		attrs = append(attrs, a2)
	}

	family := &api.Family{Safi: api.Family_SAFI_UNICAST}
	if ip.IP().Is6() {
		family.Afi = api.Family_AFI_IP6
	} else {
		family.Afi = api.Family_AFI_IP
	}

	_, err := s.server.AddPath(context.Background(), &api.AddPathRequest{
		Path: &api.Path{
			Family: family,
			Nlri:   nlri,
			Pattrs: attrs,
		},
	})

	return err
}

func (s *Speaker) AddPeer(ctx context.Context, conf api.PeerConf) error {
	// neighbor configuration
	peer := &api.Peer{
		Conf: &conf,
	}

	if err := s.server.AddPeer(context.Background(), &api.AddPeerRequest{
		Peer: peer,
	}); err != nil {
		if strings.Contains(err.Error(), "can't overwrite the existing peer") {
			return nil
		}
		s.server.Log().Error(err.Error(), nil)
		return err
	}
	return nil
}
func (s *Speaker) AddDynamicNeighbor(ctx context.Context, conf api.DynamicNeighbor) error {
	// neighbor configuration

	if err := s.server.AddDynamicNeighbor(context.Background(), &api.AddDynamicNeighborRequest{
		DynamicNeighbor: &conf,
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
		return err
	}
	return nil
}
func (s *Speaker) AddPeerGroup(ctx context.Context, conf api.PeerGroup) error {
	// neighbor configuration

	if err := s.server.AddPeerGroup(context.Background(), &api.AddPeerGroupRequest{
		PeerGroup: &conf,
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
		return err
	}
	return nil
}
func (s *Speaker) AddPolicy(ctx context.Context, conf api.Policy) error {
	// neighbor configuration
	if err := s.server.AddPolicy(context.Background(), &api.AddPolicyRequest{
		Policy: &conf,
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
		return err
	}
	return nil
}

func (s *Speaker) Start(ctx context.Context) error {
	go s.server.Serve()

	// global configuration
	if err := s.server.StartBgp(context.Background(), &api.StartBgpRequest{
		Global: &api.Global{
			Asn:             uint32(config.LocalAsn),
			RouterId:        s.routerId,
			ListenAddresses: []string{s.listenAddr.String()},
		},
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
	}

	err := s.AddPeerGroup(ctx, api.PeerGroup{
		Conf: &api.PeerGroupConf{
			PeerGroupName: "upstream-router",
			PeerAsn:       uint32(s.NeighbourAsn),
		},

		RouteReflector: &api.RouteReflector{
			RouteReflectorClient:    true,
			RouteReflectorClusterId: s.routerId,
		},
		Transport: &api.Transport{
			LocalAddress: s.listenAddr.String(),
		},
		AfiSafis: []*api.AfiSafi{
			{
				Config: &api.AfiSafiConfig{
					Family: &api.Family{
						Afi:  api.Family_AFI_IP,
						Safi: api.Family_SAFI_UNICAST,
					},
				},
			},
			{
				Config: &api.AfiSafiConfig{
					Family: &api.Family{
						Afi:  api.Family_AFI_IP6,
						Safi: api.Family_SAFI_UNICAST,
					},
				},
			},
		},
	})

	if err != nil {
		return fmt.Errorf("error registering upstream BGP peer group - %w", err)
	}

	if err := s.AddPeer(context.Background(), api.PeerConf{
		NeighborAddress: s.NeighborAddress.String(),
		PeerGroup:       "upstream-router",
	}); err != nil {
		return err
	}

	// monitor the change of the peer & routing state
	if err := s.server.WatchEvent(context.Background(), &api.WatchEventRequest{Peer: &api.WatchEventRequest_Peer{}}, func(r *api.WatchEventResponse) {
		s.server.Log().Info("got bgp peer data: "+r.String(), nil)
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
		return err
	}

	// monitor the change of the peer & routing state
	if err := s.server.WatchEvent(context.Background(), &api.WatchEventRequest{Table: &api.WatchEventRequest_Table{
		Filters: []*api.WatchEventRequest_Table_Filter{
			{
				Type: api.WatchEventRequest_Table_Filter_BEST,
			},
			{
				Type: api.WatchEventRequest_Table_Filter_POST_POLICY,
			},
		},
	}}, func(r *api.WatchEventResponse) {
		s.server.Log().Info("got bgp table data: "+r.String(), nil)
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
		return err
	}

	<-ctx.Done()
	s.server.Stop()
	return nil
}
