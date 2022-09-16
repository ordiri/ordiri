path "secret/data/k8s/master/*" {
    capabilities = [ "update", "create", "read", "patch" ]
}
path "secret/data/k8s/worker/*" {
    capabilities = [ "update", "create", "read", "patch" ]
}