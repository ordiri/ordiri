

resource "vault_kubernetes_auth_backend_role" "sabnzbd" {
  backend                          = vault_auth_backend.kubernetes.path
  alias_name_source = "serviceaccount_name"
  role_name                        = "sabnzbd"
  bound_service_account_names      = ["sabnzbd"]
  bound_service_account_namespaces = ["sabnzbd"]
  token_ttl                        = 3600
  token_policies                   = ["default", "sabnzbd-oidc-read"]
}

resource "vault_policy" "sabnzbd-oidc-read" {
    name = "sabnzbd-oidc-read"
    policy = <<POLICY
path "identity/oidc/client/sabnzbd" {
 capabilities = ["read"] 
}
POLICY
}
resource "vault_identity_oidc_client" "sabnzbd" {
  name          = "sabnzbd"
  redirect_uris = [
    "https://sabnzbd.dmann.xyz/oauth2/callback"
  ]
  assignments = ["allow_all"]
}