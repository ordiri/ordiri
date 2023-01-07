

resource "vault_kubernetes_auth_backend_role" "dashboard" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "dashboard"
  bound_service_account_names      = ["dashboard"]
  bound_service_account_namespaces = ["dashboard"]
  token_ttl                        = 3600
  token_policies                   = [
    "default", 
    "dashboard-oidc-read", 
    "media-api-token-read",
  ]
}

resource "vault_policy" "dashboard-oidc-read" {
    name = "dashboard-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/dashboard" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_policy" "media-api-token-read" {
    name = "media-api-token-read"
    policy = <<POLICY
path "secret/data/media/+/api" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "dashboard" {
  name          = "dashboard"
  redirect_uris = [
    "https://dashboard.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}