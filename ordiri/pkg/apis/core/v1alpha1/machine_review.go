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
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apiserver/pkg/registry/rest"
)

var _ resource.GetterUpdaterSubResource = &MachineReview{}
var _ resourcerest.Getter = &MachineReview{}
var _ resourcerest.Updater = &MachineReview{}

// MachineMachineReview
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type MachineReview struct {
	metav1.TypeMeta `json:",inline" `
	// +optional
	metav1.ObjectMeta `json:"metadata,omitempty" protobuf:"bytes,1,opt,name=metadata"`

	// defines the behavior of the Review. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status.
	// +optional
	Spec MachineReviewSpec `json:"spec,omitempty" protobuf:"bytes,2,opt,name=spec"`

	// current status of the MachineReview. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status. Read-only.
	// +optional
	Status MachineReviewStatus `json:"status,omitempty" protobuf:"bytes,3,opt,name=status"`
}

type MachineReviewSpec struct {
	Approved bool `json:"approved"`
}

// ScaleStatus represents the current status of a scale subresource.
type MachineReviewStatus struct {
}

func (c *MachineReview) SubResourceName() string {
	return "review"
}

func (c *MachineReview) New() runtime.Object {
	return &MachineReview{}
}

func (c *MachineReview) Get(ctx context.Context, name string, options *metav1.GetOptions) (runtime.Object, error) {
	// EDIT IT
	parentStorage, ok := contextutil.GetParentStorage(ctx)
	if !ok {
		return nil, fmt.Errorf("no parent storage found in the context")
	}
	machine, err := parentStorage.Get(ctx, name, options)
	if err != nil {
		return nil, err
	}

	newMachine := machine.(*Machine)

	return &MachineReview{
		Spec: MachineReviewSpec{
			Approved: controllerutil.ContainsFinalizer(newMachine, "core.ordiri.com/approved"),
		},
	}, nil
}

func (c *MachineReview) Update(
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
	return parentStorage.Update(ctx, name, objInfo, createValidation, updateValidation, forceAllowCreate, options)
}
