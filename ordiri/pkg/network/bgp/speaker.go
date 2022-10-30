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

func NewSpeaker(routerId string, neighbourAsn uint32, neighbourAddr netaddr.IP) *Speaker {
	return &Speaker{
		routerId:        routerId,
		server:          server.NewBgpServer(),
		NeighbourAsn:    neighbourAsn,
		NeighborAddress: neighbourAddr,
	}
}

type Speaker struct {
	routerId string
	server   *server.BgpServer

	NeighborAddress netaddr.IP
	NeighbourAsn    uint32
}

func (s *Speaker) Announce(ctx context.Context, ip netaddr.IP, router netaddr.IP) error {
	// add routes
	nlri, _ := apb.New(&api.IPAddressPrefix{
		Prefix:    ip.String(),
		PrefixLen: 32,
	})

	a1, _ := apb.New(&api.OriginAttribute{
		Origin: 0,
	})
	a2, _ := apb.New(&api.NextHopAttribute{
		NextHop: router.String(),
	})

	// a3, _ := apb.New(&api.AsPathAttribute{
	// 	Segments: []*api.AsSegment{
	// 		{
	// 			Type:    2,
	// 			Numbers: []uint32{6762, 39919, 65000, 35753, 65000},
	// 		},
	// 	},
	// })
	// attrs := []*apb.Any{a1, a2, a3}
	attrs := []*apb.Any{a1, a2}

	_, err := s.server.AddPath(context.Background(), &api.AddPathRequest{
		Path: &api.Path{
			Family: &api.Family{Afi: api.Family_AFI_IP, Safi: api.Family_SAFI_UNICAST},
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
			Asn:      uint32(config.LocalAsn),
			RouterId: s.routerId,
		},
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
	}
	err := s.AddPolicy(ctx, api.Policy{
		Name: "unchanged-nexthop",
		Statements: []*api.Statement{
			{
				Name: "next-hop",
				Actions: &api.Actions{
					Nexthop: &api.NexthopAction{
						Self:      false,
						Unchanged: true,
					},
					RouteAction: api.RouteAction_ACCEPT,
				},
			},
		},
	})
	if err != nil {
		return fmt.Errorf("failed to create unchanged nexthop policy - %w", err)
	}

	err = s.AddPeerGroup(ctx, api.PeerGroup{
		Conf: &api.PeerGroupConf{
			PeerGroupName: "upstream-router",
			PeerAsn:       uint32(s.NeighbourAsn),
		},
		RouteReflector: &api.RouteReflector{
			RouteReflectorClient:    true,
			RouteReflectorClusterId: s.routerId,
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
