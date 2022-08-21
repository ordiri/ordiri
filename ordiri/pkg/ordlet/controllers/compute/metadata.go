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

package compute

import (
	"context"
	"net"
	"net/http"
	"os"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	"github.com/ordiri/ordiri/pkg/metadata"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/manager"
)

// MachineMetadataController reconciles a Machine object
type MachineMetadataController struct {
	client.Client
	Scheme *runtime.Scheme

	Port int
}

// SetupWithManager sets up the controller with the Manager.
func (r *MachineMetadataController) SetupWithManager(mgr ctrl.Manager) error {
	mgr.GetFieldIndexer().IndexField(context.Background(), &computev1alpha1.VirtualMachine{}, metadata.VirtualMachineByInterfaceIpKey, func(o client.Object) []string {
		obj, ok := o.(*computev1alpha1.VirtualMachine)
		if !ok {
			return nil
		}

		keys := []string{}
		for _, iface := range obj.Spec.NetworkInterfaces {
			for _, ip := range iface.Ips {
				keys = append(keys, metadata.KeyForVmInterface(iface.Network, iface.Subnet, ip))
			}
		}

		return keys
	})
	return mgr.Add(manager.RunnableFunc(func(ctx context.Context) error {
		log := log.FromContext(ctx).WithValues("name", "metadataserver")

		metadataServer := metadata.NewServer(mgr.GetClient())

		// Unconditionally remove the old socket
		os.MkdirAll("/run/ordiri/metadata", os.ModePerm)
		os.Remove("/run/ordiri/metadata/md-server.sock")

		conn, err := net.Listen("unix", "/run/ordiri/metadata/md-server.sock")
		if err != nil {
			return err
		}

		log.Info("server starting")
		server := http.Server{Handler: metadataServer.HTTPHandler()}
		log.Info("Starting server")

		if err := http.Serve(conn, metadataServer.HTTPHandler()); err != nil {
			return err
		}

		log.Info("metadata server started")
		return server.Shutdown(ctx)
	}))
}
