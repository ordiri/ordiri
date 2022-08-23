package sdn

import (
	"fmt"

	"github.com/digitalocean/go-openvswitch/ovs"
)

type Node struct {
	WorkloadSwitch string
	TunnelSwitch   string
	ExternalSwitch string
}

func (wi *Node) rules() []FlowRule {
	rules := []FlowRule{
		// &MetadataServer{
		// 	Switch:       wi.WorkloadSwitch,
		// 	Mac:          wi.MetadataMac,
		// 	WorkloadPort: wi.WorkloadPort,
		// 	MetadataPort: wi.MetadataPort,
		// },
	}

	// for _, ip := range wi.Ips {
	// 	rules = append(rules, &ArpResponder{
	// 		Switch: wi.TunnelSwitch,
	// 		Mac:    wi.Mac,
	// 		Ip:     ip,
	// 		VlanId: wi.Segment,
	// 	})

	// 	if wi.StrictSourceDest {
	// 		rules = append(rules, &StaticPortEntry{
	// 			Switch:  wi.Switch,
	// 			Port:    wi.WorkloadPort,
	// 			Segment: wi.Segment,
	// 			MacAddr: wi.Mac,
	// 		})
	// 	}
	// }

	return rules
}

func (wi *Node) Install(client *ovs.Client) error {
	client.OpenFlow.DelFlows(wi.TunnelSwitch, &ovs.MatchFlow{})
	client.OpenFlow.DelFlows(wi.WorkloadSwitch, &ovs.MatchFlow{})
	client.OpenFlow.AddFlow(wi.WorkloadSwitch, &ovs.Flow{
		Priority: 0,
		Actions: []ovs.Action{
			ovs.Normal(),
		},
	})

	// client.OpenFlow.DelFlows(wi.ExternalSwitch, &ovs.MatchFlow{})

	for _, flow := range wi.rules() {
		if err := flow.Install(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

func (wi *Node) Remove(client *ovs.Client) error {
	for _, flow := range wi.rules() {
		if err := flow.Remove(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

var _ FlowRule = &Node{}
