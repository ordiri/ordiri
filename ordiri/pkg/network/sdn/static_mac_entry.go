package sdn

import (
	"fmt"
	"net"

	"github.com/digitalocean/go-openvswitch/ovs"
)

/*
Creates a static mapping between a VLAN/Destination MAC addr and the OpenFlow port
hosting that item
*/
type StaticPortEntry struct {
	Switch  string
	Port    string
	Segment int
	MacAddr net.HardwareAddr
}

func (sme *StaticPortEntry) matches() []ovs.Match {
	return []ovs.Match{
		ovs.DataLinkDestination(sme.MacAddr.String()),
		ovs.DataLinkVLAN(sme.Segment),
	}
}
func (sme *StaticPortEntry) Install(client *ovs.Client) error {
	staticOutputPort, err := client.OpenFlow.DumpPort(sme.Switch, sme.Port)
	if err != nil {
		return fmt.Errorf("unable to get port information - %w", err)
	}

	return client.OpenFlow.AddFlow(sme.Switch, &ovs.Flow{
		Matches: sme.matches(),
		Actions: []ovs.Action{
			ovs.Output(staticOutputPort.PortID),
		},
		Priority: OpenFlowPriorityStaticPortEntry,
	})
}

func (sme *StaticPortEntry) Remove(client *ovs.Client) error {
	return client.OpenFlow.DelFlows(sme.Switch, &ovs.MatchFlow{
		Matches: sme.matches(),
	})
}

var _ FlowRule = &StaticPortEntry{}
