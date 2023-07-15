package collector

import (
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/google/gopacket"
	_ "github.com/google/gopacket/layers"
)

const (
	// The same default as tcpdump.
	defaultSnapLen = 262144
)

type Packet struct {
	InterfaceName string
	Identifier    string
	Src           gopacket.Endpoint
	Dst           gopacket.Endpoint
	Time          time.Time
	Packet        gopacket.Packet
}

func watchSource(name string, source *gopacket.PacketSource, pc chan Packet) error {
	packets := source.Packets()
	for pkt := range packets {
		id, err := identifierForPacket(pkt)
		if err != nil {
			spew.Dump("Error getting identifier", err, pkt)
			continue
		}
		src, dst, err := endpointsForPacket(pkt)
		if err != nil {
			spew.Dump("Error getting src/dst", err, pkt)
			continue
		}

		pc <- Packet{
			InterfaceName: name,
			Identifier:    id,
			Src:           src,
			Dst:           dst,
			Time:          pkt.Metadata().Timestamp,
			Packet:        pkt,
		}
	}

	return nil
}
