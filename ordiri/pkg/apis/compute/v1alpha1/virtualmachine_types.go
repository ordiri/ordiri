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
	"fmt"

	k8res "k8s.io/apimachinery/pkg/api/resource"
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

// VirtualMachine
// +k8s:openapi-gen=true
type VirtualMachine struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   VirtualMachineSpec   `json:"spec,omitempty"`
	Status VirtualMachineStatus `json:"status,omitempty"`
}

// VirtualMachineList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type VirtualMachineList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []VirtualMachine `json:"items"`
}

// +kubebuilder:validation:Enum=Unknown,Paused,Running
type VirtualMachineState string

const (
	VirtualMachineStateUnknown VirtualMachineState = "Unknown"
	VirtualMachineStatePaused  VirtualMachineState = "Paused"
	VirtualMachineStateRunning VirtualMachineState = "Running"
)

// VirtualMachineSpec defines the desired state of VirtualMachine
type VirtualMachineSpec struct {
	Role string `json:"role"`

	ScheduledNode string `json:"node"`

	State VirtualMachineState `json:"state"`

	// +optional
	UserData string `jsonn:"userData,omitempty"`

	// +optional
	BootDevices []string `json:"bootDevices"`

	// +optional
	Volumes []*VirtualMachineVolume `json:"disks"`

	// +optional
	NetworkInterfaces []*VirtualMachineNetworkInterface `json:"networkInterfaces"`
}

type VirtualMachineNetworkInterface struct {
	// +optional
	Network string `json:"network"`
	Subnet  string `json:"subnet"`
	Mac     string `json:"mac"`
}

func (in *VirtualMachineNetworkInterface) Key() string {
	return fmt.Sprintf("%s:%s", in.Network, in.Subnet)
}

type VirtualMachineVolume struct {
	Name string `json:"name"`
	// The device that the volume is bound too
	// for example, /dev/vda
	Device string `json:"device"`

	VolumeClaim *VirtualMachineVolumeClaim `json:"volumeClaim,omitempty"`
}

type VirtualMachineVolumeClaim struct {
	ClaimName string `json:"claimName"`
}

var _ resource.Object = &VirtualMachine{}
var _ resourcestrategy.Validater = &VirtualMachine{}

const (
	VirtualMachineScheduledAnnotation = "compute.ordiri.com/scheduled-node"
)

func (vm *VirtualMachine) DeviceHash() string {
	return string(vm.GetUID())[0:8]
}

func (in *VirtualMachine) ScheduledNode() (string, bool) {
	if in.Spec.ScheduledNode != "" {
		return in.Spec.ScheduledNode, true
	}

	annot := in.GetAnnotations()
	if annot == nil {
		return "", false
	}

	node := annot[VirtualMachineScheduledAnnotation]
	return node, node != ""

}

func (in *VirtualMachine) Schedule(nodeName string) error {
	existing, isScheduled := in.ScheduledNode()
	if isScheduled {
		return fmt.Errorf("virtual machine already scheduled on " + existing)
	}

	in.Spec.ScheduledNode = nodeName
	return nil
}

func (in *VirtualMachine) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *VirtualMachine) NamespaceScoped() bool {
	return false
}

func (in *VirtualMachine) New() runtime.Object {
	return &VirtualMachine{}
}

func (in *VirtualMachine) NewList() runtime.Object {
	return &VirtualMachineList{}
}

func (in *VirtualMachine) GetGroupVersionResource() schema.GroupVersionResource {
	return SchemeGroupVersion.WithResource("virtualmachines")
}

func (in *VirtualMachine) IsStorageVersion() bool {
	return true
}

func (in *VirtualMachine) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &VirtualMachineList{}

func (in *VirtualMachineList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// +kubebuilder:validation:Enum=MachineRunning,MachineCreated
type ConditionKey string

var (
	ConditionKeyMachineRunning ConditionKey = "MachineRunning"
	ConditionKeyMachineCreated ConditionKey = "MachineCreated"
)

// VirtualMachineStatus defines the observed state of VirtualMachine
type VirtualMachineStatus struct {
	// The generation observed by the deployment controller.
	// +optional
	ObservedGeneration int64                                  `json:"observedGeneration"`
	NetworkInterfaces  []VirtualMachineNetworkInterfaceStatus `json:"networkInterfaces,omitempty"`
	Volumes            []VirtualMachineVolumeStatus           `json:"disks,omitempty"`

	// Represents the observations of a foo's current state.
	// Known .status.conditions.type are: "AssignedRole", "Progressing", and "Degraded"
	// +patchMergeKey=type
	// +patchStrategy=merge
	// +listType=map
	// +listMapKey=type
	// +kubebuilder:default=[{type: "MachineCreated", status: "False"}, {type: "MachineRunning", status: "False"}]
	Conditions []metav1.Condition `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,1,rep,name=conditions"`
}
type VirtualMachineNetworkInterfaceStatus struct {
	Name string `json:"name"`
	Mac  string `json:"mac"`
}

type VirtualMachineVolumeStatus struct {
	Bound  bool           `json:"bound"`
	Name   string         `json:"name"`
	Size   k8res.Quantity `json:"size"`
	Device string         `json:"device"`
}

func (in VirtualMachineStatus) SubResourceName() string {
	return "status"
}

// VirtualMachine implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &VirtualMachine{}

func (in *VirtualMachine) GetStatus() resource.StatusSubResource {
	return in.Status
}

// VirtualMachineStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &VirtualMachineStatus{}

func (in VirtualMachineStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*VirtualMachine).Status = in
}
