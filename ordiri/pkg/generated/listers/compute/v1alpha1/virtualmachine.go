/*
Copyright 2022.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.aoeaoeaoeao
*/
// Code generated by lister-gen. DO NOT EDIT.

package v1alpha1

import (
	v1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/labels"
	"k8s.io/client-go/tools/cache"
)

// VirtualMachineLister helps list VirtualMachines.
// All objects returned here must be treated as read-only.
type VirtualMachineLister interface {
	// List lists all VirtualMachines in the indexer.
	// Objects returned here must be treated as read-only.
	List(selector labels.Selector) (ret []*v1alpha1.VirtualMachine, err error)
	// Get retrieves the VirtualMachine from the index for a given name.
	// Objects returned here must be treated as read-only.
	Get(name string) (*v1alpha1.VirtualMachine, error)
	VirtualMachineListerExpansion
}

// virtualMachineLister implements the VirtualMachineLister interface.
type virtualMachineLister struct {
	indexer cache.Indexer
}

// NewVirtualMachineLister returns a new VirtualMachineLister.
func NewVirtualMachineLister(indexer cache.Indexer) VirtualMachineLister {
	return &virtualMachineLister{indexer: indexer}
}

// List lists all VirtualMachines in the indexer.
func (s *virtualMachineLister) List(selector labels.Selector) (ret []*v1alpha1.VirtualMachine, err error) {
	err = cache.ListAll(s.indexer, selector, func(m interface{}) {
		ret = append(ret, m.(*v1alpha1.VirtualMachine))
	})
	return ret, err
}

// Get retrieves the VirtualMachine from the index for a given name.
func (s *virtualMachineLister) Get(name string) (*v1alpha1.VirtualMachine, error) {
	obj, exists, err := s.indexer.GetByKey(name)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, errors.NewNotFound(v1alpha1.Resource("virtualmachine"), name)
	}
	return obj.(*v1alpha1.VirtualMachine), nil
}
