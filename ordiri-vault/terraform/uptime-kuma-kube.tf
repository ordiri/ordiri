

resource "vault_kubernetes_auth_backend_role" "uptime-kuma" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "uptime-kuma"
  bound_service_account_names      = ["uptime-kuma"]
  bound_service_account_namespaces = ["uptime-kuma"]
  token_ttl                        = 3600
  token_policies                   = ["default", "uptime-kuma-oidc-read"]
}

resource "vault_policy" "uptime-kuma-oidc-read" {
    name = "uptime-kuma-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/uptime-kuma" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "uptime-kuma" {
  name          = "uptime-kuma"
  redirect_uris = [
    "https://status.dmann.xyz/oauth2/callback",
    "https://status.dmann.dev/oauth2/callback"
  ]
  assignments = ["allow_all"]
}