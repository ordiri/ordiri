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

// LoadBalancer
// +k8s:openapi-gen=true
type LoadBalancer struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   LoadBalancerSpec   `json:"spec,omitempty"`
	Status LoadBalancerStatus `json:"status,omitempty"`
}

// LoadBalancerList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type LoadBalancerList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []LoadBalancer `json:"items"`
}

// LoadBalancerSpec defines the desired state of LoadBalancer
type LoadBalancerSpec struct {
}

var _ resource.Object = &LoadBalancer{}
var _ resourcestrategy.Validater = &LoadBalancer{}

func (in *LoadBalancer) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *LoadBalancer) NamespaceScoped() bool {
	return true
}

func (in *LoadBalancer) New() runtime.Object {
	return &LoadBalancer{}
}

func (in *LoadBalancer) NewList() runtime.Object {
	return &LoadBalancerList{}
}

func (in *LoadBalancer) GetGroupVersionResource() schema.GroupVersionResource {
	return schema.GroupVersionResource{
		Group:    "network.ordiri.com",
		Version:  "v1alpha1",
		Resource: "loadbalancers",
	}
}

func (in *LoadBalancer) IsStorageVersion() bool {
	return true
}

func (in *LoadBalancer) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &LoadBalancerList{}

func (in *LoadBalancerList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// LoadBalancerStatus defines the observed state of LoadBalancer
type LoadBalancerStatus struct {
}

func (in LoadBalancerStatus) SubResourceName() string {
	return "status"
}

// LoadBalancer implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &LoadBalancer{}

func (in *LoadBalancer) GetStatus() resource.StatusSubResource {
	return in.Status
}

// LoadBalancerStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &LoadBalancerStatus{}

func (in LoadBalancerStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*LoadBalancer).Status = in
}
