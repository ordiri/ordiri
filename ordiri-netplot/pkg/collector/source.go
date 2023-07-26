package collector

import (
	"bytes"
	"fmt"
	"net"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/google/gopacket"
	_ "github.com/google/gopacket/layers"
)

const (
	// The same default as tcpdump.
	defaultSnapLen = 262144
)

type PacketDirection int

const (
	PacketDirectionInbound PacketDirection = iota
	PacketDirectionOutbound
)

type Packet struct {
	InterfaceName string
	Identifier    string
	Direction     PacketDirection
	Time          time.Time
	Packet        gopacket.Packet
}

func watchSource(name string, mac net.HardwareAddr, source *gopacket.PacketSource, pc chan Packet) error {
	packets := source.Packets()
	for pkt := range packets {
		fmt.Printf("handling packet")
		id, err := identifierForPacket(pkt)
		if err != nil {
			spew.Dump("Error getting identifier", err, pkt)
			continue
		}

		dir := PacketDirectionInbound
		if pkt.LinkLayer() != nil {
			srcMac, _ := net.ParseMAC(pkt.LinkLayer().LinkFlow().Src().String())
			if bytes.Equal(srcMac, mac) {
				// This is an outbound packet.
				dir = PacketDirectionOutbound
			}
		}

		pc <- Packet{
			InterfaceName: name,
			Identifier:    id,
			Direction:     dir,

			Time: pkt.Metadata().Timestamp,

			Packet: pkt,
		}
	}

	return nil
}
