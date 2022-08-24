package sdn

const (
	OpenFlowTableTunnelEntrypoint = 0

	// When a packet is entering the tunnel switch from a remote tunnel
	OpenFlowTableTunnelEgressNodeEntrypoint = 1

	// When a packet is entering the tunnel switch from the vm switch
	OpenFlowTableTunnelIngressNodeEntrypoint = 2

	OpenFlowTableTunnelEgressNodeArp       = 20
	OpenFlowTableTunnelEgressNodeMulticast = 21
	OpenFlowTableTunnelEgressNodeUnicast   = 22

	OpenFlowTableTunnelEgressNodeVxlanTranslation = 30

	OpenFlowTableTunnelArpResponder   = 31
	OpenFlowTableTunnelRouterIncoming = 32
	OpenFlowTableTunnelRouterOutgoing = 33
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
