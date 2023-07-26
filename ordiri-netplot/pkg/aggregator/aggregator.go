package aggregator

import (
	"fmt"
	"net"
	"strconv"
	"sync"

	"github.com/gobwas/glob"
	"github.com/google/gopacket"
)

type AggregatedPacketDirection int

const (
	AggregatedPacketDirectionInbound AggregatedPacketDirection = iota
	AggregatedPacketDirectionOutbound
)

type AggregatedPacket struct {
	gopacket.Packet

	MachineId string
	Interface string
	Direction AggregatedPacketDirection
}

type (
	Aggregator struct {
		sessions map[string]*AggregatorSession
		l        sync.Mutex
		Packets  chan AggregatedPacket
	}

	PacketSource struct {
		Machine   string
		Interface string
		Ip        net.IP
		Mac       net.HardwareAddr
		Port      int64
	}
)

func (ps PacketSource) String() string {
	return fmt.Sprintf("%s:%s:%d", ps.Ip.String(), ps.Mac.String(), ps.Port)
}

func (ap *AggregatedPacket) GetSource() PacketSource {
	srcIp := net.IPv4zero
	srcMac := net.HardwareAddr{}
	srcPort := int64(0)

	if ap.NetworkLayer() != nil {
		srcIp = net.ParseIP(ap.NetworkLayer().NetworkFlow().Src().String())
	}

	if ap.LinkLayer() != nil {
		mac, err := net.ParseMAC(ap.LinkLayer().LinkFlow().Src().String())
		if err != nil {
			fmt.Printf("Error parsing dst mac: %v\n", err)
		} else {
			srcMac = mac
		}
	}

	if ap.TransportLayer() != nil {
		if num, err := strconv.Atoi(ap.TransportLayer().TransportFlow().Src().String()); err == nil {
			srcPort = int64(num)
		}
	}

	return PacketSource{
		Ip:   srcIp,
		Mac:  srcMac,
		Port: srcPort,
	}
}

func (ap *AggregatedPacket) GetDestination() PacketSource {
	dstIp := net.IPv4zero
	dstMac := net.HardwareAddr{}
	dstPort := int64(0)

	if ap.LinkLayer() != nil {
		mac, err := net.ParseMAC(ap.LinkLayer().LinkFlow().Dst().String())
		if err != nil {
			fmt.Printf("Error parsing dst mac: %v\n", err)
		} else {
			dstMac = mac
		}
	}
	if ap.NetworkLayer() != nil {
		dstIp = net.ParseIP(ap.NetworkLayer().NetworkFlow().Dst().String())
	}

	if ap.TransportLayer() != nil {
		if num, err := strconv.Atoi(ap.TransportLayer().TransportFlow().Dst().String()); err == nil {
			dstPort = int64(num)
		}
	}

	return PacketSource{
		Ip:   dstIp,
		Mac:  dstMac,
		Port: dstPort,
	}
}

func (a *Aggregator) GetStats() string {
	str := "Stats:\n---\nSessions:\n"
	for name, sess := range a.sessions {
		str += fmt.Sprintf("%s: \n", name)
		for _, iface := range sess.IfaceConfig {
			str += fmt.Sprintf("\t%s: %v\n", iface.Name, iface.Enabled)
		}
		str += "\n"
	}
	str += "---\n"

	return str
}

func (a *Aggregator) RemoveSession(id string) {
	a.l.Lock()
	defer a.l.Unlock()
	if sess, ok := a.sessions[id]; ok {
		sess.Stop()
		delete(a.sessions, id)
	}
}

func (a *Aggregator) GlobSession(pattern string) []*AggregatorSession {
	a.l.Lock()
	defer a.l.Unlock()
	g, err := glob.Compile(pattern)
	if err != nil {
		return nil
	}
	matching := []*AggregatorSession{}
	for id, sess := range a.sessions {
		if g.Match(id) {
			matching = append(matching, sess)
		}
	}
	return matching
}

func (a *Aggregator) GetSession(id string) *AggregatorSession {
	a.l.Lock()
	defer a.l.Unlock()
	if sess, ok := a.sessions[id]; ok {
		return sess
	}
	return nil
}

func (a *Aggregator) AddSession(id string) *AggregatorSession {
	a.l.Lock()
	defer a.l.Unlock()

	if as, ok := a.sessions[id]; ok {
		return as
	}

	as := &AggregatorSession{
		pc:          make(chan AggregatedPacket),
		IfaceConfig: []*AggregatorIfaceConfig{},
	}

	go func() {
		for p := range as.pc {
			a.Packets <- p
		}
	}()
	a.sessions[id] = as
	return as
}

func NewAggregator() *Aggregator {
	return &Aggregator{
		sessions: make(map[string]*AggregatorSession),
		Packets:  make(chan AggregatedPacket),
	}
}
