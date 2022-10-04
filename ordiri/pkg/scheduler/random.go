package scheduler

import (
	"math/rand"
	"time"

	"github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

func RandomScheduler() Scheduler {
	src := rand.NewSource(time.Now().UnixNano())
	rnd := rand.New(src)
	return func(nodes []v1alpha1.Node) (*v1alpha1.Node, error) {
		randomNode := rnd.Intn(len(nodes))
		return &nodes[randomNode], nil
	}
}
