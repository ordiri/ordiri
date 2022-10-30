package config

import "inet.af/netaddr"

var (
	// NetworkInternetGatewayCidr is the CIDR that will be used to allocate cidr blocks from
	NetworkInternetGatewayCidr = netaddr.MustParseIPPrefix("10.0.1.224/27")

	// VmPublicCidr represents the public IP range used to allocate a NATed public IP to a VM
	VmPublicCidr = netaddr.MustParseIPPrefix("172.20.0.2/24")

	ManagementCidr = netaddr.MustParseIPPrefix("10.0.0.0/8")
)
var (
	IPXEBootHost = netaddr.MustParseIP("10.0.1.196")
)
var (
	BgpPeerIp      = netaddr.MustParseIP("10.0.1.1")
	BgpPeerAsn     = uint(65000)
	LocalAsn       = uint(65000)
	CloudRouterAsn = uint(65002)
	CustomerAsn    = uint(65003)
)

var (
	IpamAddr = netaddr.MustParseIPPort("10.0.2.102:50051")
)
