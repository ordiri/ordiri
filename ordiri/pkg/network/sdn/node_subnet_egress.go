package sdn

import (
	"strings"

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
	NodeLocalVlan int
	TunnelId      int64
}

func (ste *NodeSubnetEgress) Install(client *ovs.Client) error {
	matches := []ovs.Match{
		ovs.DataLinkVLAN(ste.NodeLocalVlan),
	}
	outputs := []ovs.Action{
		ovs.StripVLAN(),
		ovs.SetTunnel(uint64(ste.TunnelId)),
	}

	ports, err := client.VSwitch.ListPorts(TunnelSwitchName)
	if err != nil {
		return err
	}
	for _, portName := range ports {
		if strings.HasPrefix(portName, "mt-") {
			port, err := client.OpenFlow.DumpPort(TunnelSwitchName, portName)
			if err != nil {
				return err
			}

			outputs = append(outputs, ovs.Output(port.PortID))
		}
	}

	return client.OpenFlow.AddFlow(TunnelSwitchName, &ovs.Flow{
		Table:    OpenFlowTableTunnelEgressNodeVxlanTranslation,
		Matches:  matches,
		Actions:  outputs,
		Priority: 1,
	})
}

func (ste *NodeSubnetEgress) Remove(client *ovs.Client) error {
	return client.OpenFlow.DelFlows(TunnelSwitchName, &ovs.MatchFlow{
		Table: OpenFlowTableTunnelEgressNodeVxlanTranslation,
		Matches: []ovs.Match{
			ovs.DataLinkVLAN(ste.NodeLocalVlan),
		},
	})
}

var _ FlowRule = &NodeSubnetEgress{}
