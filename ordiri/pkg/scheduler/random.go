package scheduler

import (
	"math/rand"
	"time"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

func RandomScheduler() Scheduler {
	src := rand.NewSource(time.Now().UnixNano())
	rnd := rand.New(src)
	return func(nodes []corev1alpha1.Node, vm *computev1alpha1.VirtualMachine) (*corev1alpha1.Node, error) {
		nodeList := filterApplicableNodes(nodes[:], vm)
		randomNode := rnd.Intn(len(nodeList))
		return &nodes[randomNode], nil
	}
}
