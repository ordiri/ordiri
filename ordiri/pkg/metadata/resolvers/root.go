package resolvers

import (
	"strings"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

type Resolver = func(vm *computev1alpha1.VirtualMachine, path string, subnet string, network string, ip string) (string, bool)

func ListChildResolvers(rslvrs map[string]Resolver) string {
	keys := []string{}
	for key := range Resolvers {
		keys = append(keys, key)
	}
	return strings.Join(keys, "\n")
}

var Resolvers = map[string]Resolver{}

var Hostname = func(vmm *computev1alpha1.VirtualMachine, path string, subnet, network, ip string) (string, bool) {
	return vmm.Name, true
}
var LocalIpv4 = func(vm *computev1alpha1.VirtualMachine, path string, subnet, network, ip string) (string, bool) {
	return ip, true
}
var Mac = func(vm *computev1alpha1.VirtualMachine, path string, subnet, network, ip string) (string, bool) {
	for _, iface := range vm.Spec.NetworkInterfaces {
		if iface.Network == network && iface.Subnet == subnet {
			return iface.Mac, true
		}
	}
	return "", false
}
var PublicHostname = func(vmm *computev1alpha1.VirtualMachine, path string, subnet, network, ip string) (string, bool) {
	return vmm.Name, true
}
