package collector

import (
	"sync"

	"github.com/google/gopacket"
	"github.com/google/gopacket/pcap"
)

type ifaceCollector struct {
	iface   string
	c       chan Packet
	l       sync.Mutex
	running bool
	handle  *pcap.Handle
}

func (ic *ifaceCollector) Running() bool {
	return ic.running
}

func (ic *ifaceCollector) Stop() error {
	ic.l.Lock()
	defer ic.l.Unlock()
	if !ic.running {
		return nil
	}
	ic.running = false
	ic.handle.Close()
	ic.handle = nil
	return nil
}

func (ic *ifaceCollector) Start() error {
	ic.l.Lock()
	defer ic.l.Unlock()
	if ic.running {
		return nil
	}
	handle, err := pcap.OpenLive(ic.iface, defaultSnapLen, true, pcap.BlockForever)
	if err != nil {
		return err
	}
	ic.handle = handle

	source := gopacket.NewPacketSource(handle, handle.LinkType())

	go watchSource(ic.iface, source, ic.c)

	ic.running = true

	return nil
}
