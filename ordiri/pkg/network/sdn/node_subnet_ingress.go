package sdn

import (
	"github.com/digitalocean/go-openvswitch/ovs"
)

/*
NodeSubnetIngress := newFlow([]&ovs.Flow{
	{
		Matches: []ovs.Match{ MatchInPort }
		Actions: []ovs.Action{ TagVlan }
	}
})

*/
type NodeSubnetIngress struct {
	Switch        string
	NodeLocalVlan int
	TunnelId      uint64
}

func (sti *NodeSubnetIngress) Install(client *ovs.Client) error {

	return client.OpenFlow.AddFlow(sti.Switch, &ovs.Flow{
		Matches: []ovs.Match{
			ovs.TunnelID(sti.TunnelId),
		},
		Actions: []ovs.Action{
			ovs.ModVLANVID(sti.NodeLocalVlan),
			ovs.Flood(),
		},
		Priority: 1,
	})
}

func (sti *NodeSubnetIngress) Remove(client *ovs.Client) error {
	return client.OpenFlow.DelFlows(sti.Switch, &ovs.MatchFlow{
		Matches: []ovs.Match{
			ovs.TunnelID(sti.TunnelId),
		},
	})
}

var _ FlowRule = &NodeSubnetIngress{}
