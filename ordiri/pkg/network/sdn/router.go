package sdn

import (
	"fmt"
	"net"

	"github.com/digitalocean/go-openvswitch/ovs"
)

type Router struct {
	GlobalMac   net.HardwareAddr
	LocalMac    net.HardwareAddr
	SubnetPorts []string
	TunnelPorts []string
}

func (wi *Router) rules() []FlowRule {
	rules := []FlowRule{}

	return rules
}

func (wi *Router) Install(client *ovs.Client) error {
	ingressActions := []ovs.Action{
		ovs.ModDataLinkSource(wi.GlobalMac),
	}
	egressActions := []ovs.Action{
		ovs.ModDataLinkSource(wi.LocalMac),
	}
	if len(wi.SubnetPorts) == 0 {
		ingressActions = append(egressActions, ovs.Normal())
	}
	if len(wi.TunnelPorts) == 0 {
		egressActions = append(egressActions, ovs.Normal())
	}
	for _, p := range wi.SubnetPorts {
		port, err := client.OpenFlow.DumpPort(WorkloadSwitchName, p)
		if err != nil {
			return err
		}
		ingressActions = append(ingressActions, ovs.Output(port.PortID))
	}
	if err := client.OpenFlow.AddFlow(TunnelSwitchName, &ovs.Flow{
		Matches: []ovs.Match{
			ovs.DataLinkSource(wi.LocalMac.String()),
		},
		Actions:  ingressActions,
		Priority: 5,
	}); err != nil {
		return err
	}
	if err := client.OpenFlow.AddFlow(WorkloadSwitchName, &ovs.Flow{
		Matches: []ovs.Match{
			ovs.DataLinkSource(wi.GlobalMac.String()),
		},
		Actions:  egressActions,
		Priority: 5,
	}); err != nil {
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
