resource "vault_identity_oidc" "server" {
  issuer = "https://vault.homelab.dmann.xyz:8200"
}

resource "vault_identity_oidc_scope" "groups" {
  name        = "groups"
  template    = <<EOT
{
  "groups": {{identity.entity.groups.names}} 
}
EOT
  description = "Vault OIDC Groups Scope"
}
resource "vault_identity_oidc_scope" "user" {
  name        = "user"
  template    = <<EOT
{
    "username": {{identity.entity.name}}
}
EOT
  description = "Vault OIDC user Scope"
}
resource "vault_identity_oidc_scope" "email" {
  name        = "email"
  template    = <<EOT
{
    "email": {{identity.entity.metadata.email}}
}
EOT
  description = "Vault OIDC user Scope"
}
resource "vault_identity_oidc_provider" "vault" {
  name = "default"
  https_enabled = true
  allowed_client_ids = [ "*" ]
  scopes_supported = [
    vault_identity_oidc_scope.user.name,
    vault_identity_oidc_scope.groups.name,
    vault_identity_oidc_scope.email.name,
  ]
}

resource "vault_identity_oidc_key" "key" {
  name      = "key"
  algorithm = "RS256"
}

resource "vault_identity_oidc_role" "role" {
  name = "role"
  key  = vault_identity_oidc_key.key.name
}

resource "vault_identity_oidc_key_allowed_client_id" "role" {
  key_name          = vault_identity_oidc_key.key.name
  allowed_client_id = vault_identity_oidc_role.role.client_id
}

resource "vault_identity_oidc_assignment" "root" {
  name       = "assignment"
  entity_ids = [
    vault_identity_entity.admin.id,
  ]
  group_ids  = [
    vault_identity_group.root.id,
  ]
}
