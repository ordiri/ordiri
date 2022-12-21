

resource "vault_kubernetes_auth_backend_role" "appdaemon" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "appdaemon"
  bound_service_account_names      = ["appdaemon"]
  bound_service_account_namespaces = ["appdaemon"]
  token_ttl                        = 3600
  token_policies                   = ["default", "appdaemon-hass-api-read", "appdaemon-oidc-read"]
}

resource "vault_policy" "appdaemon-hass-api-read" {
    name = "appdaemon-hass-api-read"
    policy = <<POLICY

path "secret/data/appdaemon/home-assistant-api" {
  capabilities=["read"]
}
POLICY
}
resource "vault_policy" "appdaemon-oidc-read" {
    name = "appdaemon-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/appdaemon" {
 capabilities = ["read"] 
}
POLICY
}

resource "vault_identity_oidc_client" "appdaemon" {
  name          = "appdaemon"
  redirect_uris = [
    "https://appdaemon.dmann.xyz/callback/oauth2/callback"
  ]
  assignments = ["allow_all"]
}