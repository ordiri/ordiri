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

package authorization

import (
	"context"
	"fmt"
	"path"

	vault "github.com/hashicorp/vault/api"
	"github.com/mitchellh/mapstructure"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/log"

	authorizationv1alpha1 "github.com/ordiri/ordiri/pkg/apis/authorization/v1alpha1"
)

// ServiceAccountReconciler reconciles a ServiceAccount object
type ServiceAccountReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	vc *vault.Client
}

type SaIdentity struct {
	Id             string                 `mapstructure:"id"`
	Name           string                 `mapstructure:"name"`
	Policies       []string               `mapstructure:"policies"`
	Metadata       map[string]interface{} `mapstructure:"metadata"`
	GroupIds       []string               `mapstructure:"group_ids"`
	DirectGroupIds []string               `mapstructure:"direct_group_ids"`
	Aliases        []string               `mapstructure:"aliases"`
	Disabled       bool                   `mapstructure:"disabled"`
}

type IdentityGroup struct {
	Id              string   `mapstructure:"id"`
	Name            string   `mapstructure:"name"`
	MemberEntityIds []string `mapstructure:"member_entity_ids"`
}

const FinalizerNameSaController = "authorization.ordiri.com/service-account"

//+kubebuilder:rbac:groups=authorization,resources=serviceaccounts,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=authorization,resources=serviceaccounts/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=authorization,resources=serviceaccounts/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the ServiceAccount object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.11.0/pkg/reconcile
func (r *ServiceAccountReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	// Not going to use vault anymore, you can't gen tokens for arbitrary entities, only the one bound to the token used auth the req to gen the
	// identity token (Aka, you must login as the SA - not the vault Root - to create identity tokens for a SA)...
	return ctrl.Result{}, nil
	log := log.FromContext(ctx)

	sa := &authorizationv1alpha1.ServiceAccount{}
	if err := r.Client.Get(ctx, req.NamespacedName, sa); err != nil {
		if errors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		return ctrl.Result{}, err
	}

	if !sa.DeletionTimestamp.IsZero() {
		log.V(5).Info("Detected ServiceAccount in deletion mode")

		// if controllerutil.RemoveFinalizer(sa, FinalizerNameSaController) {
		// 	if err := r.Client.Update(ctx, sa); err != nil {
		// 		return ctrl.Result{}, err
		// 	}
		// }

		return ctrl.Result{}, nil
	}

	if controllerutil.AddFinalizer(sa, FinalizerNameSaController) {
		log.V(5).Info("adding finalizer to ServiceAccount")
		if err := r.Client.Update(ctx, sa); err != nil {
			return ctrl.Result{}, err
		}
	}

	name := fmt.Sprintf("%s-%s", sa.Namespace, sa.Name)
	saPath := path.Join("/identity/entity/name/", name)

	data, err := r.vc.Logical().Read(saPath)
	if err != nil {
		return ctrl.Result{}, fmt.Errorf("error when fetching entity %q - %w", name, err)
	}

	var ident *SaIdentity
	if data != nil {
		ident = &SaIdentity{}
		if err := mapstructure.Decode(data.Data, &ident); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to encode identity - %w", err)
		}
	} else {
		ident = &SaIdentity{
			Name: name,
		}
	}
	ident.Disabled = false

	policyName := "service-account"
	foundPolicy := false
	for _, policy := range ident.Policies {
		if policy == policyName {
			foundPolicy = true
			break
		}
	}
	if !foundPolicy {
		ident.Policies = append(ident.Policies, policyName)
	}

	if ident.Metadata == nil {
		ident.Metadata = map[string]interface{}{}
	}
	ident.Metadata["tenant"] = sa.Namespace

	vaultSaInput := map[string]interface{}{}
	if err := mapstructure.Decode(ident, &vaultSaInput); err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to decode identity - %w", err)
	}

	_, err = r.vc.Logical().Write(saPath, vaultSaInput)
	if err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to create identity %q - %w", name, err)
	}

	identGroup := &IdentityGroup{
		Name: sa.Namespace,
		// MemberEntityIds: ident.Id,
	}
	identityGroup, err := r.vc.Logical().Read(path.Join("/identity/group/name", sa.Namespace))
	if err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to create group %q - %w", sa.Name, err)
	}
	if identityGroup != nil {
		if err := mapstructure.Decode(identityGroup.Data, &identGroup); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to decode group - %w", err)
		}
	}
	foundMember := false
	for _, member := range identGroup.MemberEntityIds {
		if member == ident.Id {
			foundMember = true
			break
		}
	}
	if !foundMember {
		identGroup.MemberEntityIds = append(identGroup.MemberEntityIds, ident.Id)
		vaultGroupInput := map[string]interface{}{}
		if err := mapstructure.Decode(identGroup, &vaultGroupInput); err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to decode group - %w", err)
		}
		_, err = r.vc.Logical().Write(path.Join("/identity/group/name", sa.Namespace), vaultGroupInput)
		if err != nil {
			return ctrl.Result{}, fmt.Errorf("unable to create group %q - %w", sa.Name, err)
		}
	}

	data, err = r.vc.Logical().Read(saPath)
	if err != nil {
		return ctrl.Result{}, fmt.Errorf("error when fetching entity %q - %w", name, err)
	}

	if err := mapstructure.Decode(data.Data, &ident); err != nil {
		return ctrl.Result{}, fmt.Errorf("unable to decode identity - %w", err)
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *ServiceAccountReconciler) SetupWithManager(mgr ctrl.Manager) error {
	// config := vault.DefaultConfig() // modify for more granular configuration

	// client, err := vault.NewClient(config)
	// if err != nil {
	// 	return fmt.Errorf("unable to initialize Vault client: %w", err)
	// }

	// r.vc = client
	// s, err := r.vc.Logical().WriteWithContext(context.Background(), "identity/oidc/config", map[string]interface{}{
	// 	"issuer": "http://10.0.2.102:8200/v1/identity/oidc",
	// })

	// if err != nil {
	// 	return err
	// }
	// spew.Dump("got the secret", s)

	// client.Sys().EnableAuthWithOptionsWithContext()

	return ctrl.NewControllerManagedBy(mgr).
		For(&authorizationv1alpha1.ServiceAccount{}).
		Complete(r)
}
