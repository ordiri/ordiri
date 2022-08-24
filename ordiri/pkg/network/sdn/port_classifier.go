package sdn

import (
	"github.com/digitalocean/go-openvswitch/ovs"
)

type Classifier struct {
	// Which switch to apply the flow rules too
	Switch string
	// The table to add the flow rules too
	Table int
	// Where to send arp traffic
	ArpTable int
	// Where to send unicast traffic
	UnicastTable int
	// Where to send multicast traffic
	MulticastTable int
}

func (c *Classifier) flows() []FlowRule {
	return []FlowRule{
		FlowRuleFunc(c.Switch, ovs.Flow{
			Priority: 1,
			Table:    c.Table,
			Protocol: ovs.ProtocolARP,
			Matches: []ovs.Match{
				ovs.DataLinkDestination("ff:ff:ff:ff:ff:ff"),
			},
			Actions: []ovs.Action{
				ovs.Resubmit(0, c.ArpTable),
			},
		}),
		FlowRuleFunc(c.Switch, ovs.Flow{
			Priority: 1,
			Table:    c.Table,
			Matches: []ovs.Match{
				ovs.DataLinkDestination("01:00:00:00:00:00/01:00:00:00:00:00"),
			},
			Actions: []ovs.Action{
				ovs.Resubmit(0, c.MulticastTable),
			},
		}),
		FlowRuleFunc(c.Switch, ovs.Flow{
			Priority: 1,
			Table:    c.Table,
			Matches: []ovs.Match{
				ovs.DataLinkDestination("00:00:00:00:00:00/01:00:00:00:00:00"),
			},
			Actions: []ovs.Action{
				ovs.Resubmit(0, c.UnicastTable),
			},
		}),
	}
}
func (c *Classifier) Install(client *ovs.Client) error {
	for _, flow := range c.flows() {
		if err := flow.Install(client); err != nil {
			return err
		}
	}

	return nil
}

func (c *Classifier) Remove(client *ovs.Client) error {
	for _, flow := range c.flows() {
		if err := flow.Remove(client); err != nil {
			return err
		}
	}

	return nil
}

var _ FlowRule = &Classifier{}
