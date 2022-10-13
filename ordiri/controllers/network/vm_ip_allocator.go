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

	"inet.af/netaddr"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	networkv1alpha1 "github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/log"
	"github.com/ordiri/ordiri/pkg/network/api"
)

const publicIpamBlockName = "_shared::public"

// VmIpAllocator reconciles a Subnet object
type VmIpAllocator struct {
	client.Client
	Scheme *runtime.Scheme

	PublicCidr netaddr.IPPrefix
	Allocator  api.AddressAllocatorClient
}

func (r *VmIpAllocator) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)
	vm := &computev1alpha1.VirtualMachine{}
	if err := r.Client.Get(ctx, req.NamespacedName, vm); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	announcements := map[netaddr.IP]string{}
	for _, iface := range vm.Spec.NetworkInterfaces {
		sn := &networkv1alpha1.Subnet{}
		sn.Name = iface.Subnet
		sn.Namespace = vm.Namespace
		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(sn), sn); err != nil {
			if errors.IsNotFound(err) {
				return ctrl.Result{}, fmt.Errorf("no such subnet")
			}
			return ctrl.Result{}, err
		}

		subnetIpamBlockName := fmt.Sprintf("tenant::%s::%s", sn.Namespace, sn.Name)

		network, err := netaddr.ParseIPPrefix(sn.Spec.Cidr)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to parse subnet cidr - %q - %w", sn.Spec.Cidr, err)
		}

		network = network.Masked()
		if _, err := r.Allocator.RegisterBlock(ctx, &api.RegisterBlockRequest{
			BlockName: subnetIpamBlockName,
			Ranges: []*api.AllocatableRange{
				{
					CIDR: network.String(),
				},
			},
		}); err != nil {
			return ctrl.Result{}, fmt.Errorf("error registering subnet block - %q - %w", sn.Spec.Cidr, err)
		}

		foundPrivate := false
		foundPublic := false
		wantsPublic := iface.Public
		for _, ip := range iface.Ips {
			parsedIpNw, err := netaddr.ParseIPPrefix(ip)
			if err != nil { // todo should we auto strip invalid ips?
				return ctrl.Result{}, fmt.Errorf("unable to parse interface ip cidr - %q - %w", ip, err)
			}
			parsedIp := parsedIpNw.IP()

			if network.Contains(parsedIp) {
				foundPrivate = true
			}

			if wantsPublic && r.PublicCidr.Contains(parsedIp) {
				foundPublic = true
				announcements[parsedIp] = iface.Mac
			}
		}

		wantsPublic = wantsPublic && !foundPublic

		if !foundPrivate || wantsPublic {
			if !foundPrivate {
				log.Info("allocating IP", "blockName", subnetIpamBlockName)
				allocated, err := r.Allocator.Allocate(ctx, &api.AllocateRequest{
					BlockName: subnetIpamBlockName,
				})
				if err != nil {
					return ctrl.Result{}, fmt.Errorf("unable to allocate private ip - %w", err)
				}

				iface.Ips = append(iface.Ips, allocated.Address)
			}

			if wantsPublic {
				// We don't bother skipping any ip range here as it's a public network routed directly at us
				// we'll swap this with bird bgp routing eventually and clean all this fip stuff up
				log.Info("allocating IP", "blockName", publicIpamBlockName)
				allocated, err := r.Allocator.Allocate(ctx, &api.AllocateRequest{
					BlockName: publicIpamBlockName,
				})
				if err != nil {
					// return ctrl.Result{}, fmt.Errorf("error with no public ip - %w", err)
					log.Info("no public ip available", "range", r.PublicCidr)
				} else {
					iface.Ips = append(iface.Ips, allocated.Address)
				}
			}

			if err := r.Client.Update(ctx, vm); err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to update vm with allocated IP - %w", err)
			}
		}
	}

	return ctrl.Result{}, nil
}

func (r *VmIpAllocator) SetupWithManager(mgr ctrl.Manager) error {
	mgr.GetFieldIndexer().IndexField(context.Background(), &computev1alpha1.VirtualMachine{}, "VmBySubnet", func(o client.Object) []string {
		keys := []string{}
		obj := o.(*computev1alpha1.VirtualMachine)
		for _, iface := range obj.Spec.NetworkInterfaces {
			keys = append(keys, iface.Network+iface.Subnet)
		}
		return keys
	})

	return ctrl.NewControllerManagedBy(mgr).
		Named("vm_ip_allocator").
		For(&computev1alpha1.VirtualMachine{}).
		// Watches(&source.Kind{Type: &computev1alpha1.VirtualMachine{}}, enqueueRequestFromVirtualMachine).
		// Watches(&source.Kind{Type: &networkv1alpha1.Network{}}, enqueueRequestFromNetwork).
		// Watches(&source.Kind{Type: &networkv1alpha1.Subnet{}}).
		// // Watches(&source.Kind{
		// 	Type: &computev1alpha1.VirtualMachine{},
		// }, scheduledVmHandler).
		Complete(r)
}
