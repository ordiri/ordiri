path "transit/encrypt/vault-vms-autounseal" {
    capabilities = [ "update" ]
}

path "transit/decrypt/vault-vms-autounseal" {
    capabilities = [ "update" ]
}

path "secret/data/vault/root/*" {
    capabilities = [ "update", "create", "read", "patch" ]
}