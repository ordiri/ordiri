

resource "vault_kubernetes_auth_backend_role" "bazarr" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "bazarr"
  bound_service_account_names      = ["bazarr"]
  bound_service_account_namespaces = ["bazarr"]
  token_ttl                        = 3600
  token_policies                   = ["default", "bazarr-oidc-read"]
}

resource "vault_policy" "bazarr-oidc-read" {
    name = "bazarr-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/bazarr" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "bazarr" {
  name          = "bazarr"
  redirect_uris = [
    "https://bazarr.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}