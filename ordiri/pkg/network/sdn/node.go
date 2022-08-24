package sdn

import (
	"fmt"
	"strings"
	"time"

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
func (wi *Node) flows(inboundPort int) []FlowRule {
	flows := []FlowRule{
		FlowRuleFunc(WorkloadSwitchName, ovs.Flow{
			// Priority: 0,
			// Table:    OpenFlowTableEntrypoint,
			Actions: []ovs.Action{
				ovs.Normal(),
			},
		}),

		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 0,
			Table:    OpenFlowTableTunnelEntrypoint,
			Actions: []ovs.Action{
				ovs.Drop(),
			},
		}),

		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 1,
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
			Priority: 0,
			Table:    OpenFlowTableTunnelEgressNodeArp,
			Actions: []ovs.Action{
				// ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeMulticast),
				ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeVxlanTranslation),
			},
		}),
		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 0,
			Table:    OpenFlowTableTunnelEgressNodeMulticast,
			Matches:  []ovs.Match{},
			Actions: []ovs.Action{
				// ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeUnicast),
				ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeVxlanTranslation),
			},
		}),
		FlowRuleFunc(TunnelSwitchName, ovs.Flow{
			Priority: 0,
			Table:    OpenFlowTableTunnelEgressNodeUnicast,
			Matches:  []ovs.Match{},
			Actions: []ovs.Action{
				ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeVxlanTranslation),
			},
		}),
	}

	return flows
}

func (wi *Node) clean(client *ovs.Client, br string) error {
	err := client.OpenFlow.DelFlows(TunnelSwitchName, nil)
	if err != nil {
		return err
	}
	time.Sleep(time.Second * 2)
	return nil
}
func (wi *Node) Install(client *ovs.Client) error {

	vmPort, err := client.OpenFlow.DumpPort(TunnelSwitchName, "patch-vms")
	if err != nil {
		return err
	}

	if err := wi.clean(client, TunnelSwitchName); err != nil {
		return err
	}
	if err := wi.clean(client, WorkloadSwitchName); err != nil {
		return err
	}
	// Otherwise there is some weirdness with the flows restoring
	fmt.Print("Waiting 5 seconds for flows to be deleted\n")
	time.Sleep(time.Second * 5)

	for _, flow := range wi.flows(vmPort.PortID) {
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

	for _, flow := range wi.flows(vmPort.PortID) {
		if err := flow.Remove(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

var _ FlowRule = &Node{}
