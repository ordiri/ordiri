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
// +genclient:nonNamespaced
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object

// RouteTable
// +k8s:openapi-gen=true
type RouteTable struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   RouteTableSpec   `json:"spec,omitempty"`
	Status RouteTableStatus `json:"status,omitempty"`
}

// RouteTableList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type RouteTableList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []RouteTable `json:"items"`
}

// RouteTableSpec defines the desired state of RouteTable
type RouteTableSpec struct {
	Routes []RouteTableSelector `json:"routes"`
}

type RouteTableSelector struct {
	Name string `json:"name"`
}

var _ resource.Object = &RouteTable{}
var _ resourcestrategy.Validater = &RouteTable{}

func (in *RouteTable) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *RouteTable) NamespaceScoped() bool {
	return false
}

func (in *RouteTable) New() runtime.Object {
	return &RouteTable{}
}

func (in *RouteTable) NewList() runtime.Object {
	return &RouteTableList{}
}

func (in *RouteTable) GetGroupVersionResource() schema.GroupVersionResource {
	return SchemeGroupVersion.WithResource("routetables:")
}

func (in *RouteTable) IsStorageVersion() bool {
	return true
}

func (in *RouteTable) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &RouteTableList{}

func (in *RouteTableList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// RouteTableStatus defines the observed state of RouteTable
type RouteTableStatus struct {
}

func (in RouteTableStatus) SubResourceName() string {
	return "status"
}

// RouteTable implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &RouteTable{}

func (in *RouteTable) GetStatus() resource.StatusSubResource {
	return in.Status
}

// RouteTableStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &RouteTableStatus{}

func (in RouteTableStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*RouteTable).Status = in
}
