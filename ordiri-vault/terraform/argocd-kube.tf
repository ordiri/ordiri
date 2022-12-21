

resource "vault_kubernetes_auth_backend_role" "argocd" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "argocd"
  bound_service_account_names      = ["argocd-server"]
  bound_service_account_namespaces = ["argocd"]
  token_ttl                        = 3600
  token_policies                   = ["default", "argocd-oidc-read"]
}

resource "vault_policy" "argocd-oidc-read" {
    name = "argocd-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/argocd" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "argocd" {
  name          = "argocd"
  redirect_uris = [
    "https://argocd.dmann.dev/auth/callback",
    "https://argocd.dmann.xyz/auth/callback"
  ]
  assignments = ["allow_all"]
}