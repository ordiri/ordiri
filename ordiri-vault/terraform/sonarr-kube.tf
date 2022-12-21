resource "vault_kubernetes_auth_backend_role" "sonarr" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "sonarr"
  bound_service_account_names      = ["sonarr"]
  bound_service_account_namespaces = ["sonarr"]
  token_ttl                        = 3600
  token_policies                   = ["default", "sonarr-oidc-read"]
}

resource "vault_policy" "sonarr-oidc-read" {
    name = "sonarr-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/sonarr" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "sonarr" {
  name          = "sonarr"
  redirect_uris = [
    "https://sonarr.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}