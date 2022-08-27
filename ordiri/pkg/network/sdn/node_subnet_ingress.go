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
		ovs.NetworkDestination(sti.Cidr.String()),
		ovs.TunnelID(uint64(sti.TunnelId)),
	}

	return matches, nil
}

// We do this because we want to route traffic for multiple subnets over a single tunnel
// but each subnet is a seperate vlan (do we just make a single network share a vlan? was thinking)
// it's good for extra isolation but is it really?
func (sti *NodeSubnetIngress) Install(client *ovs.Client) error {
	vmPort, err := client.OpenFlow.DumpPort(TunnelSwitchName, "patch-vms")
	if err != nil {
		return err
	}

	actions := []ovs.Action{
		ovs.ModVLANVID(sti.NodeLocalVlan),
		ovs.Output(vmPort.PortID),
	}

	matches, err := sti.matches(client)
	if err != nil {
		return err
	}

	if err := client.OpenFlow.AddFlow(TunnelSwitchName, &ovs.Flow{
		Table:    OpenFlowTableTunnelIngressNodeVxlanTranslation,
		Matches:  matches,
		Actions:  actions,
		Priority: 2,
		Protocol: ovs.ProtocolIPv4,
	}); err != nil {
		return err
	}

	if err := client.OpenFlow.AddFlow(TunnelSwitchName, &ovs.Flow{
		Table:    OpenFlowTableTunnelIngressNodeVxlanTranslation,
		Matches:  matches,
		Actions:  actions,
		Priority: 2,
		Protocol: ovs.ProtocolICMPv4,
	}); err != nil {
		return err
	}
	if err := client.OpenFlow.AddFlow(TunnelSwitchName, &ovs.Flow{
		Table:    OpenFlowTableTunnelIngressNodeVxlanTranslation,
		Matches:  matches,
		Actions:  actions,
		Priority: 2,
		Protocol: ovs.ProtocolARP,
	}); err != nil {
		return err
	}
	if err := client.OpenFlow.AddFlow(TunnelSwitchName, &ovs.Flow{
		Table:    OpenFlowTableTunnelIngressNodeVxlanTranslation,
		Matches:  matches,
		Actions:  actions,
		Priority: 2,
		Protocol: ovs.ProtocolUDPv4,
	}); err != nil {
		return err
	}
	return nil
}

func (sti *NodeSubnetIngress) Remove(client *ovs.Client) error {

	matches, err := sti.matches(client)
	if err != nil {
		return err
	}
	return client.OpenFlow.DelFlows(TunnelSwitchName, &ovs.MatchFlow{
		Table:   OpenFlowTableTunnelIngressNodeVxlanTranslation,
		Matches: matches,
	})
}

var _ FlowRule = &NodeSubnetIngress{}
