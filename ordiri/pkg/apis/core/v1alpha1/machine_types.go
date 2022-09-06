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

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/util/validation/field"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource/resourcestrategy"
)

// +genclient
// +genclient:method=PutReview,verb=update,subresource=review,input=MachineReview,result=MachineReview
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
// Machine
type Machine struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   MachineSpec   `json:"spec,omitempty"`
	Status MachineStatus `json:"status,omitempty"`
}

func (m *Machine) IsRejected() bool {
	return m.Spec.Approved != nil && !*m.Spec.Approved
}

func (m *Machine) IsPending() bool {
	return m.Spec.Approved == nil
}

func (m *Machine) IsApproved() bool {
	return m.Spec.Approved != nil && *m.Spec.Approved
}

func (m *Machine) Properties() (map[string]string, error) {
	properties := map[string]string{}
	for _, property := range m.Spec.Properties {
		if value, ok := properties[property.Name]; ok {
			return nil, fmt.Errorf("found duplicate property %s, old: %s, new: %s", property.Name, value, property.Value)
		}
		properties[property.Name] = property.Value
	}

	return properties, nil
}

// MachineList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type MachineList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []Machine `json:"items"`
}

// MachineSpec defines the desired state of Machine
type MachineSpec struct {
	Role     string `json:"role"`
	Approved *bool  `json:"approved,omitempty"`

	// +optional
	// +patchMergeKey=name
	// +patchStrategy=merge
	// +listType=map
	// +listMapKey=name
	// +kubebuilder:validation:MinItems=1
	// +kubebuilder:validation:MaxItems=64
	Properties []MachineProperty `json:"properties" patchStrategy:"merge" patchMergeKey:"name"`
}

// MachineProperty is a key/value pair, representing a property on a machine
type MachineProperty struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

var _ resource.Object = &Machine{}
var _ resourcestrategy.Validater = &Machine{}

func (in *Machine) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *Machine) NamespaceScoped() bool {
	return true
}

func (in *Machine) New() runtime.Object {
	return &Machine{}
}

func (in *Machine) NewList() runtime.Object {
	return &MachineList{}
}

func (in *Machine) GetGroupVersionResource() schema.GroupVersionResource {
	return SchemeGroupVersion.WithResource("machines")
}

func (in *Machine) IsStorageVersion() bool {
	return true
}

func (in *Machine) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &MachineList{}

func (in *MachineList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

type ConditionKey string

var (
	ConditionKeyRoleValid ConditionKey = "RoleValid"
	ConditionKeyApproved  ConditionKey = "Approval"
)

// MachineStatus defines the observed state of Machine
type MachineStatus struct {
	// The generation observed by the deployment controller.
	// +optional
	ObservedGeneration int64

	// Represents the observations of a foo's current state.
	// Known .status.conditions.type are: "AssignedRole", "Progressing", and "Degraded"
	// +patchMergeKey=type
	// +patchStrategy=merge
	// +listType=map
	// +listMapKey=type
	Conditions []metav1.Condition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,1,rep,name=conditions"`
}

func (in MachineStatus) SubResourceName() string {
	return "status"
}

// Machine implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &Machine{}

func (in *Machine) GetStatus() resource.StatusSubResource {
	return in.Status
}

// MachineStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &MachineStatus{}

func (in MachineStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*Machine).Status = in
}

var _ resource.ObjectWithArbitrarySubResource = &Machine{}

func (in *Machine) GetArbitrarySubResources() []resource.ArbitrarySubResource {
	return []resource.ArbitrarySubResource{
		// +kubebuilder:scaffold:subresource
		&MachineReview{},
	}
}
