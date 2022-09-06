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
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apiserver/pkg/server"
	"k8s.io/klog"
	"sigs.k8s.io/apiserver-runtime/pkg/builder"

	// +kubebuilder:scaffold:resource-imports
	"github.com/ordiri/ordiri/pkg/apis"
	authorizationv1alpha1 "github.com/ordiri/ordiri/pkg/apis/authorization/v1alpha1"
	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	storagev1alpha1 "github.com/ordiri/ordiri/pkg/apis/storage/v1alpha1"
	"github.com/ordiri/ordiri/pkg/generated/openapi"
)

var enablesLocalStandaloneDebugging bool

func main() {
	// builder.APIServer.
	apiBuilder := builder.APIServer.
		WithAdditionalSchemeInstallers(func(s *runtime.Scheme) error {
			return apis.RegisterDefaults(s)
		}).

		// +kubebuilder:scaffold:resource-register
		WithResource(&networkv1alpha1.LoadBalancer{}).
		WithResource(&authorizationv1alpha1.RoleBinding{}).
		WithResource(&authorizationv1alpha1.Role{}).
		WithResource(&authorizationv1alpha1.ServiceAccount{}).
		WithResource(&storagev1alpha1.VolumeClaim{}).
		WithResource(&networkv1alpha1.Router{}).
		WithResource(&storagev1alpha1.Volume{}).
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
		}).
		WithConfigFns(func(config *server.RecommendedConfig) *server.RecommendedConfig {
			config.CorsAllowedOriginList = append(config.CorsAllowedOriginList, "http://localhost:3000")
			return config
		})

	// apiBuilder = WithLocalDebugExtension(apiBuilder)

	err := apiBuilder.Execute()
	if err != nil {
		klog.Fatal(err)
	}
}
