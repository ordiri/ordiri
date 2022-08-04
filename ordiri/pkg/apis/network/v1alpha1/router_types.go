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

	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/util/validation/field"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource/resourcestrategy"
)

// +genclient
// +genclient:nonNamespaced
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// Router
// +k8s:openapi-gen=true
type Router struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   RouterSpec   `json:"spec,omitempty"`
	Status RouterStatus `json:"status,omitempty"`
}

// RouterList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type RouterList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []Router `json:"items"`
}

// RouterSpec defines the desired state of Router
type RouterSpec struct {
	// +optional
	Mac string `json:"mac"`
	// +optional
	Subnets []RouterSubnetReference `json:"subnets,omitempty"`
}

type RouterSubnetReference struct {
	v1.ObjectReference `json:",inline"`
	IpAddr             string `json:"ipAddr"`
}

var _ resource.Object = &Router{}
var _ resourcestrategy.Validater = &Router{}

func (in *Router) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *Router) NamespaceScoped() bool {
	return false
}

func (in *Router) New() runtime.Object {
	return &Router{}
}

func (in *Router) NewList() runtime.Object {
	return &RouterList{}
}

func (in *Router) GetGroupVersionResource() schema.GroupVersionResource {
	return schema.GroupVersionResource{
		Group:    "network.ordiri.com",
		Version:  "v1alpha1",
		Resource: "routers",
	}
}

func (in *Router) IsStorageVersion() bool {
	return true
}

func (in *Router) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &RouterList{}

func (in *RouterList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// RouterStatus defines the observed state of Router
type RouterStatus struct {
}

func (in RouterStatus) SubResourceName() string {
	return "status"
}

// Router implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &Router{}

func (in *Router) GetStatus() resource.StatusSubResource {
	return in.Status
}

// RouterStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &RouterStatus{}

func (in RouterStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*Router).Status = in
}
