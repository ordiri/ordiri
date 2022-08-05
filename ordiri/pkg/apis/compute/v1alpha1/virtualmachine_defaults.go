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
	"github.com/ordiri/ordiri/pkg/volume"
)

func SetDefaults_VirtualMachineSpec(obj *VirtualMachineSpec) {
	if obj.State == "" {
		obj.State = VirtualMachineStateRunning
	}

	if len(obj.BootDevices) == 0 {
		obj.BootDevices = []string{"hd", "network"}
	}

	diskIdx := 0
	seen := map[string]string{}
	for _, vol := range obj.Volumes {
		seen[vol.Device] = vol.Name
	}

	for _, vol := range obj.Volumes {
		if vol.Device != "" {
			continue
		}

		for ; diskIdx <= 100; diskIdx++ {
			letter := volume.DiskNameForIndex(diskIdx)
			if _, ok := seen[letter]; !ok {
				seen[letter] = vol.Name
				vol.Device = letter
				break
			}
		}

		if diskIdx == 100 {
			panic("unable to allocate disk inedx")
		}
	}
}

func SetDefaults_VirtualMachineNetworkInterface(obj *VirtualMachineNetworkInterface) {
	if obj.Mac == "" {
		obj.Mac = mac.Unicast().String()
	}
}
