resource "vault_policy" "node" {
  name = "node"

  policy = <<EOT
path "secret/data/node/{{identity.entity.name}}/*" {
    capabilities = [ "create", "update", "read", "delete", "list" ]
}
path "secret/data/node/{{identity.entity.name}}" {
    capabilities = [ "create", "update", "read", "delete", "list" ]
} 
EOT
}

resource "vault_identity_group" "node" {
  name     = "node"
  type     = "internal"
  policies = []
  external_member_entity_ids = true
}

resource "vault_identity_entity" "node" {
  for_each = local.nodes

  name      = "node-${each.key}"
  policies  = []

  metadata = {
    "node" = each.key
  }
}

resource "vault_identity_group_member_entity_ids" "nodes" {
  member_entity_ids = toset([for v in vault_identity_entity.node : v.id])
  group_id = vault_identity_group.node.id
  exclusive = false
}

resource "vault_identity_entity_alias" "node-cert" {
  for_each = vault_identity_entity.node
  name            = "${each.key}.homelab.dmann.xyz"
  mount_accessor  = vault_auth_backend.cert.accessor
  canonical_id    = each.value.id
}


resource "vault_policy" "node-provisioner" {
  name = "node-provisioner"

  policy = <<EOT
path "${vault_pki_secret_backend_role.role-pki-ca2-node.backend}/issue/${vault_pki_secret_backend_role.role-pki-ca2-node.name}" {
    capabilities = [ "update" ]
}

EOT
}
resource "vault_policy" "approle-node-provisioner" {
  name = "approle-node-provisioner"

  policy = <<EOT
path "${vault_pki_secret_backend_role.role-pki-ca2-approle-node.backend}/issue/${vault_pki_secret_backend_role.role-pki-ca2-approle-node.name}" {
    capabilities = [ "update" ]
}

EOT
}

resource "vault_approle_auth_backend_role" "node-provisioner" {
  backend        = vault_auth_backend.approle.path
  role_name      = "node-provisioner"
  role_id = "node-provisioner"
  token_policies = [
    vault_policy.approle-node-provisioner.name
  ]
  secret_id_num_uses = 1
  secret_id_ttl = 300
}

resource "vault_cert_auth_backend_role" "node" {
    name           = "node"
    certificate    = vault_pki_secret_backend_root_sign_intermediate.dmann_xyz_v1_sign_ica2_v1_by_ica1_v1.certificate
    backend        = vault_auth_backend.cert.path
    allowed_organizational_units = [ "DmannXYZ - Infra" ]
    token_ttl      = 300
    token_max_ttl  = 600
    token_policies = [
      vault_policy.node.name, 
      vault_policy.node-provisioner.name
    ]
}

resource "vault_approle_auth_backend_role_secret_id" "node" {
  for_each = local.nodes
  backend   = vault_auth_backend.approle.path
  role_name = vault_approle_auth_backend_role.node-provisioner.role_name
  cidr_list = [for ip in each.value.ips : "${ip}/32" ]
  wrapping_ttl = 300

  metadata = jsonencode({
    "node" = each.key
  })
}

output "node-provision-secret-id" {
  sensitive = true
  value = { for key, node in vault_approle_auth_backend_role_secret_id.node: key => {
    accessor: node.accessor,
    wrapping_accessor: node.wrapping_accessor,
    wrapping_token: node.wrapping_token,
  }}
}
