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

	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
)

// NodeSubnetVlanAllocator reconciles a Subnet object
type NodeSubnetVlanAllocator struct {
	client.Client
	Scheme *runtime.Scheme
}

const (
// FinalizerNameSubnetAllocated = "core.ordiri.com/subnet-allocated"
)
const VirtualMachineByNode = ".internal.node"

//+kubebuilder:rbac:groups=network,resources=subnets,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=network,resources=subnets/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=network,resources=subnets/finalizers,verbs=update

// Reconcile needs a serious rewrite
func (r *NodeSubnetVlanAllocator) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)
	n := &corev1alpha1.Node{}
	if err := r.Client.Get(ctx, req.NamespacedName, n); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}
	changed := false

	previouslyAllocatedVlanNumbers := map[int]bool{}
	previouslyAllocatedSubnets := map[string]corev1alpha1.NodeSubnetStatus{}
	for _, subnet := range n.Status.Subnets {
		if _, ok := previouslyAllocatedSubnets[subnet.ObjectReference.Name]; ok {
			changed = true
		}
		previouslyAllocatedSubnets[subnet.ObjectReference.Name] = subnet
		if _, exists := previouslyAllocatedVlanNumbers[subnet.VlanId]; exists {
			log.Info("already allocated", "subnet", subnet)

		}
		previouslyAllocatedVlanNumbers[subnet.VlanId] = true
	}

	previouslyAllocatedNetworks := map[string]corev1alpha1.NodeNetworkStatus{}
	for _, network := range n.Status.Networks {
		if _, ok := previouslyAllocatedNetworks[network.ObjectReference.Name]; ok {
			changed = true
		}
		previouslyAllocatedNetworks[network.ObjectReference.Name] = network
	}

	getNextUnallocatedVlan := func() int {
		vlan := 1
		for {
			if _, isAllocated := previouslyAllocatedVlanNumbers[vlan]; !isAllocated {
				previouslyAllocatedVlanNumbers[vlan] = true
				break
			}
			vlan += 1
		}
		return vlan
	}

	hostSubnets := map[string]corev1alpha1.NodeSubnetStatus{}
	hostNetworks := map[string]corev1alpha1.NodeNetworkStatus{}

	for _, existing := range n.Status.VirtualMachines {
		vm := &computev1alpha1.VirtualMachine{}
		vm.Name = existing.Name
		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(vm), vm); err != nil {
			return ctrl.Result{}, err
		}
		for _, iface := range vm.Spec.NetworkInterfaces {
			if _, ok := hostNetworks[iface.Network]; !ok {
				if _, ok := previouslyAllocatedNetworks[iface.Network]; ok {
					hostNetworks[iface.Network] = previouslyAllocatedNetworks[iface.Network]
					delete(previouslyAllocatedNetworks, iface.Network)
				} else {
					nw := &networkv1alpha1.Network{}
					nw.Name = iface.Network
					if err := r.Client.Get(ctx, client.ObjectKeyFromObject(nw), nw); err != nil {
						return ctrl.Result{}, err
					}
					hostNetworks[iface.Network] = corev1alpha1.NodeNetworkStatus{
						ObjectReference: v1.ObjectReference{
							Kind:       nw.Kind,
							Name:       nw.Name,
							UID:        nw.UID,
							APIVersion: nw.APIVersion,
						},
					}
					changed = true
				}
			}
			subnets := &networkv1alpha1.SubnetList{}
			if err := r.Client.List(ctx, subnets, client.MatchingFields{SubnetByNetworkKey: iface.Network}); err != nil {
				return ctrl.Result{}, err
			}

			for _, sn := range subnets.Items {
				if _, ok := hostSubnets[sn.Name]; !ok {
					if _, ok := previouslyAllocatedSubnets[sn.Name]; ok {
						hostSubnets[sn.Name] = previouslyAllocatedSubnets[sn.Name]
						delete(previouslyAllocatedSubnets, sn.Name)
					} else {
						subnet := &networkv1alpha1.Subnet{}
						subnet.Name = sn.Name
						if err := r.Client.Get(ctx, client.ObjectKeyFromObject(subnet), subnet); err != nil {
							return ctrl.Result{}, err
						}
						hostSubnets[sn.Name] = corev1alpha1.NodeSubnetStatus{
							ObjectReference: v1.ObjectReference{
								Kind:       subnet.Kind,
								Name:       subnet.Name,
								UID:        subnet.UID,
								APIVersion: subnet.APIVersion,
							},
							VlanId: getNextUnallocatedVlan(),
						}
						changed = true
					}
				}
			}
		}
	}

	if len(previouslyAllocatedNetworks) > 0 || len(previouslyAllocatedSubnets) > 0 || changed {
		n.Status.Networks = []corev1alpha1.NodeNetworkStatus{}
		for _, nw := range hostNetworks {
			n.Status.Networks = append(n.Status.Networks, nw)
		}
		n.Status.Subnets = []corev1alpha1.NodeSubnetStatus{}
		for _, sn := range hostSubnets {
			n.Status.Subnets = append(n.Status.Subnets, sn)
		}
		if err := r.Client.Status().Update(ctx, n); err != nil {
			return ctrl.Result{}, err
		}
	}

	return ctrl.Result{}, nil
}

