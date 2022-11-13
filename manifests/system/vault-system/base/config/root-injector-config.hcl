pid_file = "/home/vault/.pidfile"

vault {
  address = "https://vault-0.ordiri:8200"
  ca_cert = "/vault/tls/ca.crt"
  retry {
    num_retries = 5
  }
}

auto_auth {
  method "kubernetes" {
    mount_path = "auth/kubernetes"
    config = {
      role = "k8-autounseal-transit"
    }
  }

  sink "file" {
    config = {
      path = "/vault/secrets/unseal-token"
    }
  }
}