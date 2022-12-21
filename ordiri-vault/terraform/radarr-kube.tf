

resource "vault_kubernetes_auth_backend_role" "radarr" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "radarr"
  bound_service_account_names      = ["radarr"]
  bound_service_account_namespaces = ["radarr"]
  token_ttl                        = 3600
  token_policies                   = ["default", "radarr-oidc-read"]
}

resource "vault_policy" "radarr-oidc-read" {
    name = "radarr-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/radarr" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "radarr" {
  name          = "radarr"
  redirect_uris = [
    "https://radarr.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}