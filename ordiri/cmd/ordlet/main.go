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
	"log"
	"net"
	"os"
	"strings"

	// Import all Kubernetes client auth plugins (e.g. Azure, GCP, OIDC, etc.)
	// to ensure that exec-entrypoint and run can make use of them.
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"inet.af/netaddr"
	_ "k8s.io/client-go/plugin/pkg/client/auth"

	"k8s.io/apimachinery/pkg/runtime"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/healthz"
	"sigs.k8s.io/controller-runtime/pkg/log/zap"

	"github.com/ordiri/ordiri/config"
	"github.com/ordiri/ordiri/pkg/apis"
	"github.com/ordiri/ordiri/pkg/generated/clientset/versioned"
	nwman "github.com/ordiri/ordiri/pkg/network"
	"github.com/ordiri/ordiri/pkg/network/api"
	"github.com/ordiri/ordiri/pkg/network/bgp"
	"github.com/ordiri/ordiri/pkg/network/driver/linux"
	"github.com/ordiri/ordiri/pkg/ordlet"
	"github.com/ordiri/ordiri/pkg/ordlet/controllers/compute"
	"github.com/ordiri/ordiri/pkg/ordlet/controllers/network"
	"github.com/ordiri/ordiri/pkg/ordlet/controllers/storage"
	"github.com/ordiri/ordiri/version"
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
	var probeAddr string
	var nodeRole string
	var nodeName string
	var networkDriver string
	var publicCidrStr string
	var gatewayCidrStr string
	var mgmtCidrStr string
	var bgpPeerAsn uint
	var bgpPeerIp string
	var ipamAddr string
	hostname, err := os.Hostname()
	if err != nil {
		panic("unable to determine hostname - " + err.Error())
	}
	flag.StringVar(&metricsAddr, "metrics-bind-address", ":8085", "The address the metric endpoint binds to.")
	flag.StringVar(&probeAddr, "health-probe-bind-address", ":8086", "The address the probe endpoint binds to.")
	flag.StringVar(&nodeRole, "role", "compute,network,storage", "The roles this node has")
	flag.StringVar(&networkDriver, "network-driver", "linux", "The driver for network operations on this node")
	flag.StringVar(&mgmtCidrStr, "mgmt-cidr", config.ManagementCidr.String(), "The upstream management network cidr")
	flag.StringVar(&publicCidrStr, "public-cidr", config.VmPublicCidr.String(), "The public cidr in use")
	flag.StringVar(&gatewayCidrStr, "gateway-cidr", config.NetworkInternetGatewayCidr.String(), "The range of ip's used to egress vm traffic to the network")
	flag.StringVar(&bgpPeerIp, "bgp-peer-ip", config.BgpPeerIp.String(), "Ip of the upstream router to send BGP announcements to")
	flag.StringVar(&ipamAddr, "ipam", config.IpamAddr, "Ip of the upstream router to send BGP announcements to")
	flag.UintVar(&bgpPeerAsn, "bgp-peer-asn", config.BgpPeerAsn, "The asn of the peer")
	flag.StringVar(&nodeName, "name", hostname, "The name this node has")
	opts := zap.Options{
		Development: true,
	}
	opts.BindFlags(flag.CommandLine)
	flag.Parse()

	// Set up a connection to the server.
	conn, err := grpc.Dial(ipamAddr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	allocator := api.NewAddressAllocatorClient(conn)
	_ = allocator

	_, mgmtNetwork, err := net.ParseCIDR(mgmtCidrStr)
	if err != nil {
		setupLog.Error(err, "unable to decode node mgmt cidr", "cidr", mgmtCidrStr)
		os.Exit(1)
	}
	gatewayCidr, err := netaddr.ParseIPPrefix(gatewayCidrStr)
	if err != nil {
		setupLog.Error(err, "unable to decode node mgmt cidr", "cidr", mgmtCidrStr)
		os.Exit(1)
	}

	ctrl.SetLogger(zap.New(zap.UseFlagOptions(&opts)).WithValues("host", hostname).WithValues("version", version.BuildTime))

	mgr, err := ctrl.NewManager(ctrl.GetConfigOrDie(), ctrl.Options{
		Scheme:                 scheme,
		MetricsBindAddress:     metricsAddr,
		Port:                   9443,
		HealthProbeBindAddress: probeAddr,
		LeaderElection:         false,
	})

	publicCidr := netaddr.MustParseIPPrefix(publicCidrStr)

	if err != nil {
		setupLog.Error(err, "unable to start manager")
		os.Exit(1)
	}

	nodeRoles := strings.Split(nodeRole, ",")
	nodeRunner := ordlet.NewNodeRunnable(mgmtNetwork, nodeName, nodeRoles)
	c, e := versioned.NewForConfig(mgr.GetConfig())
	if e != nil {
		setupLog.Error(err, "unable to start manager")
		os.Exit(1)
	}
	nodeRunner.InjectClient(c)
	nodeRunner.InjectLogger(mgr.GetLogger())
	if err := nodeRunner.Start(context.Background()); err != nil {
		setupLog.Error(err, "unable to start node manager")
		os.Exit(1)
	}
	node := nodeRunner.GetNode()

	bgpIP := netaddr.MustParseIP(bgpPeerIp)
	speaker := bgp.NewSpeaker(node.MgmtAddress(), uint32(bgpPeerAsn), bgpIP)
	mgr.Add(speaker)

	setupLog.Info("Starting network manager")
	nwManager, err := getNetworkManager(speaker, networkDriver)
	if err != nil {
		setupLog.Error(err, "unable to create network manager")
		os.Exit(1)
	}

	setupLog.Info("Starting controllers")
	if err = (&network.NetworkReconciler{
		Client:         mgr.GetClient(),
		Scheme:         mgr.GetScheme(),
		Node:           nodeRunner,
		NetworkManager: nwManager,
		PublicCidr:     publicCidr,
		GatewayCidr:    gatewayCidr,
		Allocator:      allocator,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Network")
		os.Exit(1)
	}

	if err = (&network.SubnetReconciler{
		Client:         mgr.GetClient(),
		Scheme:         mgr.GetScheme(),
		Node:           nodeRunner,
		NetworkManager: nwManager,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Subnet")
		os.Exit(1)
	}

	if err = (&network.MeshReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
		Node:   nodeRunner,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Mesh")
		os.Exit(1)
	}

	if err = (&network.RouterReconciler{
		Client:         mgr.GetClient(),
		Scheme:         mgr.GetScheme(),
		Node:           nodeRunner,
		NetworkManager: nwManager,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Router")
		os.Exit(1)
	}
	if err = (&storage.VolumeReconciler{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
		Node:   nodeRunner,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "Volume")
		os.Exit(1)
	}

	if err = (&compute.VirtualMachineReconciler{
		Client:         mgr.GetClient(),
		Scheme:         mgr.GetScheme(),
		Node:           nodeRunner,
		NetworkManager: nwManager,
		PublicCidr:     publicCidr,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "VirtualMachine")
		os.Exit(1)
	}
	if err = (&compute.MachineMetadataController{
		Client: mgr.GetClient(),
		Scheme: mgr.GetScheme(),
		Port:   9090,
	}).SetupWithManager(mgr); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "MachineMetadataController")
		os.Exit(1)
	}

	if err = (&network.BGPSpeakerReconciler{
		Client:      mgr.GetClient(),
		Scheme:      mgr.GetScheme(),
		Node:        nodeRunner,
		PublicCidr:  publicCidr,
		GatewayCidr: gatewayCidr,
	}).SetupWithManager(mgr, nwManager.GetSpeaker()); err != nil {
		setupLog.Error(err, "unable to create controller", "controller", "BGPSpeaker")
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

	mgr.Add(nwManager)

	setupLog.Info("starting manager")
	if err := mgr.Start(ctrl.SetupSignalHandler()); err != nil {
		setupLog.Error(err, "problem running manager")
		os.Exit(1)
	}
}

func getNetworkManager(speaker *bgp.Speaker, driverName string) (api.RunnableManager, error) {
	if driverName == "linux" {

		driver, err := linux.New()
		if err != nil {
			return nil, err
		}

		return nwman.NewManager(speaker, driver)

	}
	panic("unknown driver " + driverName)
}
