package sdn

import "github.com/digitalocean/go-openvswitch/ovs"

type FlowRule interface {
	Install(*ovs.Client) error
	Remove(*ovs.Client) error
}

type funcFlowRule struct {
	bridge string
	flow   ovs.Flow
}

func (ffr *funcFlowRule) Install(c *ovs.Client) error {
	return c.OpenFlow.AddFlow(ffr.bridge, &ffr.flow)
}
func (ffr *funcFlowRule) Remove(c *ovs.Client) error {
	return c.OpenFlow.DelFlows(ffr.bridge, ffr.flow.MatchFlow())
}
func FlowRuleFunc(bridge string, flow ovs.Flow) FlowRule {
	return &funcFlowRule{
		bridge: bridge,
		flow:   flow,
	}
}
