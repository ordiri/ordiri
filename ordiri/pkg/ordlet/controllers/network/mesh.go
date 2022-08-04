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
	"strings"
	"time"

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	k8log "sigs.k8s.io/controller-runtime/pkg/log"

	"github.com/digitalocean/go-openvswitch/ovs"
	"github.com/ordiri/ordiri/pkg/network/sdn"
	"github.com/ordiri/ordiri/pkg/ordlet"

	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

// MeshReconciler reconciles a VirtualMachine object
type MeshReconciler struct {
	client.Client
	Scheme *runtime.Scheme

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
func (r *MeshReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := k8log.FromContext(ctx)
	log.V(5).Info("Starting to reconcile", "request", req)
	if r.Node.GetNode().UID == "" {
		log.V(5).Info("requeueing, no node set yet")
		return ctrl.Result{RequeueAfter: time.Second * 1}, nil
	}

	node := &corev1alpha1.Node{}
	if err := r.Client.Get(ctx, req.NamespacedName, node); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	thisNode := r.Node.GetNode()

	// TODO: This needs to set the full tunnel properties like
	// df_default and local_ip
	if !strings.EqualFold(thisNode.Name, node.Name) {
		ovsClient := sdn.Ovs()
		portName := "mesh-tun-" + node.Name
		ovsClient.VSwitch.AddPort(sdn.TunnelSwitchName, portName)
		ovsClient.VSwitch.Set.Interface(portName, ovs.InterfaceOptions{
			Type:     ovs.InterfaceTypeVXLAN,
			RemoteIP: node.TunnelAddress(),
			Key:      "flow",
			ExtraArgs: []ovs.ExtraArg{
				func() []string {
					return []string{"options:df_default=true"}
				},
				func() []string {
					return []string{fmt.Sprintf("options:local_ip=%s", r.Node.GetNode().TunnelAddress())}
				},
			},
		})
	}

	return ctrl.Result{}, nil
}

func (r *MeshReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&corev1alpha1.Node{}).
		Complete(r)
}
