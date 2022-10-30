
resource "vault_policy" "vault-ceph-store" {
  name = "vault-ceph-store"

  policy = <<EOT
# List, create, update, and delete key/value secrets
path "secret/data/libvirt/ceph-client"
{
  capabilities = [ "update", "create", "read", "patch" ]
}

EOT
}