package sdn

import (
	"fmt"

	"github.com/digitalocean/go-openvswitch/ovs"
)

type SubnetMetadataServer struct {
	WorkloadSwitch string
	WorkloadPort   string
	MetadataPort   string
}

func (wi *SubnetMetadataServer) Install(client *ovs.Client) error {
	MetadataPort, err := client.OpenFlow.DumpPort(wi.WorkloadSwitch, wi.MetadataPort)
	if err != nil {
		return fmt.Errorf("unable to map get port information - %w", err)
	}
	WorkloadPort, err := client.OpenFlow.DumpPort(wi.WorkloadSwitch, wi.WorkloadPort)
	if err != nil {
		return fmt.Errorf("unable to map get port information - %w", err)
	}

	return client.OpenFlow.AddFlow(wi.WorkloadSwitch, &ovs.Flow{
		Protocol: ovs.ProtocolTCPv4,
		InPort:   WorkloadPort.PortID,
		Matches: []ovs.Match{
			ovs.NetworkDestination("169.254.169.254/32"),
		},
		Actions: []ovs.Action{
			// ovs.ModVLANVID(wi.NodeLocalVlan),
			ovs.Output(MetadataPort.PortID), // shoulhd go to all switch ports for subnet
		},
		Priority: 1000,
	})
}

func (wi *SubnetMetadataServer) Remove(client *ovs.Client) error {
	WorkloadPort, err := client.OpenFlow.DumpPort(wi.WorkloadSwitch, wi.WorkloadPort)
	if err != nil {
		return fmt.Errorf("unable to map get port information - %w", err)
	}
	return client.OpenFlow.DelFlows(wi.WorkloadSwitch, &ovs.MatchFlow{
		Protocol: ovs.ProtocolTCPv4,
		InPort:   WorkloadPort.PortID,
		Matches: []ovs.Match{
			ovs.NetworkDestination("169.254.169.254/32"),
		},
	})
}

var _ FlowRule = &SubnetMetadataServer{}
