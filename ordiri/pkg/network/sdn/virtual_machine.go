package sdn

import (
	"fmt"
	"net"

	"github.com/digitalocean/go-openvswitch/ovs"
	"inet.af/netaddr"
)

type VirtualMachine struct {
	WorkloadSwitch   string
	WorkloadPort     string
	RouterPort       string
	MetadataPort     string
	MetadataMac      net.HardwareAddr
	Mac              net.HardwareAddr
	PrivateIps       []netaddr.IPPrefix
	Segment          int
	StrictSourceDest bool
}

func (wi *VirtualMachine) rules() []FlowRule {
	rules := []FlowRule{
		&MetadataServer{
			Switch:       wi.WorkloadSwitch,
			Mac:          wi.MetadataMac,
			WorkloadPort: wi.WorkloadPort,
			MetadataPort: wi.MetadataPort,
		},
	}

	// for _, ip := range wi.Ips {
	// 	rules = append(rules, &ArpResponder{
	// 		Priority: 10,
	// 		Switch:   wi.WorkloadSwitch,
	// 		Mac:      wi.Mac,
	// 		Ip:       ip,
	// 		VlanId:   wi.Segment,
	// 	})
	// }

	// 	// if wi.StrictSourceDest {
	// 	// 	rules = append(rules, &StaticPortEntry{
	// 	// 		Switch:  wi.WorkloadSwitch,
	// 	// 		Port:    wi.WorkloadPort,
	// 	// 		Segment: wi.Segment,
	// 	// 		MacAddr: wi.Mac,
	// 	// 	})
	// 	// }
	// }

	return rules
}
func (wi *VirtualMachine) blockOutgoingSolicitationsRule(client *ovs.Client) error {
	routerPort, err := client.OpenFlow.DumpPort(wi.WorkloadSwitch, wi.RouterPort)
	if err != nil {
		return fmt.Errorf("unable to get metadata port information - %w", err)
	}
	workloadPort, err := client.OpenFlow.DumpPort(wi.WorkloadSwitch, wi.WorkloadPort)
	if err != nil {
		return fmt.Errorf("unable to get metadata port information - %w", err)
	}
	egressMatches := []ovs.Match{
		ovs.ICMP6Type(133),
	}
	egressActions := []ovs.Action{
		ovs.Output(routerPort.PortID),
	}

	return client.OpenFlow.AddFlow(WorkloadSwitchName, &ovs.Flow{
		Protocol: ovs.ProtocolICMPv6,
		InPort:   workloadPort.PortID,
		Table:    OpenFlowTableWorkloadVmEgressEntrypoint,
		Matches:  egressMatches,
		Actions:  egressActions,
		Priority: 100,
	})
}

func (wi *VirtualMachine) Install(client *ovs.Client) error {
	if err := wi.blockOutgoingSolicitationsRule(client); err != nil {
		return fmt.Errorf("unable to block ip6 - %w", err)
	}
	for _, flow := range wi.rules() {
		if err := flow.Install(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

func (wi *VirtualMachine) Remove(client *ovs.Client) error {
	for _, flow := range wi.rules() {
		if err := flow.Remove(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

var _ FlowRule = &VirtualMachine{}
