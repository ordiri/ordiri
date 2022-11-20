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
	"context"
	"flag"
	"fmt"
	"os"
	"time"

	"go.uber.org/zap/zapcore"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	_ "k8s.io/client-go/plugin/pkg/client/auth"

	"k8s.io/apimachinery/pkg/runtime"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/healthz"
	"sigs.k8s.io/controller-runtime/pkg/log/zap"

	"github.com/ordiri/ordiri/config"
	authorizationcontrollers "github.com/ordiri/ordiri/controllers/authorization"
	computecontrollers "github.com/ordiri/ordiri/controllers/compute"
	corecontrollers "github.com/ordiri/ordiri/controllers/core"
	networkcontrollers "github.com/ordiri/ordiri/controllers/network"
	storagecontrollers "github.com/ordiri/ordiri/controllers/storage"
	"github.com/ordiri/ordiri/pkg/apis"
	"github.com/ordiri/ordiri/pkg/network/api"
	//+kubebuilder:scaffold:imports
)

var (
	scheme   = runtime.NewScheme()
	setupLog = ctrl.Log.WithName("setup")
)

func init() {
	utilruntime.Must(clientgoscheme.AddToScheme(scheme))
	utilruntime.Must(apis.AddToScheme(scheme))
	utilruntime.Must(apis.RegisterDefaults(scheme))

	//+kubebuilder:scaffold:scheme
}

