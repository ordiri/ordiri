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
	"strings"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource/resourcestrategy"
)

var _ resourcestrategy.TableConverter = &VirtualMachine{}
var _ resourcestrategy.TableConverter = &VirtualMachineList{}

var (
	virtualMachineTableDefinitions = []metav1.TableColumnDefinition{
		{Name: "Name", Type: "string", Format: "name", Description: "The name of the VirtualMachine"},
		{Name: "Node", Type: "string", Format: "string", Description: "The node the VM is assigned too"},
		{Name: "Networks", Type: "string", Format: "string", Description: "Networks the VM is running in"},
	}
)

func (in *VirtualMachine) ConvertToTable(ctx context.Context, tableOptions runtime.Object) (*metav1.Table, error) {
	return &metav1.Table{
		ColumnDefinitions: virtualMachineTableDefinitions,
		Rows:              []metav1.TableRow{getVirtualMachineTableRow(in)},
	}, nil
}

func (in *VirtualMachineList) ConvertToTable(ctx context.Context, tableOptions runtime.Object) (*metav1.Table, error) {
	t := &metav1.Table{
		ColumnDefinitions: virtualMachineTableDefinitions,
	}
	for _, c := range in.Items {
		t.Rows = append(t.Rows, getVirtualMachineTableRow(&c))
	}
	return t, nil
}

func getVirtualMachineTableRow(c *VirtualMachine) metav1.TableRow {
	name := c.Name
	row := metav1.TableRow{
		Object: runtime.RawExtension{Object: c},
	}
	scheduledNode, isScheduled := c.ScheduledNode()
	if !isScheduled {
		scheduledNode = "N/A (pending)"
	}

	ifaces := map[string][]string{}
	for _, host := range c.Spec.NetworkInterfaces {
		if _, ok := ifaces[host.Network]; !ok {
			ifaces[host.Network] = []string{}
		}
		ifaces[host.Network] = append(ifaces[host.Network], fmt.Sprintf("%s@%s", host.Subnet, host.Mac))
	}
	networks := []string{}
	for nw, subnets := range ifaces {
		networks = append(networks, fmt.Sprintf(`%s(%s)`, nw, strings.Join(subnets, ", ")))
	}

	row.Cells = append(row.Cells, name, scheduledNode, strings.Join(networks, "\n"))
	return row
}
