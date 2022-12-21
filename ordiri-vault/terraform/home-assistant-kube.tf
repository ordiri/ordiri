

resource "vault_kubernetes_auth_backend_role" "home-assistant" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "home-assistant"
  bound_service_account_names      = ["home-assistant"]
  bound_service_account_namespaces = ["home-assistant"]
  token_ttl                        = 3600
  token_policies                   = ["default", "appdaemon-hass-api-write"]
}

resource "vault_policy" "home-assistant-hass-api-write" {
    name = "appdaemon-hass-api-write"
    policy = <<POLICY

path "secret/data/appdaemon/home-assistant-api" {
  capabilities=["create", "update", "read", "patch"]
}
POLICY
}
