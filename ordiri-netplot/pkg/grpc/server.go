package grpc

import (
	"context"
	"errors"
	"fmt"
	"io"
	"time"

	"github.com/bufbuild/connect-go"
	"github.com/davecgh/go-spew/spew"
	"github.com/gobwas/glob"
	netplotv1 "github.com/ordiri/ordiri-netplot/gen/proto/netplot/v1"
	"github.com/ordiri/ordiri-netplot/gen/proto/netplot/v1/netplotv1connect"
	"github.com/ordiri/ordiri-netplot/pkg/aggregator"
)

// NetplotServiceServer implements the PetStoreService API.
type NetplotServiceServer struct {
	netplotv1connect.UnimplementedNetplotServerServiceHandler
	agg *aggregator.Aggregator
}

func NewNetServiceServer(agg *aggregator.Aggregator) *NetplotServiceServer {
	return &NetplotServiceServer{
		agg: agg,
	}
}

func (s *NetplotServiceServer) StartMonitor(ctx context.Context) error {
	ticker := time.NewTicker(5 * time.Second)
	for {
		select {
		case <-ctx.Done():
			return nil
		case <-ticker.C:
			fmt.Print(s.agg.GetStats())
		}
	}
}

func globMatch(pattern, str string) bool {
	if pattern == str {
		return true
	}
	g, err := glob.Compile(pattern)
	if err != nil {
		return false
	}
	return g.Match(str)
}

func (s *NetplotServiceServer) ConfigureInterface(ctx context.Context, req *connect.Request[netplotv1.ConfigureInterfaceRequest]) (*connect.Response[netplotv1.ConfigureInterfaceResponse], error) {
	spew.Dump(req.Msg)
	sessions := s.agg.GlobSession(req.Msg.Machine)
	if len(sessions) == 0 {
		return nil, errors.New("session not found")
	}

	for _, sess := range sessions {
		for _, iface := range sess.IfaceConfig {
			if globMatch(req.Msg.Interface, iface.Name) {
				iface.Enabled = req.Msg.Enabled
				iface.Filter = req.Msg.Filter
			}
		}
	}
	return &connect.Response[netplotv1.ConfigureInterfaceResponse]{}, nil
}

// PutPet adds the pet associated with the given request into the PetStore.
func (s *NetplotServiceServer) StreamPacket(
	ctx context.Context,
	req *connect.BidiStream[netplotv1.StreamPacketRequest, netplotv1.StreamPacketResponse],
) error {
	session := s.agg.AddSession(req.Peer().Addr)
	defer s.agg.RemoveSession(req.Peer().Addr)

	go func() {
		ticker := time.NewTicker(500 * time.Millisecond)

		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				ifaces := []*netplotv1.StreamPacketInterfaceConfiguration{}
				for _, iface := range session.IfaceConfig {
					ifaces = append(ifaces, &netplotv1.StreamPacketInterfaceConfiguration{
						Interface: iface.Name,
						Enabled:   iface.Enabled,
						Filter:    iface.Filter,
					})
				}
				req.Send(&netplotv1.StreamPacketResponse{
					Response: &netplotv1.StreamPacketResponse_IfaceConfig{
						IfaceConfig: &netplotv1.StreamPacketResponse_InterfaceConfigurationResponse{
							Ifaces: ifaces,
						},
					},
				})
			}
		}
	}()

	for {
		msg, err := req.Receive()
		if errors.Is(err, io.EOF) {
			break
		}

		if msg.GetIfaceConfig() != nil && len(msg.GetIfaceConfig().GetIfaces()) > 0 {
			ifaces := []*aggregator.AggregatorIfaceConfig{}
			for _, iface := range msg.GetIfaceConfig().GetIfaces() {
				ifaces = append(ifaces, &aggregator.AggregatorIfaceConfig{
					Name:    iface.GetInterface(),
					Enabled: iface.GetEnabled(),
					Filter:  iface.GetFilter(),
				})
			}

			session.IfaceConfig = ifaces
		} else if msg.GetPackets() != nil && len(msg.GetPackets().GetPackets()) > 0 {
			for _, packet := range msg.GetPackets().GetPackets() {
				spew.Dump("got the packet", packet)
				// session.Recorder <- aggregator.Packet{
				// 	Identifier:    packet.GetIdentifier(),
				// 	InterfaceName: packet.GetInterface(),
				// 	Time:          packet.GetTime(),
				// 	Packet:        packet.GetPacket(),
				// }
			}
		}

		r := msg.GetRequest()
		spew.Dump(session, r)
		// packet := req.Msg().GetPacket().Raw
		// session.Recorder() <- collector.Packet{
		// 	Identifier:    req.Msg().GetSource(),
		// 	InterfaceName: req.Msg().GetPacket().GetInterface(),
		// 	Time:          time.UnixMilli(req.Msg().GetPacket().GetTime()),
		// 	Packet:        gopacket.NewPacket(packet, gopacket.LayerType(layers.LinkTypeEthernet), gopacket.Default),
		// }
	}

	return nil
}
