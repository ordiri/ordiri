package sdn

import (
	"net"

	"github.com/digitalocean/go-openvswitch/ovs"
)

/*
Creates a static mapping between a VLAN/Destination MAC addr and the OpenFlow port
hosting that item
*/
type RouterEgress struct {
	Switch    string
	LocalMac  net.HardwareAddr
	RemoteMac net.HardwareAddr
}

func (sme *RouterEgress) matches() []ovs.Match {
	return []ovs.Match{}
}
func (sme *RouterEgress) Install(client *ovs.Client) error {

	return client.OpenFlow.AddFlow(sme.Switch, &ovs.Flow{
		Matches: sme.matches(),
		Actions: []ovs.Action{},
	})
}

func (sme *RouterEgress) Remove(client *ovs.Client) error {
	return client.OpenFlow.DelFlows(sme.Switch, &ovs.MatchFlow{
		Matches: sme.matches(),
	})
}

var _ FlowRule = &RouterEgress{}
