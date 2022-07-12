package scheduler

import (
	"github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

func CompactScheduler() Scheduler {
	return func(nodes []v1alpha1.Node) *v1alpha1.Node {
		var lowestNode *v1alpha1.Node
		for _, node := range nodes {
			if lowestNode == nil {
				lowestNode = &node
				continue
			}

			if len(node.Status.VirtualMachines) < len(lowestNode.Status.VirtualMachines) {
				lowestNode = &node
			}
		}

		return lowestNode
	}
}
