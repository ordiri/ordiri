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
	"context"

	v1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	labels "k8s.io/apimachinery/pkg/labels"
	schema "k8s.io/apimachinery/pkg/runtime/schema"
	types "k8s.io/apimachinery/pkg/types"
	watch "k8s.io/apimachinery/pkg/watch"
	testing "k8s.io/client-go/testing"
)

// FakeRoutes implements RouteInterface
type FakeRoutes struct {
	Fake *FakeNetworkV1alpha1
}

var routesResource = schema.GroupVersionResource{Group: "network.ordiri.com", Version: "v1alpha1", Resource: "routes"}

var routesKind = schema.GroupVersionKind{Group: "network.ordiri.com", Version: "v1alpha1", Kind: "Route"}

// Get takes name of the route, and returns the corresponding route object, and an error if there is any.
func (c *FakeRoutes) Get(ctx context.Context, name string, options v1.GetOptions) (result *v1alpha1.Route, err error) {
	obj, err := c.Fake.
		Invokes(testing.NewRootGetAction(routesResource, name), &v1alpha1.Route{})
	if obj == nil {
		return nil, err
	}
	return obj.(*v1alpha1.Route), err
}

// List takes label and field selectors, and returns the list of Routes that match those selectors.
func (c *FakeRoutes) List(ctx context.Context, opts v1.ListOptions) (result *v1alpha1.RouteList, err error) {
	obj, err := c.Fake.
		Invokes(testing.NewRootListAction(routesResource, routesKind, opts), &v1alpha1.RouteList{})
	if obj == nil {
		return nil, err
	}

	label, _, _ := testing.ExtractFromListOptions(opts)
	if label == nil {
		label = labels.Everything()
	}
	list := &v1alpha1.RouteList{ListMeta: obj.(*v1alpha1.RouteList).ListMeta}
	for _, item := range obj.(*v1alpha1.RouteList).Items {
		if label.Matches(labels.Set(item.Labels)) {
			list.Items = append(list.Items, item)
		}
	}
	return list, err
}

// Watch returns a watch.Interface that watches the requested routes.
func (c *FakeRoutes) Watch(ctx context.Context, opts v1.ListOptions) (watch.Interface, error) {
	return c.Fake.
		InvokesWatch(testing.NewRootWatchAction(routesResource, opts))
}

// Create takes the representation of a route and creates it.  Returns the server's representation of the route, and an error, if there is any.
func (c *FakeRoutes) Create(ctx context.Context, route *v1alpha1.Route, opts v1.CreateOptions) (result *v1alpha1.Route, err error) {
	obj, err := c.Fake.
		Invokes(testing.NewRootCreateAction(routesResource, route), &v1alpha1.Route{})
	if obj == nil {
		return nil, err
	}
	return obj.(*v1alpha1.Route), err
}

// Update takes the representation of a route and updates it. Returns the server's representation of the route, and an error, if there is any.
func (c *FakeRoutes) Update(ctx context.Context, route *v1alpha1.Route, opts v1.UpdateOptions) (result *v1alpha1.Route, err error) {
	obj, err := c.Fake.
		Invokes(testing.NewRootUpdateAction(routesResource, route), &v1alpha1.Route{})
	if obj == nil {
		return nil, err
	}
	return obj.(*v1alpha1.Route), err
}

// UpdateStatus was generated because the type contains a Status member.
// Add a +genclient:noStatus comment above the type to avoid generating UpdateStatus().
func (c *FakeRoutes) UpdateStatus(ctx context.Context, route *v1alpha1.Route, opts v1.UpdateOptions) (*v1alpha1.Route, error) {
	obj, err := c.Fake.
		Invokes(testing.NewRootUpdateSubresourceAction(routesResource, "status", route), &v1alpha1.Route{})
	if obj == nil {
		return nil, err
	}
	return obj.(*v1alpha1.Route), err
}

// Delete takes name of the route and deletes it. Returns an error if one occurs.
func (c *FakeRoutes) Delete(ctx context.Context, name string, opts v1.DeleteOptions) error {
	_, err := c.Fake.
		Invokes(testing.NewRootDeleteActionWithOptions(routesResource, name, opts), &v1alpha1.Route{})
	return err
}

// DeleteCollection deletes a collection of objects.
func (c *FakeRoutes) DeleteCollection(ctx context.Context, opts v1.DeleteOptions, listOpts v1.ListOptions) error {
	action := testing.NewRootDeleteCollectionAction(routesResource, listOpts)

	_, err := c.Fake.Invokes(action, &v1alpha1.RouteList{})
	return err
}

// Patch applies the patch and returns the patched route.
func (c *FakeRoutes) Patch(ctx context.Context, name string, pt types.PatchType, data []byte, opts v1.PatchOptions, subresources ...string) (result *v1alpha1.Route, err error) {
	obj, err := c.Fake.
		Invokes(testing.NewRootPatchSubresourceAction(routesResource, name, pt, data, subresources...), &v1alpha1.Route{})
	if obj == nil {
		return nil, err
	}
	return obj.(*v1alpha1.Route), err
}
