package cmd

import (
	"crypto/tls"
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/davecgh/go-spew/spew"
	netplotv1 "github.com/ordiri/ordiri-netplot/gen/proto/netplot/v1"
	"github.com/ordiri/ordiri-netplot/gen/proto/netplot/v1/netplotv1connect"
	"github.com/ordiri/ordiri-netplot/pkg/collector"
	"github.com/spf13/cobra"
	"golang.org/x/net/http2"
)

// collectorCmd represents the collector command
var collectorCmd = &cobra.Command{
	Use:   "collector",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		if len(args) != 1 {
			return errors.New("missing interface")
		}

		machineId, err := cmd.Flags().GetString("machine-id")
		if err != nil {
			return err
		}

		if len(machineId) == 0 {
			return errors.New("missing machine-id")
		}

		ifaceNames := args[:]
		ifaces := []string{}

		if len(ifaceNames) == 1 && ifaceNames[0] == "all" {
			nifaces, err := net.Interfaces()
			if err != nil {
				return fmt.Errorf("error loading interfaces - %w", err)
			}
			for _, niface := range nifaces {
				ifaces = append(ifaces, niface.Name)
			}
		} else {
			ifaces = ifaceNames
		}

		cc := createColectorClient()
		fmt.Printf("limiting interfaces for collector to: %v\n", ifaces)

		pc := collector.NewCollector(collector.WithInterfaceFilter(ifaces...))
		if err != nil {
			return fmt.Errorf("watching network interfaces - %w", err)
		}

		ctx := cmd.Context()
		s := cc.StreamPacket(ctx)

		go func() {
			defer s.CloseRequest()
			for {
				msg, err := s.Receive()
				if err != nil {
					if !errors.Is(err, io.EOF) {
						spew.Dump("Got the error ", err, msg)
					}

					return
				}
				if msg.GetIfaceConfig() != nil && len(msg.GetIfaceConfig().GetIfaces()) > 0 {
					for _, iface := range msg.GetIfaceConfig().GetIfaces() {
						iface := iface
						if iface.Enabled {
							ifaceC := pc.Interface(iface.Interface)
							if !ifaceC.Running() {
								log.Printf("enabling interface %s\n", iface.Interface)
								if err := ifaceC.Start(); err != nil {
									panic(err)
								}
							}

						} else {
							pc.Interface(iface.Interface).Stop()
						}
					}
				}
			}
		}()

		streamIfaces := []*netplotv1.StreamPacketInterfaceConfiguration{}
		for _, iface := range ifaces {
			streamIfaces = append(streamIfaces, &netplotv1.StreamPacketInterfaceConfiguration{
				Interface: iface,
				Enabled:   false,
				Filter:    "",
			})
		}

		if err := s.Send(&netplotv1.StreamPacketRequest{
			Machine: machineId,
			Request: &netplotv1.StreamPacketRequest_IfaceConfig{
				IfaceConfig: &netplotv1.StreamPacketRequest_InterfaceConfigurationRequest{
					Ifaces: streamIfaces,
				},
			},
		}); err != nil {
			return fmt.Errorf("unable to send initial interface config - %w", err)
		}

		for p := range pc.Packets {
			fmt.Printf("packet: %v\n", p)

			s.Send(&netplotv1.StreamPacketRequest{
				Machine: machineId,
				Request: &netplotv1.StreamPacketRequest_Packets{
					Packets: &netplotv1.StreamPacketRequest_PacketStream{
						Packets: []*netplotv1.Packet{{
							Interface:  p.InterfaceName,
							Identifier: p.Identifier,
							Direction:  netplotv1.PacketDirection(p.Direction),
							Time:       p.Time.UnixMicro(),
							Raw:        p.Packet.Data(),
						}},
					},
				},
			})
		}

		fmt.Println("completed successfully")

		return nil
	},
}

func createColectorClient() netplotv1connect.NetplotServerServiceClient {
	tr := &http2.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	hc := &http.Client{Transport: tr}

	client := netplotv1connect.NewNetplotServerServiceClient(
		hc,
		"https://localhost:8096",
	)
	return client
}

func init() {
	hostname, err := os.Hostname()
	if err != nil {
		hostname = ""
	}
	collectorCmd.Flags().String("machine-id", hostname, "machine id")
	rootCmd.AddCommand(collectorCmd)
}
