package sdn

const (
	OpenFlowTableEntrypoint   = 0
	OpenFlowTableUnicast      = 1
	OpenFlowTableMulticast    = 2
	OpenFlowTableBroadcast    = 3
	OpenFlowTableArp          = 0
	OpenFlowTableArpResponder = 0
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
