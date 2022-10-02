package v1alpha1

import "inet.af/netaddr"

func SetDefaults_NetworkSpec(obj *NetworkSpec) {
	if obj.Router == nil {
		obj.Router = &NetworkRouterSpec{Enabled: true}
	}

	if obj.Router.Ip == "" {
		if cidr, err := netaddr.ParseIPPrefix(obj.Cidr); err != nil {
			obj.Router.Ip = cidr.Masked().IP().Next().String()
		}
	}

	if obj.DNS == nil {
		obj.DNS = &NetworkDnsSpec{Enabled: true}
	}

	if obj.DNS.Ip == "" {
		if cidr, err := netaddr.ParseIPPrefix(obj.Cidr); err != nil {
			obj.DNS.Ip = cidr.Masked().IP().Next().Next().String()
		}
	}

	if obj.InternetGateway == nil {
		obj.InternetGateway = &InternetGatewaySpec{Enabled: true}
	}

	if obj.Nat == nil {
		obj.Nat = &NetworkNatSpec{Enabled: true}
	}
}
