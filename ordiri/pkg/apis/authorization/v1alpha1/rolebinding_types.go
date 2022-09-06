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

// RoleBinding
// +k8s:openapi-gen=true
type RoleBinding struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   RoleBindingSpec   `json:"spec,omitempty"`
	Status RoleBindingStatus `json:"status,omitempty"`
}

// RoleBindingList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type RoleBindingList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []RoleBinding `json:"items"`
}

// RoleBindingSpec defines the desired state of RoleBinding
type RoleBindingSpec struct {
}

var _ resource.Object = &RoleBinding{}
var _ resourcestrategy.Validater = &RoleBinding{}

func (in *RoleBinding) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *RoleBinding) NamespaceScoped() bool {
	return true
}

func (in *RoleBinding) New() runtime.Object {
	return &RoleBinding{}
}

func (in *RoleBinding) NewList() runtime.Object {
	return &RoleBindingList{}
}

func (in *RoleBinding) GetGroupVersionResource() schema.GroupVersionResource {
	return schema.GroupVersionResource{
		Group:    "authorization.ordiri.com",
		Version:  "v1alpha1",
		Resource: "rolebindings",
	}
}

func (in *RoleBinding) IsStorageVersion() bool {
	return true
}

func (in *RoleBinding) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &RoleBindingList{}

func (in *RoleBindingList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// RoleBindingStatus defines the observed state of RoleBinding
type RoleBindingStatus struct {
}

func (in RoleBindingStatus) SubResourceName() string {
	return "status"
}

// RoleBinding implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &RoleBinding{}

func (in *RoleBinding) GetStatus() resource.StatusSubResource {
	return in.Status
}

// RoleBindingStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &RoleBindingStatus{}

func (in RoleBindingStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*RoleBinding).Status = in
}
