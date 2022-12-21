

resource "vault_kubernetes_auth_backend_role" "gitea" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "gitea"
  bound_service_account_names      = ["gitea"]
  bound_service_account_namespaces = ["gitea"]
  token_ttl                        = 3600
  token_policies                   = ["default", "gitea-oidc-read"]
}

resource "vault_policy" "gitea-oidc-read" {
    name = "gitea-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/gitea" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "gitea" {
  name          = "gitea"
  redirect_uris = [
    "https://git.dmann.xyz/user/oauth2/vault/callback"
  ]
  assignments = ["allow_all"]
}