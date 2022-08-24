package sdn

import (
	"fmt"
	"net"
	"strings"

	"github.com/digitalocean/go-openvswitch/ovs"
	"inet.af/netaddr"
)

type Router struct {
	IP      netaddr.IP
	Segment int
	// The mac on the local iface
	DistributedMac net.HardwareAddr
	// the mac we masquerade as
	HostLocalMac net.HardwareAddr
	SubnetPorts  []string
	TunnelPorts  []string
}

func (wi *Router) rules() []FlowRule {
	rules := []FlowRule{}

	return rules
}

// Purposefully swallows errors
func (wi *Router) meshTunPorts(client *ovs.Client) []int {
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
func (wi *Router) installOutgoingRule(client *ovs.Client) error {

	egressMatches := []ovs.Match{
		ovs.DataLinkSource(wi.DistributedMac.String()),
	}
	egressActions := []ovs.Action{
		ovs.ModDataLinkSource(wi.HostLocalMac),
		ovs.Resubmit(0, OpenFlowTableTunnelEgressNodeUnicast),
	}

	return client.OpenFlow.AddFlow(TunnelSwitchName, &ovs.Flow{
		Table:    OpenFlowTableTunnelEgressNodeUnicast,
		Matches:  egressMatches,
		Actions:  egressActions,
		Priority: 5,
	})
}

func (wi *Router) installIncomingRule(client *ovs.Client) error {
	ingressMatches := []ovs.Match{
		ovs.DataLinkSource(wi.HostLocalMac.String()),
	}
	ingressActions := []ovs.Action{
		ovs.ModDataLinkSource(wi.DistributedMac),
		ovs.Normal(),
	}
	if len(wi.TunnelPorts) == 0 {
		// ingressActions = append(ingressActions, ovs.ResubmitPort(1))
	}
	return client.OpenFlow.AddFlow(WorkloadSwitchName, &ovs.Flow{
		Matches:  ingressMatches,
		Actions:  ingressActions,
		Table:    OpenFlowTableTunnelEgressNodeUnicast,
		Priority: 5,
	})
}

// func (wi *Router) installArpResponder(client *ovs.Client) error {
// 	arpResponder := &ArpResponder{
// 		Switch: TunnelSwitchName,
// 		Mac:    wi.HostLocalMac,
// 		Ip:     wi.IP,
// 		VlanId: wi.Segment,
// 	}

// 	return arpResponder.Install(client)
// }
func (wi *Router) Install(client *ovs.Client) error {
	// if err := wi.installArpResponder(client); err != nil {
	// 	return err
	// }
	return nil
	if err := wi.installOutgoingRule(client); err != nil {
		return err
	}
	if err := wi.installIncomingRule(client); err != nil {
		return err
	}
	for _, flow := range wi.rules() {
		if err := flow.Install(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

func (wi *Router) Remove(client *ovs.Client) error {
	for _, flow := range wi.rules() {
		if err := flow.Remove(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

var _ FlowRule = &Router{}
