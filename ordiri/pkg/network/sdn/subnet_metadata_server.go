package sdn

import (
	"fmt"
	"net"

	"github.com/digitalocean/go-openvswitch/ovs"
	"inet.af/netaddr"
)

type MetadataServer struct {
	Switch       string
	WorkloadPort string
	MetadataPort string
	Mac          net.HardwareAddr
}

func (wi *MetadataServer) matches() []ovs.Match {
	matches := []ovs.Match{
		ovs.NetworkDestination("169.254.169.254/32"),
	}
	return matches
}

func (wi *MetadataServer) GetResponder() *ArpResponder {
	return &ArpResponder{
		Switch: wi.Switch,
		Mac:    wi.Mac,
		Ip:     netaddr.MustParseIP("169.254.169.254"),
	}
}
func (wi *MetadataServer) Install(client *ovs.Client) error {
	return nil
	if err := wi.GetResponder().Install(client); err != nil {
		return fmt.Errorf("error installing arp responder - %w", err)
	}
	MetadataPort, err := client.OpenFlow.DumpPort(wi.Switch, wi.MetadataPort)
	if err != nil {
		return fmt.Errorf("unable to map get port information - %w", err)
	}
	WorkloadPort, err := client.OpenFlow.DumpPort(wi.Switch, wi.WorkloadPort)
	if err != nil {
		return fmt.Errorf("unable to map get port information - %w", err)
	}

	return client.OpenFlow.AddFlow(wi.Switch, &ovs.Flow{
		Protocol: ovs.ProtocolTCPv4,
		InPort:   WorkloadPort.PortID,
		Matches:  wi.matches(),
		Actions: []ovs.Action{
			ovs.ModDataLinkDestination(wi.Mac),
			ovs.Output(MetadataPort.PortID), // shoulhd go to all switch ports for subnet
		},
		Priority: 1000,
	})
}

func (wi *MetadataServer) Remove(client *ovs.Client) error {
	if err := wi.GetResponder().Remove(client); err != nil {
		return fmt.Errorf("error installing arp responder - %w", err)
	}
	WorkloadPort, err := client.OpenFlow.DumpPort(wi.Switch, wi.WorkloadPort)
	if err != nil {
		return fmt.Errorf("unable to map get port information - %w", err)
	}
	return client.OpenFlow.DelFlows(wi.Switch, &ovs.MatchFlow{
		Protocol: ovs.ProtocolTCPv4,
		InPort:   WorkloadPort.PortID,
		Matches:  wi.matches(),
	})
}

var _ FlowRule = &MetadataServer{}
