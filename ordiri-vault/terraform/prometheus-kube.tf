

resource "vault_kubernetes_auth_backend_role" "prometheus" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "prometheus"
  bound_service_account_names      = ["prometheus-kube-prometheus-prometheus"]
  bound_service_account_namespaces = ["monitoring"]
  token_ttl                        = 3600
  /* token_policies                   = ["default", "prometheus-hass-api-read", "prometheus-oidc-read"] */
  token_policies                   = ["default", "prometheus-hass-api-read", "prometheus-metrics"]
}

resource "vault_policy" "prometheus-hass-api-read" {
    name = "prometheus-hass-api-read"
    policy = <<POLICY

path "secret/data/prometheus/home-assistant-api" {
  capabilities=["read"]
}
POLICY
}
resource "vault_policy" "prometheus-metrics" {
    name = "prometheus-metrics"
    policy = <<POLICY
path "/sys/metrics" {
  capabilities = ["read"]
}
POLICY
}
/*
Might be worth putting the prometheus public endpoint behind oauth proxy...
resource "vault_policy" "prometheus-oidc-read" {
    name = "prometheus-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/prometheus" {
 capabilities = ["read"] 
}
POLICY
}

resource "vault_identity_oidc_client" "prometheus" {
  name          = "prometheus"
  redirect_uris = [
    "https://prometheus.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
} */