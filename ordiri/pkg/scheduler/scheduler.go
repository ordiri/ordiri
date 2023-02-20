package scheduler

import (
	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

type Scheduler func([]corev1alpha1.Node, *computev1alpha1.VirtualMachine) (*corev1alpha1.Node, error)

func filterApplicableNodes(nodes []corev1alpha1.Node, vm *computev1alpha1.VirtualMachine) []corev1alpha1.Node {
	if len(vm.Spec.Devices) == 0 {
		return nodes
	}
	needs := map[string]bool{}
	for _, device := range vm.Spec.Devices {
		needs[device.DeviceClassName] = false
	}

	list := []corev1alpha1.Node{}
	for _, node := range nodes {
		has := map[string]bool{}
		for _, device := range node.Status.Devices {
			has[device.DeviceClassName] = true
		}
		matches := true
		for k := range needs {
			if _, ok := has[k]; !ok {
				matches = false
				break
			}
		}

		if matches {
			list = append(list, node)
		}
	}

	return list
}
