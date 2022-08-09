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

package network

import (
	"context"
	"fmt"
	"reflect"

	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
)

const (
	SubnetProvisionedFinalizer = "ordlet.ordiri.com/node"
)

func (r *SubnetReconciler) addNodeFinalizerToSubnet(ctx context.Context, subnet *networkv1alpha1.Subnet) error {
	finalizers := subnet.GetFinalizers()
	found := false
	for _, finalizer := range subnet.GetFinalizers() {
		found = finalizer == r.SubnetNodeFinalizer() || found
	}

	if !found {
		finalizers = append(finalizers, r.SubnetNodeFinalizer())
	}

	if !reflect.DeepEqual(finalizers, subnet.GetFinalizers()) {
		subnet.SetFinalizers(finalizers)
		if err := r.Client.Update(ctx, subnet); err != nil {
			return err
		}
	}
	return nil
}

func (r *SubnetReconciler) removeNodeFinalizerFromSubnet(ctx context.Context, subnet *networkv1alpha1.Subnet) error {
	finalizers := []string{}
	for _, finalizer := range subnet.GetFinalizers() {
		if finalizer == r.SubnetNodeFinalizer() {
			continue
		}
		finalizers = append(finalizers, finalizer)
	}
	if !reflect.DeepEqual(finalizers, subnet.GetFinalizers()) {
		subnet.SetFinalizers(finalizers)
		if err := r.Client.Update(ctx, subnet); err != nil {
			return err
		}
	}
	return nil
}

func (r *SubnetReconciler) SubnetNodeFinalizer() string {
	return fmt.Sprintf("%s-%s", SubnetProvisionedFinalizer, r.Node.GetNode().Name)
}