func main() {
	var metricsAddr string
	var enableLeaderElection bool
	var probeAddr string
	var publicCidrStr string
	var publicV6CidrStr string
	var gatewayCidrStr string
	var gatewayV6CidrStr string
	var mgmtCidrStr string
	var mgmtV6CidrStr string
	var ipamAddr string
	flag.StringVar(&metricsAddr, "metrics-bind-address", ":8080", "The address the metric endpoint binds to.")
	flag.StringVar(&probeAddr, "health-probe-bind-address", ":8081", "The address the probe endpoint binds to.")
	flag.StringVar(&mgmtCidrStr, "mgmt-cidr", config.ManagementCidr.String(), "The upstream management network cidr")
	flag.StringVar(&mgmtV6CidrStr, "mgmt-ipv6-cidr", config.ManagementV6Cidr.String(), "The upstream management network cidr")
	flag.StringVar(&publicCidrStr, "public-cidr", config.VmPublicCidr.String(), "The public cidr in use")
	flag.StringVar(&publicV6CidrStr, "public-ipv6-cidr", config.VmPublicV6Cidr.String(), "The public cidr in use")
	flag.StringVar(&gatewayCidrStr, "gateway-cidr", config.NetworkInternetGatewayCidr.String(), "The range of ip's used to egress vm traffic to the network")
	flag.StringVar(&gatewayV6CidrStr, "gateway-ipv6-cidr", config.NetworkInternetGatewayV6Cidr.String(), "The range of ip's used to egress vm traffic to the network")
	flag.StringVar(&ipamAddr, "ipam", config.IpamAddr, "Ip of the upstream router to send BGP announcements to")
	flag.BoolVar(&enableLeaderElection, "leader-elect", false,
		"Enable leader election for controller manager. "+
			"Enabling this will ensure there is only one active controller manager.")
	opts := zap.Options{
		Development: true,
		Level:       zapcore.Level(-10),
	}
	opts.BindFlags(flag.CommandLine)
	flag.Parse()

	ctrl.SetLogger(zap.New(zap.UseFlagOptions(&opts)))

	cfg := ctrl.GetConfigOrDie()
	mgr, err := ctrl.NewManager(cfg, ctrl.Options{
		Scheme:                 scheme,
		MetricsBindAddress:     metricsAddr,
		Port:                   9443,
		HealthProbeBindAddress: probeAddr,
		LeaderElection:         enableLeaderElection,
		LeaderElectionID:       "3062350d.",
	})
	if err != nil {
		setupLog.Error(err, "unable to start manager")
		os.Exit(1)
	}

	// Set up a connection to the server.
	conn, err := grpc.Dial(ipamAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {

		setupLog.Error(err, "unable to connect to allocator")
		os.Exit(1)
	}
	defer conn.Close()
	allocator := api.NewAddressAllocatorClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	cidrs := map[string]string{
		"mgmt":     mgmtCidrStr,
		"mgmt6":    mgmtV6CidrStr,
		"public":   publicCidrStr,
		"public6":  publicV6CidrStr,
		"gateway":  gatewayCidrStr,
		"gateway6": gatewayV6CidrStr,
	}

	for k, v := range cidrs {
		res, err := allocator.RegisterBlock(ctx, &api.RegisterBlockRequest{
			BlockName: fmt.Sprintf("_shared::%s", k),
			Ranges: []*api.AllocatableRange{
				{
					CIDR: v,
				},
			},
		})
		if err != nil {
			setupLog.Error(err, "unable to register shared cidr ranges")
			os.Exit(1)
		}

		setupLog.Info("registered ip ranges", "name", res.BlockName, "ranges", res.Ranges)
	}

	if err = (&corecontrollers.MachineReconciler{
		Client: mgr.GetClient(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Machine")
		os.Exit(1)
	}
	if err = (&corecontrollers.MachineProfileReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "MachineProfile")
		os.Exit(1)
	}
	if err = (&networkcontrollers.NetworkReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Network")
		os.Exit(1)
	}
	if err = (&networkcontrollers.RouteTableReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "RouteTable")
		os.Exit(1)
	}
	if err = (&networkcontrollers.NodeSubnetVlanAllocator{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Subnet")
		os.Exit(1)
	}
	if err = (&networkcontrollers.VmIpAllocator{
		Client:      mgr.GetClient(),
		Scheme:      mgr.GetScheme(),
		PublicCidr:  config.VmPublicCidr,
		Public6Cidr: config.VmPublicV6Cidr,
		Allocator:   allocator,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "VmIpAllocator")
		os.Exit(1)
	}
	if err = (&networkcontrollers.RouterReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Router")
		os.Exit(1)
	}

	if err = (&computecontrollers.VirtualMachineReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "VirtualMachine")
		os.Exit(1)
	}
	if err = (&computecontrollers.VirtualMachineReplicaSetReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "VirtualMachineReplicaSet")
		os.Exit(1)
	}
	if err = (&computecontrollers.VirtualMachineDeploymentReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "VirtualMachineDeployment")
		os.Exit(1)
	}
	if err = (&corecontrollers.NodeReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Node")
		os.Exit(1)
	}
	if err = (&storagecontrollers.VolumeReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Volume")
		os.Exit(1)
	}
	if err = (&storagecontrollers.VolumeClaimReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "VolumeClaim")
		os.Exit(1)
	}
	if err = (&authorizationcontrollers.ServiceAccountReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "ServiceAccount")
		os.Exit(1)
	}
	// if err = (&authorizationcontrollers.RoleReconciler{
	// 	Client: mgr.GetClient(),
	// 	Scheme: mgr.GetScheme(),
	// }).SetupWithManager(mgr); err != nil {
	// 	setupLog.Error(err, "unable to create controller", "controller", "Role")
	// 	os.Exit(1)
	// }
	// if err = (&authorizationcontrollers.RoleBindingReconciler{
	// 	Client: mgr.GetClient(),
	// 	Scheme: mgr.GetScheme(),
	// }).SetupWithManager(mgr); err != nil {
	// 	setupLog.Error(err, "unable to create controller", "controller", "RoleBinding")
	// 	os.Exit(1)
	// }
	if err = (&networkcontrollers.LoadBalancerReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "LoadBalancer")
		os.Exit(1)
	}
	//+kubebuilder:scaffold:builder

	if err := mgr.AddHealthzCheck("healthz", healthz.Ping); err != nil {
		setupLog.Error(err, "unable to set up health check")
		os.Exit(1)
	}
	if err := mgr.AddReadyzCheck("readyz", healthz.Ping); err != nil {
		setupLog.Error(err, "unable to set up ready check")
		os.Exit(1)
	}

	// mgr.GetCache().WaitForCacheSync()

	setupLog.Info("starting manager")
	if err := mgr.Start(ctrl.SetupSignalHandler()); err != nil {
		setupLog.Error(err, "problem running manager")
		os.Exit(1)
	}
}
