

resource "vault_kubernetes_auth_backend_role" "zigbee2mqtt" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "zigbee2mqtt"
  bound_service_account_names      = ["zigbee2mqtt"]
  bound_service_account_namespaces = ["zigbee2mqtt"]
  token_ttl                        = 3600
  token_policies                   = ["default", "zigbee2mqtt-oidc-read"]
}

resource "vault_policy" "zigbee2mqtt-oidc-read" {
    name = "zigbee2mqtt-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/zigbee2mqtt" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "zigbee2mqtt" {
  name          = "zigbee2mqtt"
  redirect_uris = [
    "https://zigbee2mqtt.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}