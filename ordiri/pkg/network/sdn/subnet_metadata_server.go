package sdn

import (
	"fmt"
	"net"
	"strings"

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
		Priority: 10,
		Switch:   wi.Switch,
		Mac:      wi.Mac,
		Ip:       netaddr.MustParseIP("169.254.169.254"),
	}
}
func (wi *MetadataServer) Install(client *ovs.Client) error {
	// if err := wi.GetResponder().Install(client); err != nil {
	// 	return fmt.Errorf("error installing arp responder - %w", err)
	// }
	MetadataPort, err := client.OpenFlow.DumpPort(wi.Switch, wi.MetadataPort)
	if err != nil {
		return fmt.Errorf("unable to get metadata port information - %w", err)
	}
	WorkloadPort, err := client.OpenFlow.DumpPort(wi.Switch, wi.WorkloadPort)
	if err != nil {
		return fmt.Errorf("unable to get workload port information - %w", err)
	}

	if err := client.OpenFlow.AddFlow(wi.Switch, &ovs.Flow{
		Protocol: ovs.ProtocolIPv4,
		InPort:   WorkloadPort.PortID,
		Matches:  wi.matches(),
		Actions: []ovs.Action{
			ovs.ModDataLinkDestination(wi.Mac),
			ovs.Output(MetadataPort.PortID), // shoulhd go to all switch ports for subnet
		},
		Table:    OpenFlowTableWorkloadVmEgressUnicast,
		Priority: 10,
	}); err != nil {
		return err
	}
	return nil
}

func (wi *MetadataServer) Remove(client *ovs.Client) error {
	// if err := wi.GetResponder().Remove(client); err != nil {
	// 	return fmt.Errorf("error installing arp responder - %w", err)
	// }
	WorkloadPort, err := client.OpenFlow.DumpPort(wi.Switch, wi.WorkloadPort)
	if err != nil {
		if strings.Contains(err.Error(), "unknown port") {
			return nil
		}
		return fmt.Errorf("unable to map get port information - %w", err)
	}
	return client.OpenFlow.DelFlows(wi.Switch, &ovs.MatchFlow{
		Protocol: ovs.ProtocolTCPv4,
		InPort:   WorkloadPort.PortID,
		Matches:  wi.matches(),
	})
}

var _ FlowRule = &MetadataServer{}
