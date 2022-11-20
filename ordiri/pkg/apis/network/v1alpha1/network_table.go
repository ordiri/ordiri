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
	"strings"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"sigs.k8s.io/apiserver-runtime/pkg/builder/resource/resourcestrategy"
)

var _ resourcestrategy.TableConverter = &Network{}
var _ resourcestrategy.TableConverter = &NetworkList{}

var (
	networkTableDefinitions = []metav1.TableColumnDefinition{
		{Name: "Name", Type: "string", Format: "name", Description: "the name of the network"},
		{Name: "CIDR", Type: "string", Format: "string", Description: "The CIDR assigned to this network"},
		{Name: "CIDR6", Type: "string", Format: "string", Description: "The IPv6 CIDR assigned to this network"},
		{Name: "VNI", Type: "string", Format: "string", Description: "The VXLan Tunnel ID in use for this network"},
		{Name: "Hosts", Type: "string", Format: "string", Description: "The hosts this network is running on"},
	}
)

func (in *Network) ConvertToTable(ctx context.Context, tableOptions runtime.Object) (*metav1.Table, error) {
	return &metav1.Table{
		ColumnDefinitions: networkTableDefinitions,
		Rows:              []metav1.TableRow{getNetworkTableRow(in)},
	}, nil
}

func (in *NetworkList) ConvertToTable(ctx context.Context, tableOptions runtime.Object) (*metav1.Table, error) {
	t := &metav1.Table{
		ColumnDefinitions: networkTableDefinitions,
	}
	for _, c := range in.Items {
		t.Rows = append(t.Rows, getNetworkTableRow(&c))
	}
	return t, nil
}

func getNetworkTableRow(c *Network) metav1.TableRow {
	name := c.Name
	row := metav1.TableRow{
		Object: runtime.RawExtension{Object: c},
	}
	hosts := []string{}
	for _, host := range c.Status.Hosts {
		hosts = append(hosts, host.Node)
	}
	row.Cells = append(row.Cells, name, c.Spec.Cidr, c.Spec.Cidr6, c.Status.Vni, strings.Join(hosts, ", "))
	return row
}
