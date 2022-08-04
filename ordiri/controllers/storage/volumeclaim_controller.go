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

	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	storagev1alpha1 "github.com/ordiri/ordiri/pkg/apis/storage/v1alpha1"
)

// VolumeClaimReconciler reconciles a VolumeClaim object
type VolumeClaimReconciler struct {
	client.Client
	Scheme *runtime.Scheme
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
	_ = log.FromContext(ctx)
	vc := &storagev1alpha1.VolumeClaim{}
	if err := r.Client.Get(ctx, req.NamespacedName, vc); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	// r.Client.

	// vc.Name

	// TODO(user): your logic here

	return ctrl.Result{}, nil
}

const (
	VolumeToClaimMapping = ".internal.claimName"
)

// SetupWithManager sets up the controller with the Manager.
func (r *VolumeClaimReconciler) SetupWithManager(mgr ctrl.Manager) error {
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
