package sdn

import (
	"fmt"
	"net"

	"github.com/digitalocean/go-openvswitch/ovs"
	"inet.af/netaddr"
)

type VirtualMachine struct {
	WorkloadSwitch   string
	WorkloadPort     string
	MetadataPort     string
	MetadataMac      net.HardwareAddr
	Mac              net.HardwareAddr
	PrivateIps       []netaddr.IP
	Segment          int
	StrictSourceDest bool
}

func (wi *VirtualMachine) rules() []FlowRule {
	rules := []FlowRule{
		&ArpResponder{
			Switch:   wi.WorkloadSwitch,
			Mac:      wi.Mac,
			Ip:       wi.PrivateIps[0],
			VlanId:   wi.Segment,
			Table:    0,
			Priority: 100,
		},
		&MetadataServer{
			Switch:       wi.WorkloadSwitch,
			Mac:          wi.MetadataMac,
			WorkloadPort: wi.WorkloadPort,
			MetadataPort: wi.MetadataPort,
		},
		&StaticPortEntry{
			Switch:  wi.WorkloadSwitch,
			Port:    wi.WorkloadPort,
			Segment: wi.Segment,
			MacAddr: wi.Mac,
		},
	}

	// for _, ip := range wi.Ips {
	// 	rules = append(rules, &ArpResponder{
	// 		Priority: 10,
	// 		Switch:   wi.WorkloadSwitch,
	// 		Mac:      wi.Mac,
	// 		Ip:       ip,
	// 		VlanId:   wi.Segment,
	// 	})
	// }

	// 	// if wi.StrictSourceDest {
	// 	// 	rules = append(rules, &StaticPortEntry{
	// 	// 		Switch:  wi.WorkloadSwitch,
	// 	// 		Port:    wi.WorkloadPort,
	// 	// 		Segment: wi.Segment,
	// 	// 		MacAddr: wi.Mac,
	// 	// 	})
	// 	// }
	// }

	return rules
}

func (wi *VirtualMachine) Install(client *ovs.Client) error {
	for _, flow := range wi.rules() {
		if err := flow.Install(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

func (wi *VirtualMachine) Remove(client *ovs.Client) error {
	for _, flow := range wi.rules() {
		if err := flow.Remove(client); err != nil {
			return fmt.Errorf("error installing flow %v - %w", flow, err)
		}
	}
	return nil
}

var _ FlowRule = &VirtualMachine{}
