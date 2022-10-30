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
	"encoding/json"
	"fmt"
	"os/exec"
	"strings"
	"time"

	"inet.af/netaddr"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"

	"github.com/ordiri/ordiri/pkg/network/bgp"
	"github.com/ordiri/ordiri/pkg/network/sdn"

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

	speaker *bgp.Speaker

	PublicCidr  netaddr.IPPrefix
	GatewayCidr netaddr.IPPrefix
	Node        ordlet.NodeProvider
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
	node, isScheduled := vm.ScheduledNode()
	if !isScheduled {
		return ctrl.Result{RequeueAfter: time.Second * 5}, nil
	}
	if node != r.Node.GetNode().Name {
		return ctrl.Result{}, nil
	}

	for _, iface := range vm.Spec.NetworkInterfaces {
		if !iface.Public {
			continue
		}
		vmInternalIp := ""
		for _, ip := range iface.Ips {
			ipAddr, err := netaddr.ParseIPPrefix(ip)
			if err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to parse ip addr %q - %w", ip, err)
			}
			if r.PublicCidr.Contains(ipAddr.IP()) {
				continue
			}
			vmInternalIp = ipAddr.IP().String()
			break
		}
		if vmInternalIp == "" {
			return ctrl.Result{}, fmt.Errorf("missing private ip")
		}
		for _, ip := range iface.Ips {
			vmPublicIp, err := netaddr.ParseIPPrefix(ip)
			if err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to parse ip addr %q - %w", ip, err)
			}
			if !r.PublicCidr.Contains(vmPublicIp.IP()) {
				log.Info("Skipping IP as it's not a part of the public range")
				continue
			}

			ipCmd := exec.Command("ip", "netns", "exec", "ordiri-router-"+iface.Network, "ip", "-json", "a")
			out, err := ipCmd.Output()
			if err != nil {
				return ctrl.Result{}, err
			}

			type IpRes struct {
				Name  string `json:"ifname"`
				Addrs []struct {
					Ip    netaddr.IP `json:"local"`
					Scope string     `json:"scope"`
				} `json:"addr_info"`
			}

			res := []*IpRes{}
			if err := json.Unmarshal(out, &res); err != nil {
				return ctrl.Result{}, err
			}

			routerInterface := ""
			routerIp := netaddr.IP{}
			//todo: we have this in the status now on the network as it's external gateway ip
			for _, iface := range res {
				if !strings.HasPrefix(iface.Name, "prtr") {
					continue
				}
				for _, addr := range iface.Addrs {
					if addr.Scope != "global" {
						continue
					}
					if addr.Ip.Is4() {
						routerInterface = iface.Name
						routerIp = addr.Ip
						break
					}
				}
			}

			if routerInterface == "" {
				return ctrl.Result{}, fmt.Errorf("unable to determine public router interface name")
			}

			ipt, err := sdn.Iptables("ordiri-router-" + iface.Network)
			if err != nil {
				return ctrl.Result{}, err
			}

			if err := ipt.AppendUnique("nat", "PREROUTING", "-i", routerInterface, "-d", vmPublicIp.IP().String(), "-j", "DNAT", "--to-destination", vmInternalIp); err != nil {
				return ctrl.Result{}, err
			}

			if r.speaker == nil {
				log.Info("not announcing as no speaker configured")
				return ctrl.Result{}, nil
			}

			log.V(5).Info("Announcing ip", "vmPublicIp", vmPublicIp, "routerIp", routerIp)
			if err := r.speaker.Announce(ctx, vmPublicIp.IP(), routerIp); err != nil {
				log.Error(err, "error announcing ip")
				return ctrl.Result{}, err
			}
		}
	}

	return ctrl.Result{RequeueAfter: time.Second * 30}, nil
}

func (r *BGPSpeakerReconciler) SetupWithManager(mgr ctrl.Manager, speaker *bgp.Speaker) error {
	r.speaker = speaker

	return ctrl.NewControllerManagedBy(mgr).
		Named("bgp").
		For(&computev1alpha1.VirtualMachine{}).
		Complete(r)
}
