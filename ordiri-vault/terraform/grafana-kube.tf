

resource "vault_kubernetes_auth_backend_role" "grafana" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "grafana"
  bound_service_account_names      = ["prometheus-grafana"]
  bound_service_account_namespaces = ["monitoring"]
  token_ttl                        = 3600
  token_policies                   = ["default", "grafana-oidc-read"]
}

resource "vault_policy" "grafana-oidc-read" {
    name = "grafana-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/grafana" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "grafana" {
  name          = "grafana"
  redirect_uris = [
    "https://grafana.dmann.dev/login/generic_oauth",
    "https://grafana.dmann.xyz/login/generic_oauth",
  ]
  assignments = ["allow_all"]
}