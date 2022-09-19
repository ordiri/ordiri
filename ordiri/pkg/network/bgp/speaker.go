package bgp

import (
	"context"

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
			Asn:      65001,
			RouterId: s.routerId,
			// ListenPort: -1, // gobgp won't listen on tcp:179
		},
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
	}

	if err := s.server.AddPeer(context.Background(), &api.AddPeerRequest{
		Peer: &api.Peer{
			Conf: &api.PeerConf{
				NeighborAddress: s.NeighborAddress.String(),
				PeerAsn:         uint32(s.NeighbourAsn),
			},
		},
	}); err != nil {
		return err
	}

	// monitor the change of the peer state
	if err := s.server.WatchEvent(context.Background(), &api.WatchEventRequest{Peer: &api.WatchEventRequest_Peer{}}, func(r *api.WatchEventResponse) {
		s.server.Log().Info(r.String(), nil)
	}); err != nil {
		s.server.Log().Error(err.Error(), nil)
		return err
	}

	<-ctx.Done()
	s.server.Stop()
	return nil
}
