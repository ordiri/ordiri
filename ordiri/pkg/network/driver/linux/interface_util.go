package linux

import (
	"github.com/ordiri/ordiri/pkg/network/api"
)

type VethCable string

func (vc VethCable) Namespace() string {
	return string(vc) + VethSuffixNamespace
}

func (vc VethCable) Root() string {
	return string(vc) + VethSuffixRoot
}

func namespaceForRouter(network api.Network) string {
	return NetworkRouterNamespacePrefix + network.Name()
}

func namespaceForServices(network api.Network, subnet api.Subnet) string {
	// return NetworkServicesNamespacePrefix + network.Name() +"-"+ subnet.Name()
	return NetworkServicesNamespacePrefix + network.Name() + subnet.Name()
}

func interfaceBridgeName(network api.Network, subnet api.Subnet, iface api.Interface) string {
	return InterfaceBridgePrefix + hash(network.Name()+subnet.Name()+iface.Mac().String())
}

func interfaceTunTapName(network api.Network, subnet api.Subnet, iface api.Interface) string {
	return InterfaceTunTapPrefix + hash(iface.Mac().String())
}

func publicGwCable(network api.Network) VethCable {
	return VethCable(PublicGatewayCablePrefix + hash(network.Name()))
}
func internalRouterCable(network api.Network, subnet api.Subnet) VethCable {
	return VethCable(InternalRouterCablePrefix + hash(network.Name()+subnet.Name()))
}
func servicesCableName(network api.Network, subnet api.Subnet, svc string) VethCable {
	return VethCable(NetworkServiceCablePrefix + hash(network.Name()+subnet.Name()))
}
func dhcpCableName(network api.Network, subnet api.Subnet) VethCable {
	return servicesCableName(network, subnet, "dhcp")
}
