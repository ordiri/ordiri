package sdn

const (
	OpenFlowTableTunnelEntrypoint = 0

	// When a packet is entering the tunnel switch from the VM port
	OpenFlowTableTunnelEgressNodeEntrypoint       = 10
	OpenFlowTableTunnelEgressNodeVxlanTranslation = 11
	OpenFlowTableTunnelEgressNodeArp              = 12
	OpenFlowTableTunnelEgressNodeMulticast        = 13
	OpenFlowTableTunnelEgressNodeUnicast          = 14

	// When a packet is entering the tunnel switch from a mesh port
	OpenFlowTableTunnelIngressNodeEntrypoint       = 20
	OpenFlowTableTunnelIngressNodeVxlanTranslation = 21
	OpenFlowTableTunnelIngressNodeArp              = 22
	OpenFlowTableTunnelIngressNodeMulticast        = 23
	OpenFlowTableTunnelIngressNodeUnicast          = 24

	// OpenFlowTableTunnelArpResponder   = 31
	// OpenFlowTableTunnelRouterIncoming = 32
	// OpenFlowTableTunnelRouterOutgoing = 33
)

const (
	OpenFlowPriorityArpResponder    = 10
	OpenFlowPriorityStaticPortEntry = 10
)

const (
	TunnelSwitchName   = "ordiri-internal"
	WorkloadSwitchName = "ordiri-vms"
	ExternalSwitchName = "ordiri-external"
)
