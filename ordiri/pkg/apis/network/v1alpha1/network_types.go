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

// Network
// +k8s:openapi-gen=true
// +kubebuilder:printcolumn:name="Network",type=string,JSONPath=`.spec.cidr`
type Network struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   NetworkSpec   `json:"spec,omitempty"`
	Status NetworkStatus `json:"status,omitempty"`
}

// NetworkList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type NetworkList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []Network `json:"items"`
}

// NetworkSpec defines the desired state of Network
type NetworkSpec struct {
	// Cidr address to represent this network
	Cidr string `json:"cidr"`

	// Cidr address to represent this network
	Nat NetworkNatSpec `json:"nat"`

	RouteTables []RouteTableSelector `json:"routeTables,omitempty"`
}

type NetworkNatSpec struct {
	Enabled bool `json:"nat"`
}

// +kubebuilder:validation:Enum=host
type NetworkMode string

const (
	NetworkModeHost NetworkMode = "host"
)

var _ resource.Object = &Network{}
var _ resourcestrategy.Validater = &Network{}

func (nw *Network) DefaultRouterName() string {
	return fmt.Sprintf("router-%s", nw.Name)
}
func (nw *Network) RouterNetworkNamespace() string {
	return fmt.Sprintf("router-%s", nw.Name)
}
func (nw *Network) RouterNetworkPublicGatewayCableName() string {
	return fmt.Sprintf("prtr-%s", nw.DeviceHash())
}
func (nw *Network) DeviceHash() string {
	return string(nw.GetUID())[0:3]
}
func (in *Network) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *Network) NatEnabled() bool {
	return true
}
func (in *Network) NamespaceScoped() bool {
	return false
}

func (in *Network) New() runtime.Object {
	return &Network{}
}

func (in *Network) NewList() runtime.Object {
	return &NetworkList{}
}

func (in *Network) GetGroupVersionResource() schema.GroupVersionResource {
	return SchemeGroupVersion.WithResource("networks")
}

func (in *Network) IsStorageVersion() bool {
	return true
}

func (in *Network) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &NetworkList{}

func (in *NetworkList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// NetworkStatus defines the observed state of Network
type NetworkStatus struct {
	// The generation observed by the deployment controller.
	// +optional
	ObservedGeneration int64 `json:"observedGeneration"`

	// Represents the observations of a Networks current state.
	// Known .status.conditions.type are: "AssignedRole", "Progressing", and "Degraded"
	// +patchMergeKey=type
	// +patchStrategy=merge
	// +listType=map
	// +listMapKey=type
	// +kubebuilder:default=[{type: "MachineCreated", status: "False"}, {type: "MachineRunning", status: "False"}]
	Conditions []metav1.Condition  `json:"conditions,omitempty" patchStrategy:"merge" patchMergeKey:"type" protobuf:"bytes,1,rep,name=conditions"`
	Vni        int64               `json:"vni"`
	Hosts      []HostNetworkStatus `json:"hosts"`
}

type HostNetworkStatus struct {
	Node string `json:"node"`
}

func (in NetworkStatus) SubResourceName() string {
	return "status"
}

// Network implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &Network{}

func (in *Network) GetStatus() resource.StatusSubResource {
	return in.Status
}

// NetworkStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &NetworkStatus{}

func (in NetworkStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*Network).Status = in
}
