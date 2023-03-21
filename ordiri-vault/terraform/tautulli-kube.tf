

resource "vault_kubernetes_auth_backend_role" "tautulli" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "tautulli"
  bound_service_account_names      = ["tautulli"]
  bound_service_account_namespaces = ["tautulli"]
  token_ttl                        = 3600
  token_policies                   = ["default", "tautulli-oidc-read"]
}

resource "vault_policy" "tautulli-oidc-read" {
    name = "tautulli-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/tautulli" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "tautulli" {
  name          = "tautulli"
  redirect_uris = [
    "https://tautulli.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}