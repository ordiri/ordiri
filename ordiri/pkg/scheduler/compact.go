package scheduler

import (
	"fmt"
	"sort"

	"github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

func CompactScheduler() Scheduler {
	return func(nodes []v1alpha1.Node) (*v1alpha1.Node, error) {
		nodeList := nodes[:]
		if len(nodeList) == 0 {
			return nil, fmt.Errorf("no nodes available to schedule on")
		}
		sort.Slice(nodeList, func(i, j int) bool {
			return len(nodes[i].Status.VirtualMachines) < len(nodes[j].Status.VirtualMachines)
		})

		return &nodeList[0], nil
	}
}
