package network

import (
	"github.com/ordiri/ordiri/pkg/network/api"
)

type RouterOption func(api.Router) error

func NewRouter(name string, opt ...RouterOption) (api.Router, error) {
	rtr := &router{
		name: name,
	}
	for _, f := range opt {
		if err := f(rtr); err != nil {
			return nil, err
		}
	}

	return rtr, nil
}

type router struct {
	// The name for this network
	name string
}

func (rtr *router) Name() string {
	return rtr.name
}

var _ api.Router = &router{}
