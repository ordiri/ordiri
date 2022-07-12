package scheduler

import (
	"math/rand"
	"time"

	"github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

func RandomScheduler() Scheduler {
	return func(nodes []v1alpha1.Node) *v1alpha1.Node {

		randomNode := rand.New(rand.NewSource(time.Now().Unix())).Intn(len(nodes))
		return &nodes[randomNode]
	}
}
