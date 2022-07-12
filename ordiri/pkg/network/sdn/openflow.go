package sdn

import "github.com/digitalocean/go-openvswitch/ovs"

type FlowRule interface {
	Install(*ovs.Client) error
	Remove(*ovs.Client) error
}
