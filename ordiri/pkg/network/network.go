package network

import (
	"net"

	"github.com/ordiri/ordiri/pkg/network/api"
	"inet.af/netaddr"
)

type NetworkOption func(*network) error

func WithNetworkDns(ip netaddr.IP, hostnames ...string) NetworkOption {
	return func(n *network) error {
		n.dnsRecordsets[ip] = hostnames
		return nil
	}
}

func NewNetwork(tenant string, name string, cidr string, segment int64, localSegment int64, opt ...NetworkOption) (*network, error) {
	ipnet, err := netaddr.ParseIPPrefix(cidr)
	if err != nil {
		return nil, err
	}
	nw := &network{
		tenant:        tenant,
		name:          name,
		segment:       segment,
		localSegment:  localSegment,
		cidr:          ipnet,
		dnsRecordsets: make(map[netaddr.IP][]string),
	}
	for _, f := range opt {
		if err := f(nw); err != nil {
			return nil, err
		}
	}

	return nw, nil
}

type network struct {
	tenant string
	// The name for this network
	name string
	// segment is the globally unique tunnel identifier
	segment       int64
	localSegment  int64
	cidr          netaddr.IPPrefix
	dnsRecordsets map[netaddr.IP][]string
	knownMacs     map[string][]netaddr.IP
}

func (nw *network) Name() string {
	return nw.name
}
func (nw *network) Tenant() string {
	return nw.tenant
}

func (nw *network) Segment() int64 {
	return nw.segment
}
func (nw *network) LocalSegment() int64 {
	return nw.localSegment
}

func (nw *network) Cidr() netaddr.IPPrefix {
	return nw.cidr.Masked()
}

func (nw *network) WithMacAddr(mac net.HardwareAddr, ips []netaddr.IP) bool {
	if len(ips) == 0 {
		delete(nw.knownMacs, mac.String())
		return false
	}
	nw.knownMacs[mac.String()] = append(nw.knownMacs[mac.String()], ips...)
	return true
}

func (nw *network) WithDns(ip netaddr.IP, hostnames []string) bool {
	if len(hostnames) == 0 {
		delete(nw.dnsRecordsets, ip)
		return false
	}
	nw.dnsRecordsets[ip] = hostnames
	return true
}

func (nw *network) DnsRecords() map[netaddr.IP][]string {
	return nw.dnsRecordsets
}

func (nw *network) MacAddrs() map[string][]netaddr.IP {
	return nw.knownMacs
}

var _ api.Network = &network{}
