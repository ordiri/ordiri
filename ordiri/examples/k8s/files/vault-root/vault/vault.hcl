disable_mlock = true

ui = true

storage "file" {
    path = "/vault/root/vault-data"
}

# HTTPS listener
listener "tcp" {
    address       = "0.0.0.0:8200"
    tls_cert_file = "/vault/root/vault-tls/vault.crt"
    tls_key_file  = "/vault/root/vault-tls/vault.key"
}