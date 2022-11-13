path "transit/encrypt/k8-autounseal-transit" {
    capabilities = ["update"]
}

path "transit/decrypt/k8-autounseal-transit" {
    capabilities = ["update"]
}

path "secret/data/k8s/vault/*" {
    capabilities = ["create", "read", "update", "delete", "list"]
}