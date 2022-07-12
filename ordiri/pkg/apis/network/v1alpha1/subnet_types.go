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

	"github.com/ordiri/ordiri/pkg/apis/common"
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

func (subnet *Subnet) DeviceHash() string {
	return string(subnet.GetUID())[0:3]
}

func (subnet *Subnet) DhcpUnitName() string {
	return fmt.Sprintf("dhcp-%s.service", subnet.Name)
}
func (subnet *Subnet) ServiceNetworkNamespacePath() string {
	return fmt.Sprintf("/var/run/netns/%s", subnet.ServiceNetworkNamespace())
}
func (subnet *Subnet) ServiceNetworkNamespace() string {
	return fmt.Sprintf("service-%s", subnet.Name)
}
func (subnet *Subnet) ServiceNetworkCableName() string {
	return fmt.Sprintf("dhcp-%s", subnet.DeviceHash())
}
func (subnet *Subnet) RouterNetworkNamespacePath() string {
	return fmt.Sprintf("/var/run/netns/%s", subnet.RouterNetworkNamespace())
}
func (subnet *Subnet) RouterNetworkNamespace() string {
	return fmt.Sprintf("router-%s", subnet.Spec.Network.Name)
}
func (subnet *Subnet) RouterNetworkInternalCableName() string {
	return fmt.Sprintf("irtr-%s", subnet.DeviceHash())
}
func (subnet *Subnet) VMTap(vmName common.DeviceHashProvider) string {
	return "ovm-" + subnet.DeviceHash() + vmName.DeviceHash()
}

func (subnet *Subnet) VMBridge(vmName common.DeviceHashProvider) string {
	return "obr-" + subnet.DeviceHash() + vmName.DeviceHash()
}

func (subnet *Subnet) TunnelName() string {
	return "otn-" + subnet.DeviceHash()
}

// func (subnet *Subnet) HostVlanId(hostname string) int {
// 	for _, networkStatus := range subnet.Status.Hosts {
// 		if networkStatus.Node == hostname {
// 			return networkStatus.VlanId
// 		}
// 	}

// 	return 0
// }

func (in *Subnet) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *Subnet) NamespaceScoped() bool {
	return false
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
	Hosts []HostSubnetStatus `json:"hosts"`
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
