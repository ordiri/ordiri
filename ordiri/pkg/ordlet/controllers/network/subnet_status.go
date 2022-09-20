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

	k8err "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/client-go/util/retry"
	"sigs.k8s.io/controller-runtime/pkg/client"

	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
)

func (r *SubnetReconciler) addNodeToSubnetStatus(ctx context.Context, subnet *networkv1alpha1.Subnet) error {
	return retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		node := r.Node.GetNode()
		subnetLinksToNode := false
		for _, hostBinding := range subnet.Status.Hosts {
			if hostBinding.Node == node.Name {
				subnetLinksToNode = true
			}
		}

		if !subnetLinksToNode {
			subnet.Status.Hosts = append(subnet.Status.Hosts, networkv1alpha1.HostSubnetStatus{
				Node: node.Name,
			})

			if err := r.Client.Status().Update(ctx, subnet); err != nil {
				return err
			}
		}
		return nil
	})
}
func (r *SubnetReconciler) removeNodeFromSubnetStatus(ctx context.Context, subnet *networkv1alpha1.Subnet) error {
	return retry.RetryOnConflict(retry.DefaultBackoff, func() error {
		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(subnet), subnet); err != nil {
			if k8err.IsNotFound(err) {
				return nil
			}
			return err
		}
		found := false
		newHosts := []networkv1alpha1.HostSubnetStatus{}
		for _, boundHosts := range subnet.Status.Hosts {
			if boundHosts.Node == r.Node.GetNode().Name {
				found = true
				continue
			}
			newHosts = append(newHosts, boundHosts)
		}

		if found {
			subnet.Status.Hosts = newHosts
			if err := r.Client.Status().Update(ctx, subnet); err != nil {
				return err
			}
		}
		return nil
	})
}
