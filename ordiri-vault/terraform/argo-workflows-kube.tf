

resource "vault_kubernetes_auth_backend_role" "argo-workflows" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "argo-workflows"
  bound_service_account_names      = ["argo-workflows"]
  bound_service_account_namespaces = ["argo-workflows"]
  token_ttl                        = 3600
  token_policies                   = ["default", "argo-workflow-oidc-read"]
}

resource "vault_policy" "argo-workflow-oidc-read" {
    name = "argo-workflow-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/argo-workflows" {
 capabilities = ["read"] 
}
POLICY
}

resource "vault_identity_oidc_client" "argo-workflows" {
  name          = "argo-workflows"
  redirect_uris = [
    "https://argo.dmann.xyz/oauth2/callback",
    "https://argo.dmann.dev/oauth2/callback"
  ]
  assignments = ["allow_all"]
}