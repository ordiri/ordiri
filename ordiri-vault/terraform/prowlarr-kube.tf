

resource "vault_kubernetes_auth_backend_role" "prowlarr" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "prowlarr"
  bound_service_account_names      = ["prowlarr"]
  bound_service_account_namespaces = ["prowlarr"]
  token_ttl                        = 3600
  token_policies                   = ["default", "prowlarr-oidc-read"]
}

resource "vault_policy" "prowlarr-oidc-read" {
    name = "prowlarr-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/prowlarr" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "prowlarr" {
  name          = "prowlarr"
  redirect_uris = [
    "https://prowlarr.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}