package scheduler

import (
	"fmt"
	"sort"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

func CompactScheduler() Scheduler {
	return func(nodes []corev1alpha1.Node, vm *computev1alpha1.VirtualMachine) (*corev1alpha1.Node, error) {
		nodeList := filterApplicableNodes(nodes[:], vm)
		if len(nodeList) == 0 {
			return nil, fmt.Errorf("no nodes available to schedule on")
		}
		sort.Slice(nodeList, func(i, j int) bool {
			return len(nodes[i].Status.VirtualMachines) < len(nodes[j].Status.VirtualMachines)
		})

		return &nodeList[0], nil
	}
}
