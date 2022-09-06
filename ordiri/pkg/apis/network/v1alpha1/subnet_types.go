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

// Subnet
// +k8s:openapi-gen=true
// +kubebuilder:printcolumn:name="Network",type=string,JSONPath=`.spec.network.name`
// +kubebuilder:printcolumn:name="Cidr",type=string,JSONPath=`.spec.cidr`
type Subnet struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   SubnetSpec   `json:"spec,omitempty"`
	Status SubnetStatus `json:"status,omitempty"`
}

// SubnetList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type SubnetList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []Subnet `json:"items"`
}

// SubnetSpec defines the desired state of Subnet
type SubnetSpec struct {
	Network     NetworkSelector      `json:"network"`
	Cidr        string               `json:"cidr"`
	RouteTables []RouteTableSelector `json:"routeTables"`

	Dhcp DhcpConfiguration `json:"dhcp"`
}

type DhcpConfiguration struct {
	Enabled bool `json:"enabled"`
}

type NetworkSelector struct {
	Name string `json:"name"`
}

var _ resource.Object = &Subnet{}
var _ resourcestrategy.Validater = &Subnet{}

func (in *Subnet) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *Subnet) NamespaceScoped() bool {
	return true
}

func (in *Subnet) New() runtime.Object {
	return &Subnet{}
}

func (in *Subnet) NewList() runtime.Object {
	return &SubnetList{}
}

func (in *Subnet) GetGroupVersionResource() schema.GroupVersionResource {
	return SchemeGroupVersion.WithResource("subnets")
}

func (in *Subnet) IsStorageVersion() bool {
	return true
}

func (in *Subnet) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &SubnetList{}

func (in *SubnetList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// SubnetStatus defines the observed state of Subnet
type SubnetStatus struct {
	Hosts          []HostSubnetStatus   `json:"hosts"`
	MetadataServer MetadataSubnetStatus `json:"metadataServer"`
}

type MetadataSubnetStatus struct {
	Mac string `json:"mac"`
}

type HostSubnetStatus struct {
	Node   string `json:"node"`
	VlanId int    `json:"vlanId"`
}

func (in SubnetStatus) SubResourceName() string {
	return "status"
}

// Subnet implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &Subnet{}

func (in *Subnet) GetStatus() resource.StatusSubResource {
	return in.Status
}

// SubnetStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &SubnetStatus{}

func (in SubnetStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*Subnet).Status = in
}
