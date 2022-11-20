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

	"github.com/ordiri/ordiri/config"
	"inet.af/netaddr"
	v1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/util/validation/field"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource/resourcestrategy"
)

// +genclient
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
// +genclient:nonNamespaced
// Node
// +k8s:openapi-gen=true
type Node struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   NodeSpec   `json:"spec,omitempty"`
	Status NodeStatus `json:"status,omitempty"`
}

// NodeList
// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object
type NodeList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`

	Items []Node `json:"items"`
}

type NodeRole string

const (
	NodeRoleCompute NodeRole = "compute"
	NodeRoleNetwork NodeRole = "network"
	NodeRoleStorage NodeRole = "storage"
)

// NodeSpec defines the desired state of Node
type NodeSpec struct {
	NodeRoles           []NodeRole `json:"nodeRoles"`
	ManagementAddresses []string   `json:"managementAddresses"`
}

var _ resource.Object = &Node{}
var _ resourcestrategy.Validater = &Node{}

func (in *Node) HasRole(role NodeRole) bool {
	for _, r := range in.Spec.NodeRoles {
		if r == role {
			return true
		}
	}

	return false
}

func (node *Node) Subnet(network string, subnet string) (NodeSubnetStatus, error) {
	for _, subnetStatus := range node.Status.Subnets {
		if subnetStatus.Name == subnet {
			return subnetStatus, nil
		}
	}

	return NodeSubnetStatus{}, fmt.Errorf("node has not been assigned this subnet yet")
}

func (node *Node) HasSubnet(network, subnet string) bool {
	_, err := node.Subnet(network, subnet)
	return err == nil
}

func (node *Node) Network(nw string) (NodeNetworkStatus, error) {
	for _, NetworkStatus := range node.Status.Networks {
		if NetworkStatus.Name == nw {
			return NetworkStatus, nil
		}
	}

	return NodeNetworkStatus{}, fmt.Errorf("node has not been assigned this network yet")
}

func (node *Node) HasNetwork(network string) bool {
	_, err := node.Network(network)
	return err == nil
}

func (node *Node) NetworkVlanId(nw string) (int, error) {
	sn, err := node.Network(nw)
	if err != nil {
		return 0, err
	}
	return sn.VlanId, nil
}

func (in *Node) TunnelAddress() string {
	return in.MgmtAddress()
}

func (in *Node) MgmtAddress() string {
	addr := in.MgmtIp()
	if addr.IP().IsValid() {
		return addr.IP().String()
	}

	return ""
}
func (in *Node) MgmtIp() netaddr.IPPrefix {

	for _, addr := range in.Spec.ManagementAddresses {
		ip, err := netaddr.ParseIPPrefix(addr)
		if err != nil {
			return netaddr.IPPrefix{}
		}
		if ip.IP().Is4() {
			return ip
		}
	}

	return netaddr.IPPrefix{}
}
func (in *Node) MgmtIp6() netaddr.IPPrefix {

	for _, addr := range in.Spec.ManagementAddresses {
		ip, err := netaddr.ParseIPPrefix(addr)
		if err != nil {
			return netaddr.IPPrefix{}
		}
		// todo: very bad hack considering it's the default for user supplied input
		if ip.IP().Is6() && !config.NetworkInternetGatewayV6Cidr.Contains(ip.IP()) {
			return ip
		}
	}

	return netaddr.IPPrefix{}
}

func (in *Node) GetObjectMeta() *metav1.ObjectMeta {
	return &in.ObjectMeta
}

func (in *Node) NamespaceScoped() bool {
	return false
}

func (in *Node) New() runtime.Object {
	return &Node{}
}

func (in *Node) NewList() runtime.Object {
	return &NodeList{}
}

func (in *Node) GetGroupVersionResource() schema.GroupVersionResource {
	return schema.GroupVersionResource{
		Group:    "core.ordiri.com",
		Version:  "v1alpha1",
		Resource: "nodes",
	}
}

func (in *Node) IsStorageVersion() bool {
	return true
}

func (in *Node) Validate(ctx context.Context) field.ErrorList {
	// TODO(user): Modify it, adding your API validation here.
	return nil
}

var _ resource.ObjectList = &NodeList{}

func (in *NodeList) GetListMeta() *metav1.ListMeta {
	return &in.ListMeta
}

// NodeStatus defines the observed state of Node
type NodeStatus struct {
	CephSecretUuid string `json:"cephSecretUuid"`

	// +patchMergeKey=name
	// +patchStrategy=merge
	// +listType=map
	// +listMapKey=name
	VirtualMachines []NodeVirtualMachineStatus `json:"virtualMachines" patchStrategy:"merge" patchMergeKey:"name"`

	// +patchMergeKey=name
	// +patchStrategy=merge
	// +listType=map
	// +listMapKey=name
	Subnets []NodeSubnetStatus `json:"subnets" patchStrategy:"merge" patchMergeKey:"name"`

	// +patchMergeKey=name
	// +patchStrategy=merge
	// +listType=map
	// +listMapKey=name
	Networks []NodeNetworkStatus `json:"networks" patchStrategy:"merge" patchMergeKey:"name"`
}

type NodeVirtualMachineStatus struct {
	v1.ObjectReference `json:",inline"`
}

type NodeNetworkStatus struct {
	v1.ObjectReference `json:",inline"`
	VlanId             int `json:"vlanId"`
}
type NodeSubnetStatus struct {
	v1.ObjectReference `json:",inline"`
}

func (in NodeStatus) SubResourceName() string {
	return "status"
}

// Node implements ObjectWithStatusSubResource interface.
var _ resource.ObjectWithStatusSubResource = &Node{}

func (in *Node) GetStatus() resource.StatusSubResource {
	return in.Status
}

// NodeStatus{} implements StatusSubResource interface.
var _ resource.StatusSubResource = &NodeStatus{}

func (in NodeStatus) CopyTo(parent resource.ObjectWithStatusSubResource) {
	parent.(*Node).Status = in
}
