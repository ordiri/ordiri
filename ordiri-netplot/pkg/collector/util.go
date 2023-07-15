package collector

import (
	"fmt"

	"github.com/google/gopacket"
)

func identifierForPacket(pkt gopacket.Packet) (string, error) {
	nl := pkt.NetworkLayer()
	nfs := ""
	if nl != nil {
		nfs = nl.NetworkFlow().String()
	}
	ll := pkt.LinkLayer()
	lfs := ""
	if ll != nil {
		lfs = ll.LinkFlow().String()
	}

	return fmt.Sprintf("%s:%s", nfs, lfs), nil
}

func endpointsForPacket(pkt gopacket.Packet) (gopacket.Endpoint, gopacket.Endpoint, error) {
	nl := pkt.NetworkLayer()
	if nl != nil {
		return pkt.NetworkLayer().NetworkFlow().Src(), pkt.NetworkLayer().NetworkFlow().Dst(), nil
	}
	ll := pkt.LinkLayer()
	if ll != nil {
		return ll.LinkFlow().Src(), ll.LinkFlow().Dst(), nil
	}
	return gopacket.InvalidEndpoint, gopacket.InvalidEndpoint, fmt.Errorf("missing link layer")
}
