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

// MachineProfile
// +k8s:openapi-gen=true
type MachineProfile struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   MachineProfileSpec   `json:"spec,omitempty"`
	Status MachineProfileStatus `json:"status,omitempty"`
}

// MachineProfileList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type MachineProfileList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []MachineProfile `json:"items"`
}

// MachineProfileSpec defines the desired state of MachineProfile
type MachineProfileSpec struct {
	IpxeConfiguration *IpxeConfiguration `json:"ipxeConfiguration,omitempty"`
	Files             map[string]string  `json:"files,omitempty"`
}

type IpxeConfiguration struct {
	Kernel string   `json:"kernel"`
	Initrd []string `json:"initrd"`
	Args   []string `json:"args"`
}

var _ resource.Object = &MachineProfile{}
var _ resourcestrategy.Validater = &MachineProfile{}

func (in *MachineProfile) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *MachineProfile) NamespaceScoped() bool {
	return false
}

func (in *MachineProfile) New() runtime.Object {
	return &MachineProfile{}
}

func (in *MachineProfile) NewList() runtime.Object {
	return &MachineProfileList{}
}

func (in *MachineProfile) GetGroupVersionResource() schema.GroupVersionResource {
	return SchemeGroupVersion.WithResource("machineprofiles")
}

func (in *MachineProfile) IsStorageVersion() bool {
	return true
}

func (in *MachineProfile) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &MachineProfileList{}

func (in *MachineProfileList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// MachineProfileStatus defines the observed state of MachineProfile
type MachineProfileStatus struct {
}

func (in MachineProfileStatus) SubResourceName() string {
	return "status"
}

// MachineProfile implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &MachineProfile{}

func (in *MachineProfile) GetStatus() resource.StatusSubResource {
	return in.Status
}

// MachineProfileStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &MachineProfileStatus{}

func (in MachineProfileStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*MachineProfile).Status = in
}
