package sdn

import (
	"net"

	"github.com/digitalocean/go-openvswitch/ovs"
)

/*
Changes packets coming in from a distributed routers mac
to the local mac and forwards directly to the local interface
*/
type RouterIngress struct {
	Switch        string
	InterfacePort string
	LocalMac      net.HardwareAddr
	RemoteMac     net.HardwareAddr
}

func (sme *RouterIngress) matches() []ovs.Match {
	return []ovs.Match{}
}
func (sme *RouterIngress) Install(client *ovs.Client) error {

	return client.OpenFlow.AddFlow(sme.Switch, &ovs.Flow{
		Matches: sme.matches(),
		Actions: []ovs.Action{},
	})
}

func (sme *RouterIngress) Remove(client *ovs.Client) error {
	return client.OpenFlow.DelFlows(sme.Switch, &ovs.MatchFlow{
		Matches: sme.matches(),
	})
}

var _ FlowRule = &RouterIngress{}
