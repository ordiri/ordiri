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

// ServiceAccount
// +k8s:openapi-gen=true
type ServiceAccount struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   ServiceAccountSpec   `json:"spec,omitempty"`
	Status ServiceAccountStatus `json:"status,omitempty"`
}

// ServiceAccountList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type ServiceAccountList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []ServiceAccount `json:"items"`
}

// ServiceAccountSpec defines the desired state of ServiceAccount
type ServiceAccountSpec struct {
}

var _ resource.Object = &ServiceAccount{}
var _ resourcestrategy.Validater = &ServiceAccount{}

func (in *ServiceAccount) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *ServiceAccount) NamespaceScoped() bool {
	return false
}

func (in *ServiceAccount) New() runtime.Object {
	return &ServiceAccount{}
}

func (in *ServiceAccount) NewList() runtime.Object {
	return &ServiceAccountList{}
}

func (in *ServiceAccount) GetGroupVersionResource() schema.GroupVersionResource {
	return schema.GroupVersionResource{
		Group:    "authorization.ordiri.com",
		Version:  "v1alpha1",
		Resource: "serviceaccounts",
	}
}

func (in *ServiceAccount) IsStorageVersion() bool {
	return true
}

func (in *ServiceAccount) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &ServiceAccountList{}

func (in *ServiceAccountList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// ServiceAccountStatus defines the observed state of ServiceAccount
type ServiceAccountStatus struct {
}

func (in ServiceAccountStatus) SubResourceName() string {
	return "status"
}

// ServiceAccount implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &ServiceAccount{}

func (in *ServiceAccount) GetStatus() resource.StatusSubResource {
	return in.Status
}

// ServiceAccountStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &ServiceAccountStatus{}

func (in ServiceAccountStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*ServiceAccount).Status = in
}
