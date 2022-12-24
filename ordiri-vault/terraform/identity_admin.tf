resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "vault_generic_endpoint" "generic-user-admin" {
  depends_on           = [
    vault_auth_backend.userpass
  ]
  path                 = "auth/userpass/users/admin"
  ignore_absent_fields = true

  data_json = <<EOT
{
  "policies": [],
  "password": "${random_password.password.result}"
}
EOT
}

resource "vault_identity_entity_alias" "root-codingninja-userpass" {
  name            = "admin"
  mount_accessor  = vault_auth_backend.userpass.accessor
  canonical_id    = vault_identity_entity.admin.id
}


output "admin-password" {
  value = random_password.password.result
  sensitive = true
}