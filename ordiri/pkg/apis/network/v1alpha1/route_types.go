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

// Route
// +k8s:openapi-gen=true
type Route struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   RouteSpec   `json:"spec,omitempty"`
	Status RouteStatus `json:"status,omitempty"`
}

// RouteList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type RouteList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []Route `json:"items"`
}

// RouteSpec defines the desired state of Route
type RouteSpec struct {
	Cidr string `json:"cidr"`
}

var _ resource.Object = &Route{}
var _ resourcestrategy.Validater = &Route{}

func (in *Route) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *Route) NamespaceScoped() bool {
	return true
}

func (in *Route) New() runtime.Object {
	return &Route{}
}

func (in *Route) NewList() runtime.Object {
	return &RouteList{}
}

func (in *Route) GetGroupVersionResource() schema.GroupVersionResource {
	return SchemeGroupVersion.WithResource("routes")
}

func (in *Route) IsStorageVersion() bool {
	return true
}

func (in *Route) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &RouteList{}

func (in *RouteList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// RouteStatus defines the observed state of Route
type RouteStatus struct {
}

func (in RouteStatus) SubResourceName() string {
	return "status"
}

// Route implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &Route{}

func (in *Route) GetStatus() resource.StatusSubResource {
	return in.Status
}

// RouteStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &RouteStatus{}

func (in RouteStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*Route).Status = in
}
