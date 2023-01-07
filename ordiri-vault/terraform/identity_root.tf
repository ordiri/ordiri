resource "vault_policy" "root" {
  name = "admin"

  policy = <<EOT
# Read system health check
path "sys/health"
{
  capabilities = ["read", "sudo"]
}

# Create and manage ACL policies broadly across Vault

# List existing policies
path "sys/policies/acl"
{
  capabilities = ["list"]
}

# Create and manage ACL policies
path "sys/policies/acl/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Enable and manage authentication methods broadly across Vault

# Manage auth methods broadly across Vault
path "auth/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Create, update, and delete auth methods
path "sys/auth/*"
{
  capabilities = ["create", "update", "delete", "sudo"]
}

# Identity
path "identity/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List auth methods
path "sys/auth"
{
  capabilities = ["read"]
}

# Enable and manage the key/value secrets engine at `secret/` path

# List, create, update, and delete key/value secrets
path "secret/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# Manage secrets engines
path "sys/mounts/*"
{
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}

# List existing secrets engines.
path "sys/mounts"
{
  capabilities = ["read"]
}
# List existing secrets engines.
path "sys/internal/ui/*"
{
  capabilities = ["read"]
}
EOT
}

resource "vault_identity_group" "root" {
  name     = "root"
  type     = "internal"
  policies = [
    vault_policy.root.name
  ]
  member_entity_ids = [
    vault_identity_entity.admin.id
  ]
}
resource "vault_identity_entity" "admin" {
  name      = "admin"
  policies  = []
  metadata = {
    "email" = "admin@dmann.xyz"
  }
}
