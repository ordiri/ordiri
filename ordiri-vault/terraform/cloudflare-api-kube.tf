

resource "vault_kubernetes_auth_backend_role" "cloudflare-api" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "cloudflare-api"
  bound_service_account_names      = ["*"]
  bound_service_account_namespaces = ["*"]
  token_ttl                        = 3600
  token_policies                   = ["default", "cloudflare-api-token-read"]
}

resource "vault_policy" "cloudflare-api-token-read" {
    name = "cloudflare-api-token-read"
    policy = <<POLICY
path "secret/data/cloudflare-api" {
 capabilities = ["read"] 
}
POLICY
}