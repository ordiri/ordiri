package sdn

import (
	"github.com/digitalocean/go-openvswitch/ovs"
)

/*
NodeSubnetEgress := newFlow([]&ovs.Flow{
	{
		Matches: []ovs.Match{ MatchInPort }
		Actions: []ovs.Action{ TagVlan }
	}
})

*/
type NodeSubnetEgress struct {
	Switch        string
	NodeLocalVlan int
	TunnelId      int64
}

func (ste *NodeSubnetEgress) Install(client *ovs.Client) error {
	return client.OpenFlow.AddFlow(ste.Switch, &ovs.Flow{
		Matches: []ovs.Match{
			ovs.DataLinkVLAN(ste.NodeLocalVlan),
		},
		Actions: []ovs.Action{
			ovs.StripVLAN(),
			ovs.SetTunnel(uint64(ste.TunnelId)),
			ovs.Normal(),
		},
		Priority: 1,
	})
}

func (ste *NodeSubnetEgress) Remove(client *ovs.Client) error {
	return client.OpenFlow.DelFlows(ste.Switch, &ovs.MatchFlow{
		Matches: []ovs.Match{
			ovs.DataLinkVLAN(ste.NodeLocalVlan),
		},
	})
}

var _ FlowRule = &NodeSubnetEgress{}
