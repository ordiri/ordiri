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
	"github.com/ordiri/ordiri/pkg/mac"
)

// We do this explicitly on the VM to prevent templated
// resources which directly embed the VirtualMachineSpec
func SetDefaults_VirtualMachineDeployment(obj *VirtualMachineDeployment) {
	nws := obj.Spec.Template.Spec.NetworkInterfaces
	for _, nw := range nws {
		if nw.Mac == "" {
			nw.Mac = mac.Unicast().String()
		}

		found := false
		for _, dnsName := range nw.DnsNames {
			if dnsName == obj.Name {
				found = true
				break
			}
		}

		if !found {
			nw.DnsNames = append(nw.DnsNames, obj.Name)
		}
	}
}
