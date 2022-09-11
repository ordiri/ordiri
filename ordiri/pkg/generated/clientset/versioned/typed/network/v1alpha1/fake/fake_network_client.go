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
// Code generated by client-gen. DO NOT EDIT.

package fake

import (
	v1alpha1 "github.com/ordiri/ordiri/pkg/generated/clientset/versioned/typed/network/v1alpha1"
	rest "k8s.io/client-go/rest"
	testing "k8s.io/client-go/testing"
)

type FakeNetworkV1alpha1 struct {
	*testing.Fake
}

func (c *FakeNetworkV1alpha1) LoadBalancers(namespace string) v1alpha1.LoadBalancerInterface {
	return &FakeLoadBalancers{c, namespace}
}

func (c *FakeNetworkV1alpha1) Networks(namespace string) v1alpha1.NetworkInterface {
	return &FakeNetworks{c, namespace}
}

func (c *FakeNetworkV1alpha1) Routes(namespace string) v1alpha1.RouteInterface {
	return &FakeRoutes{c, namespace}
}

func (c *FakeNetworkV1alpha1) RouteTables(namespace string) v1alpha1.RouteTableInterface {
	return &FakeRouteTables{c, namespace}
}

func (c *FakeNetworkV1alpha1) Routers(namespace string) v1alpha1.RouterInterface {
	return &FakeRouters{c, namespace}
}

func (c *FakeNetworkV1alpha1) Subnets(namespace string) v1alpha1.SubnetInterface {
	return &FakeSubnets{c, namespace}
}

// RESTClient returns a RESTClient that is used to communicate
// with API server by this client implementation.
func (c *FakeNetworkV1alpha1) RESTClient() rest.Interface {
	var ret *rest.RESTClient
	return ret
}
