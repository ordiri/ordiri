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
)

// VmIpAllocator reconciles a Subnet object
type VmIpAllocator struct {
	client.Client
	Scheme *runtime.Scheme
}

func (r *VmIpAllocator) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	vm := &computev1alpha1.VirtualMachine{}
	if err := r.Client.Get(ctx, req.NamespacedName, vm); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}
	for _, iface := range vm.Spec.NetworkInterfaces {
		sn := &networkv1alpha1.Subnet{}
		sn.Name = iface.Subnet
		if err := r.Client.Get(ctx, client.ObjectKeyFromObject(sn), sn); err != nil {
			if errors.IsNotFound(err) {
				return ctrl.Result{}, fmt.Errorf("no such subnet")
			}
			return ctrl.Result{}, err
		}

		network, err := netaddr.ParseIPPrefix(sn.Spec.Cidr)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to parse subnet cidr - %q - %w", sn.Spec.Cidr, err)
		}
		found := false
		for _, ip := range iface.Ips {
			parsedIp, err := netaddr.ParseIP(ip)
			if err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to parse subnet cidr - %q - %w", sn.Spec.Cidr, err)
			}

			if network.Contains(parsedIp) {
				found = true
				break
			}
		}

		if !found {
			nextIp, err := r.getNextIp(ctx, sn, iface)
			if err != nil {
				return ctrl.Result{}, err
			}
			iface.Ips = append(iface.Ips, nextIp.String())
			if err := r.Client.Update(ctx, vm); err != nil {
				return ctrl.Result{}, fmt.Errorf("unable to update vm with allocated IP - %w", err)
			}
		}
	}

	return ctrl.Result{}, nil
}

func (r *VmIpAllocator) getNextIp(ctx context.Context, sn *networkv1alpha1.Subnet, iface *computev1alpha1.VirtualMachineNetworkInterface) (netaddr.IP, error) {

	vmsInSubnet := &computev1alpha1.VirtualMachineList{}
	if err := r.Client.List(ctx, vmsInSubnet); err != nil {
		return netaddr.IP{}, err
	}

	allocated := map[netaddr.IP]string{}
	for _, vm := range vmsInSubnet.Items {
		for _, iface := range vm.Spec.NetworkInterfaces {
			for _, ip := range iface.Ips {
				ipaddr, err := netaddr.ParseIP(ip)
				if err != nil {
					return netaddr.IP{}, fmt.Errorf("unable to parse ip addr - %q - %w", ip, err)
				}

				allocated[ipaddr] = vm.Name
			}
		}
	}
	network, err := netaddr.ParseIPPrefix(sn.Spec.Cidr)
	if err != nil {
		return netaddr.IP{}, fmt.Errorf("unable to parse subnet cidr - %q - %w", sn.Spec.Cidr, err)
	}
	// network.ip === 0
	// network.ip+1 === router
	// network.ip+2 === dhcp
	// network.ip+3 === allocatable range start
	ip := network.IP().Next().Next().Next()
	for {
		if !network.Contains(ip) {
			return netaddr.IP{}, fmt.Errorf("no unallocated addresses available")
		}
		if _, ok := allocated[ip]; !ok {
			break
		}
		ip = ip.Next()
	}

	return ip, nil

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
		For(&computev1alpha1.VirtualMachine{}).
		// Watches(&source.Kind{Type: &computev1alpha1.VirtualMachine{}}, enqueueRequestFromVirtualMachine).
		// Watches(&source.Kind{Type: &networkv1alpha1.Network{}}, enqueueRequestFromNetwork).
		// Watches(&source.Kind{Type: &networkv1alpha1.Subnet{}}).
		// // Watches(&source.Kind{
		// 	Type: &computev1alpha1.VirtualMachine{},
		// }, scheduledVmHandler).
		Complete(r)
}
