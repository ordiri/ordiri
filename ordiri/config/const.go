package config

import "inet.af/netaddr"

// ipv6 ULA globalid: 4932ac7d20 - fd49:32ac:7d20::/48
var (
	// NetworkInternetGatewayCidr is the CIDR that will be allocated from to provide
	// outbound addresses for tenant networks, that is to say these IP addresses will
	// be the edge of a tenant network.
	// long term this should be larger than a /64 or /24 and then each node can take a
	// slice of that larger block which would then be shared via bgp etc
	NetworkInternetGatewayCidr   = netaddr.MustParseIPPrefix("10.0.100.0/24")
	NetworkInternetGatewayV6Cidr = netaddr.MustParseIPPrefix("fd49:32ac:7d20:fffe::/64")

	// VmPublicCidr represents the public IP range used to allocate to a VM
	// who requests a publicly resolvable IP address. As these point to single
	// virtual machines and are floating, routes are shared directly via the bgp speaker
	VmPublicCidr   = netaddr.MustParseIPPrefix("172.20.0.2/24")
	VmPublicV6Cidr = netaddr.MustParseIPPrefix("2403:5806:97ec:0101::/64")

	// Management cidr is used for communicating with control plane resources, such as
	// the bgp speaker, node-to-node mesh etc.
	// currently the /8 is because dhcp is used for this on ipv4
	ManagementCidr   = netaddr.MustParseIPPrefix("10.0.0.0/8")
	ManagementV6Cidr = netaddr.MustParseIPPrefix("fd49:32ac:7d20:ffff::/64")
)
var (
	IPXEBootHost = netaddr.MustParseIP("10.0.1.196")
)
var (
	BgpPeerIp      = netaddr.MustParseIP("fd49:32ac:7d20:ffff::1")
	BgpPeerAsn     = uint(65000)
	LocalAsn       = uint(65000)
	CloudRouterAsn = uint(65002)
	CustomerAsn    = uint(65003)
)

var (
	IpamAddr = "ipam.ordiri.homelab.dmann.xyz:50051"
)
