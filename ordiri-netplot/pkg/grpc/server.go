package grpc

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"time"

	"github.com/bufbuild/connect-go"
	"github.com/goccy/go-graphviz"

	"github.com/gobwas/glob"
	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
	netplotv1 "github.com/ordiri/ordiri-netplot/gen/proto/netplot/v1"
	"github.com/ordiri/ordiri-netplot/gen/proto/netplot/v1/netplotv1connect"
	"github.com/ordiri/ordiri-netplot/pkg/aggregator"
	"github.com/ordiri/ordiri-netplot/pkg/store"
)

// NetplotServiceServer implements the PetStoreService API.
type NetplotServiceServer struct {
	netplotv1connect.UnimplementedNetplotServerServiceHandler
	agg *aggregator.Aggregator
	db  *store.DbClient
}

func NewNetServiceServer(agg *aggregator.Aggregator, db *store.DbClient) *NetplotServiceServer {
	return &NetplotServiceServer{
		agg: agg,
		db:  db,
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

			eps := []*store.Endpoint{}
			err := s.db.NewSelect().Model(&eps).Relation("Sources").Relation("Targets").Scan(ctx)
			if err != nil {
				fmt.Printf("Error fetching endpoints: %v\n", err)
				continue
			}

			// eprs := []*store.EndpointRelation{}
			// if err := s.db.NewSelect().Model((*store.EndpointRelation)(nil)).Scan(ctx, &eprs); err != nil {
			// 	fmt.Printf("Error fetching endpoint relationships: %v\n", err)
			// 	continue
			// }
			gz := graphviz.New()
			g, err := gz.Graph()
			if err != nil {
				log.Fatal(err)
			}

			for _, ep := range eps {
				epId := "cluster_ep_" + ep.ID
				sub := g.SubGraph(epId, 1)

				epNode, err := sub.CreateNode(epId)
				if err != nil {
					return err
				}

				for _, src := range ep.Targets {
					srcId := fmt.Sprintf("ep:%s:ip:%s:port:%d", src.SourceID, src.SourceIp, src.SourcePort)
					dstId := fmt.Sprintf("ep:%s:ip:%s:port:%d", src.TargetID, src.TargetIp, src.TargetPort)

					srcNode, err := sub.CreateNode(srcId)
					if err != nil {
						return err
					}
					dstNode, err := sub.CreateNode(dstId)
					if err != nil {
						return err
					}

					if _, err := sub.CreateEdge("inbound", dstNode, epNode); err != nil {
						return err
					}

					if _, err := sub.CreateEdge("inbound", srcNode, dstNode); err != nil {
						return err
					}
				}
			}

			// 3. write to file directly
			if err := gz.RenderFilename(g, graphviz.PNG, "endpoint-graph.png"); err != nil {
				log.Fatal(err)
			}
			if err := g.Close(); err != nil {
				log.Fatal(err)
			}
			gz.Close()
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

	// Send a configuration message every 5 seconds
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
			for _, pkt := range msg.GetPackets().GetPackets() {
				packet := gopacket.NewPacket(pkt.Raw, layers.LinkTypeEthernet, gopacket.Default)

				session.Recorder() <- aggregator.AggregatedPacket{
					// InterfaceName: pkt.GetInterface(),
					// Identifier:    pkt.Identifier,
					// Time:          time.UnixMilli(pkt.Time),
					MachineId: msg.GetMachine(),
					Interface: pkt.Interface,
					Packet:    packet,
					Direction: aggregator.AggregatedPacketDirection(pkt.Direction),
				}
			}
		}

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
