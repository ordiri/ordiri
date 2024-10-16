package sdn

const (
	UnderlayMTU = 9000
	OverlayMTU  = 1500
)
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
	OpenFlowTableWorkloadEntrypoint = 0

	// When a packet is entering the tunnel switch from a VM port
	OpenFlowTableWorkloadVmEgressEntrypoint       = 10
	OpenFlowTableWorkloadVmEgressVxlanTranslation = 11
	OpenFlowTableWorkloadVmEgressArp              = 12
	OpenFlowTableWorkloadVmEgressMulticast        = 13
	OpenFlowTableWorkloadVmEgressUnicast          = 14

	// When a packet is entering the tunnel switch from a mesh port
	OpenFlowTableWorkloadVmIngressEntrypoint       = 20
	OpenFlowTableWorkloadVmIngressVxlanTranslation = 21
	OpenFlowTableWorkloadVmIngressArp              = 22
	OpenFlowTableWorkloadVmIngressMulticast        = 23
	OpenFlowTableWorkloadVmIngressUnicast          = 24

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
