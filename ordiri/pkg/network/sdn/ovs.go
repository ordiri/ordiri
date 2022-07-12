package sdn

import "github.com/digitalocean/go-openvswitch/ovs"

func Ovs() *ovs.Client {
	return ovs.New(
		ovs.Debug(true),
		ovs.Sudo(),
	)
}
