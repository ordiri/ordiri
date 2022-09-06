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

// Role
// +k8s:openapi-gen=true
type Role struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   RoleSpec   `json:"spec,omitempty"`
	Status RoleStatus `json:"status,omitempty"`
}

// RoleList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type RoleList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []Role `json:"items"`
}

// RoleSpec defines the desired state of Role
type RoleSpec struct {
}

var _ resource.Object = &Role{}
var _ resourcestrategy.Validater = &Role{}

func (in *Role) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *Role) NamespaceScoped() bool {
	return true
}

func (in *Role) New() runtime.Object {
	return &Role{}
}

func (in *Role) NewList() runtime.Object {
	return &RoleList{}
}

func (in *Role) GetGroupVersionResource() schema.GroupVersionResource {
	return schema.GroupVersionResource{
		Group:    "authorization.ordiri.com",
		Version:  "v1alpha1",
		Resource: "roles",
	}
}

func (in *Role) IsStorageVersion() bool {
	return true
}

func (in *Role) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &RoleList{}

func (in *RoleList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// RoleStatus defines the observed state of Role
type RoleStatus struct {
}

func (in RoleStatus) SubResourceName() string {
	return "status"
}

// Role implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &Role{}

func (in *Role) GetStatus() resource.StatusSubResource {
	return in.Status
}

// RoleStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &RoleStatus{}

func (in RoleStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*Role).Status = in
}
