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

package v1alpha1

import (
	"context"
	"fmt"

	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource/resourcerest"
	contextutil "sigs.k8s.io/apiserver-runtime/pkg/util/context"

	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apiserver/pkg/registry/rest"
	registryrest "k8s.io/apiserver/pkg/registry/rest"
)

// This doesn't work properly because the apiserver runtime hides the actual machinerestart type
// need to fork and amke it support the GVR storage type to enable openapi spec to correctly identify
// vmrestart as the type taken/returned by the /restart subresource (ala scale)

var _ resource.GetterUpdaterSubResource = &VirtualMachineRestart{}
var _ resourcerest.Getter = &VirtualMachineRestart{}
var _ resourcerest.Updater = &VirtualMachineRestart{}

// VirtualMachineVirtualMachineRestart
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type VirtualMachineRestart struct {
	metav1.TypeMeta `json:",inline"`
	// Standard object metadata; More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata.
	// +optional
	metav1.ObjectMeta `json:"metadata,omitempty" protobuf:"bytes,1,opt,name=metadata"`

	RequestedAt metav1.Time `json:"requestedAt"`
	RequestedBy string      `json:"requestedBy"`
}

func (c *VirtualMachineRestart) SubResourceName() string {
	return "restart"
}

func (c *VirtualMachineRestart) New() runtime.Object {
	return &VirtualMachineRestart{}
}

func (c *VirtualMachineRestart) Get(ctx context.Context, name string, options *metav1.GetOptions) (runtime.Object, error) {
	// EDIT IT
	parentStorage, ok := contextutil.GetParentStorage(ctx)
	if !ok {
		return nil, fmt.Errorf("no parent storage found in the context")
	}
	vm, err := parentStorage.Get(ctx, name, options)
	if err != nil {
		return nil, err
	}

	switch vm := vm.(type) {
	case *VirtualMachine:
		for _, op := range vm.Operations {
			if op.Type == OperationTypeRestart {
				return &VirtualMachineRestart{
					RequestedAt: metav1.Now(),
					RequestedBy: "Pending",
				}, nil
			}
		}
	}

	r := Resource("virtualmachine")
	notFoundErr := errors.NewNotFound(r, name)
	notFoundErr.ErrStatus.Message = fmt.Sprintf("%s %q is not pending a restart", r.String(), name)

	return nil, notFoundErr
}

func (c *VirtualMachineRestart) Update(
	ctx context.Context,
	name string,
	objInfo rest.UpdatedObjectInfo,
	createValidation rest.ValidateObjectFunc,
	updateValidation rest.ValidateObjectUpdateFunc,
	forceAllowCreate bool,
	options *metav1.UpdateOptions) (runtime.Object, bool, error) {
	// EDIT IT
	parentStorage, ok := contextutil.GetParentStorage(ctx)
	if !ok {
		return nil, false, fmt.Errorf("no parent storage found in the context")
	}

	return parentStorage.Update(ctx,
		name,
		&vmRestartObjectInfo{reqObjInfo: objInfo},
		createValidation,
		updateValidation,
		forceAllowCreate,
		options,
	)
}

// see sigs.k8s.io/apiserver-runtime@v1.1.1/pkg/builder/storage_provider.go
var _ registryrest.UpdatedObjectInfo = &vmRestartObjectInfo{}

type vmRestartObjectInfo struct {
	reqObjInfo registryrest.UpdatedObjectInfo
}

func (s *vmRestartObjectInfo) Preconditions() *metav1.Preconditions {
	return s.reqObjInfo.Preconditions()
}

func (s *vmRestartObjectInfo) UpdatedObject(ctx context.Context, oldObj runtime.Object) (newObj runtime.Object, err error) {
	switch vm := oldObj.(type) {
	case *VirtualMachine:
		var existing *VirtualMachineRestart
		var operations []*Operation
		for _, op := range vm.Operations {
			if op.Type == OperationTypeRestart {
				existing = &VirtualMachineRestart{
					RequestedAt: metav1.Now(),
					RequestedBy: "Pending",
				}
			}
		}

		updatedObj, err := s.reqObjInfo.UpdatedObject(ctx, existing)
		if err != nil {
			return nil, fmt.Errorf("unable to get new operation - %w", err)
		}

		reset, ok := updatedObj.(*VirtualMachineRestart)
		if !ok {
			return nil, fmt.Errorf("did not return a restart op")
		}
		if existing == nil {
			operations = append(operations, NewRestartOperation(reset.RequestedBy))
			vm.Operations = operations
		}
		return vm, nil
	}

	return oldObj, nil
}