func (r *NodeSubnetVlanAllocator) SetupWithManager(mgr ctrl.Manager) error {
	// mgr.GetCache().IndexField(context.Background(), &computev1alpha1.VirtualMachine{}, VirtualMachineByNode, func(o client.Object) []string {
	// 	obj := o.(*computev1alpha1.VirtualMachine)
	// 	node, isScheduled := obj.ScheduledNode()
	// 	if !isScheduled {
	// 		return nil
	// 	}

	// 	return []string{node}
	// })

	// // Enqueue each subnet for a VM
	// scheduledVmHandler := handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
	// 	vm := o.(*computev1alpha1.VirtualMachine)
	// 	node, isScheduled := vm.ScheduledNode()
	// 	if !isScheduled {
	// 		return nil
	// 	}

	// 	return []reconcile.Request{
	// 		reconcile.Request{NamespacedName: types.NamespacedName{Name: node}},
	// 	}
	// })

	// enqueueRequestFromVirtualMachine := handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
	// 	reqs := []reconcile.Request{}
	// 	switch obj := o.(type) {
	// 	case *computev1alpha1.VirtualMachine:
	// 		for _, iface := range obj.Spec.NetworkInterfaces {
	// 			reqs = append(reqs, reconcile.Request{NamespacedName: types.NamespacedName{
	// 				Name: iface.Network,
	// 			}})
	// 		}
	// 	default:
	// 		panic(fmt.Sprintf("unexpected %s", reflect.TypeOf(o).String()))

	// 	}
	// 	return reqs
	// })
	// enqueueRequestFromNetwork := handler.EnqueueRequestsFromMapFunc(func(o client.Object) []reconcile.Request {
	// 	reqs := []reconcile.Request{}
	// 	switch obj := o.(type) {
	// 	case *computev1alpha1.VirtualMachine:
	// 		for _, iface := range obj.Spec.NetworkInterfaces {
	// 			reqs = append(reqs, reconcile.Request{NamespacedName: types.NamespacedName{
	// 				Name: iface.Network,
	// 			}})
	// 		}
	// 	default:
	// 		panic(fmt.Sprintf("unexpected %s", reflect.TypeOf(o).String()))

	// 	}
	// 	return reqs
	// })

	return ctrl.NewControllerManagedBy(mgr).
		For(&corev1alpha1.Node{}).
		// Watches(&source.Kind{Type: &computev1alpha1.VirtualMachine{}}, enqueueRequestFromVirtualMachine).
		// Watches(&source.Kind{Type: &networkv1alpha1.Network{}}, enqueueRequestFromNetwork).
		// Watches(&source.Kind{Type: &networkv1alpha1.Subnet{}}).
		// // Watches(&source.Kind{
		// 	Type: &computev1alpha1.VirtualMachine{},
		// }, scheduledVmHandler).
		Complete(r)
}
