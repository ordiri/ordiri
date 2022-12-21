

resource "vault_kubernetes_auth_backend_role" "esphome" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "esphome"
  bound_service_account_names      = ["esphome"]
  bound_service_account_namespaces = ["esphome"]
  token_ttl                        = 3600
  token_policies                   = ["default", "esphome-oidc-read"]
}

resource "vault_policy" "esphome-oidc-read" {
    name = "esphome-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/esphome" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "esphome" {
  name          = "esphome"
  redirect_uris = [
    "https://esphome.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}