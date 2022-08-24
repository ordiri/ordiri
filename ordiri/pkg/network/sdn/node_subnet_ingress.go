package sdn

import (
	"github.com/digitalocean/go-openvswitch/ovs"
	"inet.af/netaddr"
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
	NodeLocalVlan int
	TunnelId      int64
	Cidr          netaddr.IPPrefix
}

func (sti *NodeSubnetIngress) matches(client *ovs.Client) ([]ovs.Match, error) {
	matches := []ovs.Match{
		ovs.TunnelID(uint64(sti.TunnelId)),
		ovs.NetworkDestination(sti.Cidr.String()),
	}

	return matches, nil
}
func (sti *NodeSubnetIngress) Install(client *ovs.Client) error {
	actions := []ovs.Action{
		ovs.ModVLANVID(sti.NodeLocalVlan),
		ovs.Normal(),
	}

	matches, err := sti.matches(client)
	if err != nil {
		return err
	}

	return client.OpenFlow.AddFlow(TunnelSwitchName, &ovs.Flow{
		Table:    OpenFlowTableTunnelIngressNodeEntrypoint,
		Matches:  matches,
		Actions:  actions,
		Priority: 1,
	})
}

func (sti *NodeSubnetIngress) Remove(client *ovs.Client) error {

	matches, err := sti.matches(client)
	if err != nil {
		return err
	}
	return client.OpenFlow.DelFlows(TunnelSwitchName, &ovs.MatchFlow{
		Table:   OpenFlowTableTunnelIngressNodeEntrypoint,
		Matches: matches,
	})
}

var _ FlowRule = &NodeSubnetIngress{}
