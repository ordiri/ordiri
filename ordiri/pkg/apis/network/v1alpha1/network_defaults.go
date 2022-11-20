package v1alpha1

import (
	"inet.af/netaddr"
)

func SetDefaults_NetworkSpec(obj *NetworkSpec) {
	if obj.Router == nil {
		obj.Router = &NetworkRouterSpec{Enabled: true}
	}

	if obj.DNS == nil {
		obj.DNS = &NetworkDnsSpec{Enabled: true}
	}

	if obj.InternetGateway == nil {
		obj.InternetGateway = &InternetGatewaySpec{Enabled: true}
	}

	if obj.Cidr != "" && obj.Router.Ip == "" {
		if cidr, err := netaddr.ParseIPPrefix(obj.Cidr); err == nil {
			obj.Router.Ip = cidr.Masked().IP().Next().String()
		}
	}
	if obj.Cidr6 != "" && obj.Router.Ip6 == "" {
		if cidr, err := netaddr.ParseIPPrefix(obj.Cidr6); err == nil {
			obj.Router.Ip6 = cidr.Masked().IP().Next().String()
		}
	}

	if obj.Cidr != "" && obj.DNS.Ip == "" {
		if cidr, err := netaddr.ParseIPPrefix(obj.Cidr); err == nil {
			obj.DNS.Ip = cidr.Masked().IP().Next().Next().String()
		}
	}
	if obj.Cidr6 != "" && obj.DNS.Ip6 == "" {
		if cidr, err := netaddr.ParseIPPrefix(obj.Cidr6); err == nil {
			obj.DNS.Ip6 = cidr.Masked().IP().Next().Next().String()
		}
	}

	if obj.Nat == nil {
		obj.Nat = &NetworkNatSpec{Enabled: true}
	}
}
