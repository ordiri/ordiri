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
type StaticMacEntry struct {
	Switch  string
	Port    string
	Segment int
	MacAddr net.HardwareAddr
}

func (sme *StaticMacEntry) Install(client *ovs.Client) error {
	staticOutputPort, err := client.OpenFlow.DumpPort(sme.Switch, sme.Port)
	if err != nil {
		return fmt.Errorf("unable to get port information - %w", err)
	}

	return client.OpenFlow.AddFlow(sme.Switch, &ovs.Flow{
		Matches: []ovs.Match{
			ovs.DataLinkDestination(sme.MacAddr.String()),
			ovs.DataLinkVLAN(sme.Segment),
		},
		Actions: []ovs.Action{
			ovs.Output(staticOutputPort.PortID),
		},
		Priority: 1,
	})
}

func (sme *StaticMacEntry) Remove(client *ovs.Client) error {
	return client.OpenFlow.DelFlows(sme.Switch, &ovs.MatchFlow{
		Matches: []ovs.Match{
			ovs.DataLinkDestination(sme.MacAddr.String()),
			ovs.DataLinkVLAN(sme.Segment),
		},
	})
}

var _ FlowRule = &StaticMacEntry{}
