package sdn

import (
	"fmt"

	"github.com/digitalocean/go-openvswitch/ovs"
)

/*
WorkloadEgress := newFlow([]&ovs.Flow{
	{
		Matches: []ovs.Match{ MatchInPort }
		Actions: []ovs.Action{ TagVlan }
	}
})

*/
type WorkloadEgress struct {
	Switch        string
	Port          string
	NodeLocalVlan int
}

func (wi *WorkloadEgress) Install(client *ovs.Client) error {
	ovsPort, err := client.OpenFlow.DumpPort(wi.Switch, wi.Port)
	if err != nil {
		return fmt.Errorf("unable to map get port information - %w", err)
	}

	return nil

	return client.OpenFlow.AddFlow(wi.Switch, &ovs.Flow{
		Matches: []ovs.Match{
			ovs.InPortMatch(ovsPort.PortID),
		},
		Actions: []ovs.Action{
			// ovs.ModVLANVID(wi.NodeLocalVlan),
			ovs.Normal(), // shoulhd go to all switch ports for subnet
		},
		Priority: 1,
	})
}

func (wi *WorkloadEgress) Remove(client *ovs.Client) error {
	ovsPort, err := client.OpenFlow.DumpPort(wi.Switch, wi.Port)
	if err != nil {
		return nil
	}

	return client.OpenFlow.DelFlows(wi.Switch, &ovs.MatchFlow{
		InPort: ovsPort.PortID,
	})
}

var _ FlowRule = &WorkloadEgress{}
