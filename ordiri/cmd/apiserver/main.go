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
limitations under the License.
*/

package main

import (
	"net"

	"github.com/spf13/pflag"
	"k8s.io/klog"
	"sigs.k8s.io/apiserver-runtime/pkg/builder"

	// +kubebuilder:scaffold:resource-imports
	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/generated/openapi"
)

var enablesLocalStandaloneDebugging bool

type extraColumnStrategy struct {
	builder.DefaultStrategy
}

func main() {
	apiBuilder := builder.APIServer.
		// +kubebuilder:scaffold:resource-register
		// WithResourceAndStrategy(&corev1alpha1.Node{}, extraColumnStrategy{
		// 	DefaultStrategy: builder.DefaultStrategy{

		// 		Object:         &corev1alpha1.Node{},
		// 		ObjectTyper:    builder.APIServer.,
		// 		TableConvertor: rest.NewDefaultTableConvertor((&corev1alpha1.Node{}).GetGroupVersionResource().GroupResource()),
		// 	},
		// }).
		WithResource(&corev1alpha1.Node{}).
		WithResource(&computev1alpha1.VirtualMachineDeployment{}).
		WithResource(&computev1alpha1.VirtualMachineReplicaSet{}).
		WithResource(&computev1alpha1.VirtualMachine{}).
		WithResource(&networkv1alpha1.Subnet{}).
		WithResource(&networkv1alpha1.RouteTable{}).
		WithResource(&networkv1alpha1.Route{}).
		WithResource(&networkv1alpha1.Subnet{}).
		WithResource(&networkv1alpha1.Network{}).
		WithResource(&corev1alpha1.MachineProfile{}).
		WithResource(&corev1alpha1.Machine{}).
		WithOpenAPIDefinitions("openapi", "v1", openapi.GetOpenAPIDefinitions).
		// WithLocalDebugExtension(). // We can't use this because we actually want to bind to ::/: and this explicitly blocks local bindings
		DisableAuthorization().
		WithOptionsFns(func(options *builder.ServerOptions) *builder.ServerOptions {
			options.RecommendedOptions.CoreAPI = nil
			options.RecommendedOptions.Admission = nil
			options.RecommendedOptions.SecureServing.BindAddress = net.IPv6unspecified
			options.RecommendedOptions.Authorization = nil
			options.RecommendedOptions.Authentication.RemoteKubeConfigFileOptional = true
			return options
		}).
		WithFlagFns(func(set *pflag.FlagSet) *pflag.FlagSet {
			set.BoolVar(&enablesLocalStandaloneDebugging, "standalone-debug-mode", false,
				"Under the local-debug mode the apiserver will allow all access to its resources without "+
					"authorizing the requests, this flag is only intended for debugging in your workstation "+
					"and the apiserver will be crashing if its binding address is not 127.0.0.1.")
			return set
		})

	// apiBuilder = WithLocalDebugExtension(apiBuilder)

	err := apiBuilder.Execute()
	if err != nil {
		klog.Fatal(err)
	}
}
