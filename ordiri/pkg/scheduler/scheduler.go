package scheduler

import "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"

type Scheduler func([]v1alpha1.Node) (*v1alpha1.Node, error)
