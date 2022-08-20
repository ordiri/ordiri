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

// VirtualMachineDeployment
// +k8s:openapi-gen=true
type VirtualMachineDeployment struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   VirtualMachineDeploymentSpec   `json:"spec,omitempty"`
	Status VirtualMachineDeploymentStatus `json:"status,omitempty"`
}

// VirtualMachineDeploymentList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type VirtualMachineDeploymentList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []VirtualMachineDeployment `json:"items"`
}

// VirtualMachineDeploymentSpec defines the desired state of VirtualMachineDeployment
type VirtualMachineDeploymentSpec struct {
	Replicas int32                  `json:"replicas"`
	Template VirtualMachineTemplate `json:"template"`
}

var _ resource.Object = &VirtualMachineDeployment{}
var _ resourcestrategy.Validater = &VirtualMachineDeployment{}

func (in *VirtualMachineDeployment) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *VirtualMachineDeployment) NamespaceScoped() bool {
	return false
}

func (in *VirtualMachineDeployment) New() runtime.Object {
	return &VirtualMachineDeployment{}
}

func (in *VirtualMachineDeployment) NewList() runtime.Object {
	return &VirtualMachineDeploymentList{}
}

func (in *VirtualMachineDeployment) GetGroupVersionResource() schema.GroupVersionResource {
	return schema.GroupVersionResource{
		Group:    "compute.ordiri.com",
		Version:  "v1alpha1",
		Resource: "virtualmachinedeployments",
	}
}

func (in *VirtualMachineDeployment) IsStorageVersion() bool {
	return true
}

func (in *VirtualMachineDeployment) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &VirtualMachineDeploymentList{}

func (in *VirtualMachineDeploymentList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// VirtualMachineDeploymentStatus defines the observed state of VirtualMachineDeployment
type VirtualMachineDeploymentStatus struct {
	ObservedGeneration int32 `json:"observedGeneration"`
	Replicas           int32 `json:"replicas"`
}

func (in VirtualMachineDeploymentStatus) SubResourceName() string {
	return "status"
}

// VirtualMachineDeployment implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &VirtualMachineDeployment{}

func (in *VirtualMachineDeployment) GetStatus() resource.StatusSubResource {
	return in.Status
}

// VirtualMachineDeploymentStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &VirtualMachineDeploymentStatus{}

func (in VirtualMachineDeploymentStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*VirtualMachineDeployment).Status = in
}

var _ resource.ObjectWithArbitrarySubResource = &VirtualMachineDeployment{}

func (in *VirtualMachineDeployment) GetArbitrarySubResources() []resource.ArbitrarySubResource {
	return []resource.ArbitrarySubResource{
		// +kubebuilder:scaffold:subresource
	}
}
