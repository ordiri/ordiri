package sdn

import (
	"fmt"
	"net"

	"github.com/digitalocean/go-openvswitch/ovs"
	"inet.af/netaddr"
)

type ArpResponder struct {
	Switch   string
	Mac      net.HardwareAddr
	Ip       netaddr.IP
	VlanId   int
	Table    int
	Priority int
}

func (wi *ArpResponder) matches() []ovs.Match {
	matches := []ovs.Match{
		ovs.ARPTargetProtocolAddress(wi.Ip.String()),
	}
	if wi.VlanId > 0 {
		matches = append(matches, ovs.DataLinkVLAN(wi.VlanId))
	}
	return matches
}
func (wi *ArpResponder) Install(client *ovs.Client) error {
	priority := 0
	if wi.Priority > 0 {
		priority = wi.Priority
	}
	return client.OpenFlow.AddFlow(wi.Switch, &ovs.Flow{
		Protocol: ovs.ProtocolARP,
		Table:    wi.Table,
		Matches:  wi.matches(),
		Actions: []ovs.Action{
			// ovs.ModVLANVID(wi.NodeLocalVlan),
			ovs.Move("NXM_OF_ETH_SRC[]", "NXM_OF_ETH_DST[]"),
			ovs.ModDataLinkSource(wi.Mac),

			// Change type to reply
			ovs.Load("0x2", "NXM_OF_ARP_OP[]"),

			// Moe Source -> Target
			ovs.Move("NXM_NX_ARP_SHA[]", "NXM_NX_ARP_THA[]"),
			ovs.Move("NXM_OF_ARP_SPA[]", "NXM_OF_ARP_TPA[]"),

			// Set Source/Target to our known static Mac/IP pair
			ovs.Load(fmt.Sprintf("%#x", []byte(wi.Mac)), "NXM_NX_ARP_SHA[]"),
			ovs.Load(fmt.Sprintf("%#x", wi.Ip.As4()), "NXM_OF_ARP_SPA[]"),

			// Send it where it came from
			ovs.OutputField("in_port"),
		},
		Priority: priority,
	})
}

func (wi *ArpResponder) Remove(client *ovs.Client) error {
	return client.OpenFlow.DelFlows(wi.Switch, &ovs.MatchFlow{
		Protocol: ovs.ProtocolARP,
		// Table:    OpenFlowTableTunnelArpResponder,
		Matches: []ovs.Match{
			ovs.ARPTargetProtocolAddress(wi.Ip.String()),
		},
	})
}

var _ FlowRule = &ArpResponder{}
