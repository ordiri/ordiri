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
	"fmt"

	"github.com/ordiri/ordiri/pkg/apis/common"
)

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
