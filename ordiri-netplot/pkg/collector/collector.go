package collector

import "sync"

type Collector struct {
	l       sync.Mutex
	ifaces  map[string]*ifaceCollector
	Packets chan Packet
}

type Option func(*Collector)

func WithInterfaceFilter(ifaces ...string) Option {
	return func(c *Collector) {
	}
}

func NewCollector(o ...Option) *Collector {
	c := &Collector{
		ifaces:  map[string]*ifaceCollector{},
		Packets: make(chan Packet),
	}
	for _, opt := range o {
		opt(c)
	}
	return c
}

func (c *Collector) Interface(iface string) *ifaceCollector {
	c.l.Lock()
	defer c.l.Unlock()
	if _, ok := c.ifaces[iface]; !ok {
		c.ifaces[iface] = &ifaceCollector{
			iface: iface,
			c:     make(chan Packet),
		}
	}

	return c.ifaces[iface]
}
