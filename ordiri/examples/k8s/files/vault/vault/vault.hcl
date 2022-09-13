disable_mlock = true
ui = true

cluster_addr = "https://${local_hostname}:8201"
api_addr = "https://${local_hostname}:8200"

listener "tcp" {
    address            = "0.0.0.0:8200"
    tls_client_ca_file = "/etc/ssl/certs/vault-ca.crt"
    tls_cert_file      = "/etc/ssl/certs/vault.crt"
    tls_key_file       = "/etc/ssl/private/vault.key"
}

storage "raft" {
    path = "/var/lib/vault/data"
    node_id = "${local_hostname}"

    retry_join {
        leader_tls_servername = "vault-0.ordiri"
        leader_api_addr = "https://vault-0.ordiri:8200"
        leader_ca_cert_file     = "/etc/ssl/certs/vault-ca.crt"
        leader_client_cert_file = "/etc/ssl/certs/vault.crt"
        leader_client_key_file  = "/etc/ssl/private/vault.key"
    }
    retry_join {
        leader_tls_servername = "vault-1.ordiri"
        leader_api_addr = "https://vault-1.ordiri:8200"
        leader_ca_cert_file     = "/etc/ssl/certs/vault-ca.crt"
        leader_client_cert_file = "/etc/ssl/certs/vault.crt"
        leader_client_key_file  = "/etc/ssl/private/vault.key"
    }
    // retry_join {
    //     leader_tls_servername = "vault-2.ordiri"
    //     leader_api_addr = "https://vault-2.ordiri:8200"
    //     leader_ca_cert_file     = "/etc/ssl/certs/vault-ca.crt"
    //     leader_client_cert_file = "/etc/ssl/certs/vault.crt"
    //     leader_client_key_file  = "/etc/ssl/private/vault.key"
    // }
}

seal "transit" {
    address = "https://vault-root-0.ordiri:8200"
    disable_renewal = "false"
    key_name = "vault-vms-autounseal"
    mount_path = "transit/"
}