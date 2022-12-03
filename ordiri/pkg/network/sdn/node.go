package sdn

import (
	"fmt"
	"strings"

	"github.com/digitalocean/go-openvswitch/ovs"
)

type Node struct {
}

// Purposefully swallows errors
func (wi *Node) meshTunPorts(client *ovs.Client) []int {
	ports, err := client.VSwitch.ListPorts(TunnelSwitchName)
	if err != nil {
		return nil
	}
	outputs := []int{}
	for _, portName := range ports {
		if strings.HasPrefix(portName, "mt-") {
			port, err := client.OpenFlow.DumpPort(TunnelSwitchName, portName)
			if err != nil {
				return nil
			}

			outputs = append(outputs, port.PortID)
		}
	}

	return outputs
}

func (wi *Node) tunnelFlows(inboundPort int) []FlowRule {
	flows := []FlowRule{
		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 0,
			Table:    OpenFlowTableTunnelEntrypoint,
			Actions: []ovs.Action{
				ovs.Drop(),
			},
		}),

		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 2,
			InPort:   inboundPort,
			Table:    OpenFlowTableTunnelEntrypoint,
			Actions: []ovs.Action{
				ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeEntrypoint),
			},
		}),

		&Classifier{
			Switch:         TunnelSwitchName,
			Table:          OpenFlowTableTunnelEgressNodeEntrypoint,
			ArpTable:       OpenFlowTableTunnelEgressNodeArp,
			UnicastTable:   OpenFlowTableTunnelEgressNodeUnicast,
			MulticastTable: OpenFlowTableTunnelEgressNodeMulticast,
		},

		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableTunnelEgressNodeArp,
			Actions: []ovs.Action{
				// ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeMulticast),
				ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeVxlanTranslation),
			},
		}),
		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableTunnelEgressNodeMulticast,
			Matches:  []ovs.Match{},
			Actions: []ovs.Action{
				// ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeUnicast),
				ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeVxlanTranslation),
			},
		}),
		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableTunnelEgressNodeUnicast,
			Matches:  []ovs.Match{},
			Actions: []ovs.Action{
				ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeVxlanTranslation),
			},
		}),

		&Classifier{
			Switch:         TunnelSwitchName,
			Table:          OpenFlowTableTunnelIngressNodeEntrypoint,
			ArpTable:       OpenFlowTableTunnelIngressNodeArp,
			UnicastTable:   OpenFlowTableTunnelIngressNodeUnicast,
			MulticastTable: OpenFlowTableTunnelIngressNodeMulticast,
		},

		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableTunnelIngressNodeArp,
			Actions: []ovs.Action{
				// ovs.Resubmit(0, OpenFlowTableTunnelIngressNodeMulticast),
				ovs.Resubmit(0, OpenFlowTableTunnelIngressNodeVxlanTranslation),
			},
		}),
		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableTunnelIngressNodeMulticast,
			Matches:  []ovs.Match{},
			Actions: []ovs.Action{
				// ovs.Resubmit(0, OpenFlowTableTunnelIngressNodeUnicast),
				ovs.Resubmit(0, OpenFlowTableTunnelIngressNodeVxlanTranslation),
			},
		}),
		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableTunnelIngressNodeUnicast,
			Matches:  []ovs.Match{},
			Actions: []ovs.Action{
				ovs.Resubmit(0, OpenFlowTableTunnelIngressNodeVxlanTranslation),
			},
		}),
	}

	return flows
}
func (wi *Node) workfloadFlows(inboundPort int) []FlowRule {
	flows := []FlowRule{
		// FlowRuleFunc(WorkloadSwitchName, ovs.Flow{
		// 	Priority: 0,
		// 	Table:    OpenFlowTableWorkloadEntrypoint,
		// 	Actions: []ovs.Action{
		// 		ovs.Normal(),
		// 	},
		// }),

		FlowRuleFunc(WorkloadSwitchName, ovs.Flow{
			Priority: 10,
			Table:    OpenFlowTableWorkloadEntrypoint,
			Actions: []ovs.Action{
				ovs.Resubmit(0, OpenFlowTableWorkloadVmEgressEntrypoint),
			},
		}),

		// // If it's conming from the tunnel, normal actions apply, otherwise drop any non unicast traffic
		FlowRuleFunc(WorkloadSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableWorkloadEntrypoint,
			Actions: []ovs.Action{
				ovs.Normal(),
			},
		}),

		&Classifier{
			Switch:         WorkloadSwitchName,
			Table:          OpenFlowTableWorkloadVmEgressEntrypoint,
			ArpTable:       OpenFlowTableWorkloadVmEgressArp,
			UnicastTable:   OpenFlowTableWorkloadVmEgressUnicast,
			MulticastTable: OpenFlowTableWorkloadVmEgressMulticast,
		},
		FlowRuleFunc(WorkloadSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableWorkloadVmEgressArp,
			Actions: []ovs.Action{
				ovs.Normal(), // Should go to an arp responder table so no need for neigh
			},
		}),

		FlowRuleFunc(WorkloadSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableWorkloadVmEgressUnicast,
			Actions: []ovs.Action{
				ovs.Normal(),
			},
		}),
		FlowRuleFunc(WorkloadSwitchName, ovs.Flow{
			Priority: 1,
			Table:    OpenFlowTableWorkloadVmEgressMulticast,
			Actions: []ovs.Action{
				ovs.Normal(), // Maybe we default drop and allow dhcp reqs and other things like that
			},
		}),
	}

	return flows
}

func (wi *Node) Install(client *ovs.Client) error {

	tunnelVmPort, err := client.OpenFlow.DumpPort(TunnelSwitchName, "patch-vms")
	if err != nil {
		return err
	}
	workloadTunnelPort, err := client.OpenFlow.DumpPort(WorkloadSwitchName, "patch-internal")
	if err != nil {
		return err
	}

	for _, flow := range wi.tunnelFlows(tunnelVmPort.PortID) {
		if err := flow.Install(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	for _, flow := range wi.workfloadFlows(workloadTunnelPort.PortID) {
		if err := flow.Install(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}

	return nil
}

func (wi *Node) Remove(client *ovs.Client) error {
	vmPort, err := client.OpenFlow.DumpPort(TunnelSwitchName, "patch-vms")
	if err != nil {
		return err
	}

	for _, flow := range wi.tunnelFlows(vmPort.PortID) {
		if err := flow.Remove(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	for _, flow := range wi.workfloadFlows(vmPort.PortID) {
		if err := flow.Remove(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

var _ FlowRule = &Node{}
