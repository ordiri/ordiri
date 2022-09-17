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
	"os/exec"
	"time"

	apb "google.golang.org/protobuf/types/known/anypb"
	"inet.af/netaddr"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"

	"github.com/ordiri/ordiri/pkg/log"
	api "github.com/osrg/gobgp/v3/api"
	"github.com/osrg/gobgp/v3/pkg/server"

	bgplog "github.com/osrg/gobgp/v3/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/ordiri/ordiri/pkg/ordlet"
	ctrl "sigs.k8s.io/controller-runtime"
	k8log "sigs.k8s.io/controller-runtime/pkg/log"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
)

// BGPSpeakerReconciler reconciles a VirtualMachine object
type BGPSpeakerReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	server *server.BgpServer

	Node ordlet.NodeProvider
}

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the VirtualMachine object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *BGPSpeakerReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := k8log.FromContext(ctx)
	log.V(5).Info("Starting to reconcile", "request", req)
	if r.Node.GetNode().UID == "" {
		log.V(5).Info("requeueing, no node set yet")
		return ctrl.Result{RequeueAfter: time.Second * 1}, nil
	}

	vm := &computev1alpha1.VirtualMachine{}
	if err := r.Client.Get(ctx, req.NamespacedName, vm); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	nodeCidr := netaddr.MustParseIPPrefix(r.Node.GetNode().Spec.PublicCidr)
	for _, iface := range vm.Spec.NetworkInterfaces {
		if !iface.Public {
			continue
		}
		privateIp := ""
		for _, ip := range iface.Ips {
			ipAddr, err := netaddr.ParseIP(ip)
			if err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to parse ip addr %q - %w", ip, err)
			}
			if nodeCidr.Contains(ipAddr) {
				continue
			}
			privateIp = ipAddr.String()
			break
		}
		if privateIp == "" {
			return ctrl.Result{}, fmt.Errorf("missing private ip")
		}
		for _, ip := range iface.Ips {
			ipAddr, err := netaddr.ParseIP(ip)
			if err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to parse ip addr %q - %w", ip, err)
			}
			if !nodeCidr.Contains(ipAddr) {
				log.Info("Skipping IP as it's not a part of this node")
				continue
			}

			// add routes
			nlri, _ := apb.New(&api.IPAddressPrefix{
				Prefix:    ipAddr.String(),
				PrefixLen: 32,
			})

			cmd := exec.Command("ip", "netns", "exec", "ordiri-router-"+iface.Network, "iptables", "-t", "nat", "-A", "PREROUTING", "-i", "prtr-36138-in", "-d", ipAddr.String(), "-j", "DNAT", "--to-destination", privateIp)
			if err := cmd.Run(); err != nil {
				return ctrl.Result{}, err
			}

			a1, _ := apb.New(&api.OriginAttribute{
				Origin: 0,
			})
			a2, _ := apb.New(&api.NextHopAttribute{
				NextHop: "10.0.1.126",
			})

			// a3, _ := apb.New(&api.AsPathAttribute{
			// 	Segments: []*api.AsSegment{
			// 		{
			// 			Type:    2,
			// 			Numbers: []uint32{6762, 39919, 65000, 35753, 65000},
			// 		},
			// 	},
			// })
			// attrs := []*apb.Any{a1, a2, a3}
			attrs := []*apb.Any{a1, a2}

			res, err := r.server.AddPath(context.Background(), &api.AddPathRequest{
				Path: &api.Path{
					Family: &api.Family{Afi: api.Family_AFI_IP, Safi: api.Family_SAFI_UNICAST},
					Nlri:   nlri,
					Pattrs: attrs,
				},
			})
			if err != nil {
				log.Error(err, "error running AddPath")
				return ctrl.Result{}, err
			}
			log.Info("add path response", "res", res)

		}
	}

	if err := r.server.ListPeer(context.Background(), &api.ListPeerRequest{}, func(p *api.Peer) {
		log.Info("Got the peer", "name", p.String())
	}); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{RequeueAfter: time.Second * 30}, nil
}

func (r *BGPSpeakerReconciler) SetupWithManager(mgr ctrl.Manager) error {
	logger := &bgpLogger{logger: mgr.GetLogger()}

	r.server = server.NewBgpServer(server.LoggerOption(logger))
	go r.server.Serve()

	// global configuration
	if err := r.server.StartBgp(context.Background(), &api.StartBgpRequest{
		Global: &api.Global{
			Asn:      65001,
			RouterId: r.Node.GetNode().TunnelAddress(),
			// ListenPort: -1, // gobgp won't listen on tcp:179
		},
	}); err != nil {
		mgr.GetLogger().Error(err, "failed to startup bgp speaker")
	}

	// monitor the change of the peer state
	if err := r.server.WatchEvent(context.Background(), &api.WatchEventRequest{Peer: &api.WatchEventRequest_Peer{}}, func(r *api.WatchEventResponse) {
		// if p := r.GetPeer(); p != nil && p.Type == api.WatchEventResponse_PeerEvent_STATE {
		// }
		mgr.GetLogger().Info(r.String())
	}); err != nil {
		mgr.GetLogger().Error(err, "error running xyz")
		return err
	}

	// neighbor configuration
	peer := &api.Peer{
		Conf: &api.PeerConf{
			NeighborAddress: "10.0.1.1",
			PeerAsn:         65000,
		},
	}

	if err := r.server.AddPeer(context.Background(), &api.AddPeerRequest{
		Peer: peer,
	}); err != nil {
		mgr.GetLogger().Error(err, "error running xyz")
		return err
	}

	return ctrl.NewControllerManagedBy(mgr).
		Named("bgp").
		For(&computev1alpha1.VirtualMachine{}).
		Complete(r)
}

// implement github.com/osrg/gobgp/v3/pkg/log/Logger interface
type bgpLogger struct {
	logger log.Log
}

func (l *bgpLogger) Panic(msg string, fields bgplog.Fields) {
	l.logger.WithValues("fields", fields).Info(msg)
}

func (l *bgpLogger) Fatal(msg string, fields bgplog.Fields) {
	l.logger.WithValues("fields", fields).Info(msg)
}

func (l *bgpLogger) Error(msg string, fields bgplog.Fields) {
	l.logger.WithValues("fields", fields).Info(msg)
}

func (l *bgpLogger) Warn(msg string, fields bgplog.Fields) {
	l.logger.WithValues("fields", fields).Info(msg)
}

func (l *bgpLogger) Info(msg string, fields bgplog.Fields) {
	l.logger.WithValues("fields", fields).Info(msg)
}

func (l *bgpLogger) Debug(msg string, fields bgplog.Fields) {
	l.logger.WithValues("fields", fields).Info(msg)
}

func (l *bgpLogger) SetLevel(level bgplog.LogLevel) {
}

func (l *bgpLogger) GetLevel() bgplog.LogLevel {
	return bgplog.TraceLevel
}
