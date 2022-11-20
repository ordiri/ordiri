package network

import (
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
func WithExternalGatewayIp(ip netaddr.IPPrefix) NetworkOption {
	return func(n *network) error {
		if ip.IP().Is4() {
			n.externalGatewayIp = ip
		} else if ip.IP().Is6() {
			n.externalGatewayIp6 = ip
		}
		return nil
	}
}
func WithMgmtIp(ip netaddr.IPPrefix) NetworkOption {
	return func(n *network) error {
		if ip.IP().Is4() {
			n.mgmtIp = ip
		} else if ip.IP().Is6() {
			n.mgmtIp6 = ip
		}
		return nil
	}
}

func NewNetwork(tenant string, name string, cidr string, cidr6 string, segment int64, localSegment int64, opt ...NetworkOption) (*network, error) {
	ipnet, err := netaddr.ParseIPPrefix(cidr)
	if err != nil {
		return nil, err
	}
	ipnet6, err := netaddr.ParseIPPrefix(cidr6)
	if err != nil {
		return nil, err
	}
	nw := &network{
		tenant:        tenant,
		name:          name,
		segment:       segment,
		localSegment:  localSegment,
		cidr:          ipnet,
		cidr6:         ipnet6,
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
	// The name for this network
	tenant string
	// The name for this network
	name string
	// segment is the globally unique tunnel identifier
	segment            int64
	localSegment       int64
	cidr               netaddr.IPPrefix
	cidr6              netaddr.IPPrefix
	externalGatewayIp  netaddr.IPPrefix
	externalGatewayIp6 netaddr.IPPrefix
	mgmtIp             netaddr.IPPrefix
	mgmtIp6            netaddr.IPPrefix
	dnsRecordsets      map[netaddr.IP][]string
}

func (nw *network) Tenant() string {
	return nw.tenant
}

func (nw *network) Name() string {
	return nw.name
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

func (nw *network) Cidr6() netaddr.IPPrefix {
	return nw.cidr6.Masked()
}

func (nw *network) WithDns(ip netaddr.IP, hostnames []string) bool {
	if len(hostnames) == 0 {
		delete(nw.dnsRecordsets, ip)
		return false
	}

	nw.dnsRecordsets[ip] = append(nw.dnsRecordsets[ip], hostnames...)
	return true
}

func (nw *network) DnsRecords() map[netaddr.IP][]string {
	return nw.dnsRecordsets
}

func (nw *network) ExternalIp() netaddr.IPPrefix {
	return nw.externalGatewayIp
}

func (nw *network) ExternalIp6() netaddr.IPPrefix {
	return nw.externalGatewayIp6
}
func (nw *network) MgmtIp() netaddr.IPPrefix {
	return nw.mgmtIp
}
func (nw *network) MgmtIp6() netaddr.IPPrefix {
	return nw.mgmtIp6
}

var _ api.Network = &network{}
