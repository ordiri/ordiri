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

package storage

import (
	"context"
	"fmt"

	v1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/log"

	"github.com/ceph/go-ceph/rados"
	"github.com/ceph/go-ceph/rbd"
	storagev1alpha1 "github.com/ordiri/ordiri/pkg/apis/storage/v1alpha1"
)

// VolumeClaimReconciler reconciles a VolumeClaim object
type VolumeClaimReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	ceph *rados.Conn
}

//+kubebuilder:rbac:groups=storage,resources=volumeclaims,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=storage,resources=volumeclaims/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=storage,resources=volumeclaims/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the VolumeClaim object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *VolumeClaimReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := log.FromContext(ctx)
	vc := &storagev1alpha1.VolumeClaim{}
	if err := r.Client.Get(ctx, req.NamespacedName, vc); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	poolName := "tenant1"

	if _, err := r.ceph.GetPoolByName(poolName); err != nil {
		if err := r.ceph.MakePool(poolName); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to make pool - %w", err)
		}

		if _, err := r.ceph.GetPoolByName(poolName); err != nil {
			log.Error(err, "unable to create the storage pool", "poolName", poolName)
			return ctrl.Result{}, nil
		}
	}

	log.Info("opening io ctx")
	ioctx, err := r.ceph.OpenIOContext(poolName)
	if err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to open io ctx - %w", err)
	}

	log.Info("starting rbd pool init")
	if err := rbd.PoolInit(ioctx, false); err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to initialize rbd pool - %w", err)
	}
	log.Info("init rbd pool complete")
	newSize := uint64(vc.Spec.Size.Value())

	img, err := rbd.OpenImage(ioctx, vc.Name, rbd.NoSnapshot)
	if err != nil {
		log.Info("missing image", "err", err)
		opts := rbd.NewRbdImageOptions()
		defer opts.Destroy()
		if err := rbd.CreateImage(ioctx, vc.Name, newSize, opts); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to create the image - %w", err)
		}
		img, err = rbd.OpenImageReadOnly(ioctx, vc.Name, rbd.NoSnapshot)
		if err != nil {
			return ctrl.Result{}, err
		}
	}
	if img == nil {
		panic("failed to open image")
	}
	defer img.Close()

	stat, err := img.Stat()

	if err != nil {
		return ctrl.Result{}, err
	}

	if stat.Size < newSize {
		if err := img.Resize(newSize); err != nil {
			return ctrl.Result{}, fmt.Errorf("failed to resize image - %w", err)
		}
	}

	volume := &storagev1alpha1.Volume{}
	volume.Name = vc.Name
	controllerutil.CreateOrUpdate(ctx, r.Client, volume, func() error {
		volume.Spec.ClaimRef = &v1.ObjectReference{
			Kind:       volume.Kind,
			APIVersion: volume.APIVersion,
			Name:       volume.Name,
			UID:        volume.UID,
		}
		volume.Spec.Size = vc.Spec.Size
		volume.Spec.StorageClassName = vc.Spec.StorageClassName
		return ctrl.SetControllerReference(vc, volume, r.Scheme)
	})

	if vc.Spec.VolumeName != volume.Name {
		vc.Spec.VolumeName = volume.Name
		if err := r.Client.Update(ctx, vc); err != nil {
			return ctrl.Result{}, err
		}
	}

	log.Info("completed claim controller")

	// TODO(user): your logic here

	return ctrl.Result{}, nil
}

const (
	VolumeToClaimMapping = ".internal.claimName"
)

// SetupWithManager sets up the controller with the Manager.
func (r *VolumeClaimReconciler) SetupWithManager(mgr ctrl.Manager) error {
	conn, err := rados.NewConnWithClusterAndUser("ceph", "client.admin")
	if err != nil {
		return fmt.Errorf("unable to create new connection for rados - %w", err)
	}
	if err := conn.ReadDefaultConfigFile(); err != nil {
		return fmt.Errorf("unable to read config file for ceph - %w", err)
	}
	if err := conn.Connect(); err != nil {
		return fmt.Errorf("unable to connect to rados server - %w", err)
	}
	// conn.
	r.ceph = conn

	mgr.GetFieldIndexer().IndexField(context.Background(), &storagev1alpha1.Volume{}, VolumeToClaimMapping, func(o client.Object) []string {
		indexes := []string{}
		switch o := o.(type) {
		case *storagev1alpha1.Volume:
			if o.Spec.ClaimRef != nil {
				indexes = append(indexes, o.Spec.ClaimRef.Name)
			}
		}
		return indexes
	})

	return ctrl.NewControllerManagedBy(mgr).
		For(&storagev1alpha1.VolumeClaim{}).
		Complete(r)
}
