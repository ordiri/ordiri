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

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/util/validation/field"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource/resourcestrategy"
)

// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// VirtualMachineReplicaSet
// +k8s:openapi-gen=true
type VirtualMachineReplicaSet struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   VirtualMachineReplicaSetSpec   `json:"spec,omitempty"`
	Status VirtualMachineReplicaSetStatus `json:"status,omitempty"`
}

// VirtualMachineReplicaSetList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type VirtualMachineReplicaSetList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []VirtualMachineReplicaSet `json:"items"`
}

// VirtualMachineReplicaSetSpec defines the desired state of VirtualMachineReplicaSet
type VirtualMachineReplicaSetSpec struct {
	Replicas int32                  `json:"replicas"`
	Template VirtualMachineTemplate `json:"template"`
}

type VirtualMachineTemplate struct {
	Metadata metav1.ObjectMeta  `json:"metadata"`
	Spec     VirtualMachineSpec `json:"spec"`
}

var _ resource.Object = &VirtualMachineReplicaSet{}
var _ resourcestrategy.Validater = &VirtualMachineReplicaSet{}

func (in *VirtualMachineReplicaSet) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *VirtualMachineReplicaSet) NamespaceScoped() bool {
	return true
}

func (in *VirtualMachineReplicaSet) New() runtime.Object {
	return &VirtualMachineReplicaSet{}
}

func (in *VirtualMachineReplicaSet) NewList() runtime.Object {
	return &VirtualMachineReplicaSetList{}
}

func (in *VirtualMachineReplicaSet) GetGroupVersionResource() schema.GroupVersionResource {
	return schema.GroupVersionResource{
		Group:    "compute.ordiri.com",
		Version:  "v1alpha1",
		Resource: "virtualmachinereplicasets",
	}
}

func (in *VirtualMachineReplicaSet) IsStorageVersion() bool {
	return true
}

func (in *VirtualMachineReplicaSet) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &VirtualMachineReplicaSetList{}

func (in *VirtualMachineReplicaSetList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// VirtualMachineReplicaSetStatus defines the observed state of VirtualMachineReplicaSet
type VirtualMachineReplicaSetStatus struct {
	Replicas int32 `json:"replicas"`
}

func (in VirtualMachineReplicaSetStatus) SubResourceName() string {
	return "status"
}

// VirtualMachineReplicaSet implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &VirtualMachineReplicaSet{}

func (in *VirtualMachineReplicaSet) GetStatus() resource.StatusSubResource {
	return in.Status
}

// VirtualMachineReplicaSetStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &VirtualMachineReplicaSetStatus{}

func (in VirtualMachineReplicaSetStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*VirtualMachineReplicaSet).Status = in
}
