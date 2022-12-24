# data "tls_certificate" "kube-cluster" {
#   url = "https://cluster.homelab.dmann.xyz:6443"
#   verify_chain = false
# }

resource "vault_kubernetes_auth_backend_config" "kube-cluster" {
  backend                = vault_auth_backend.kubernetes.path
  kubernetes_host        = "https://cluster.homelab.dmann.xyz:6443"
  # kubernetes_ca_cert     = join("\n", data.tls_certificate.kube-cluster.certificates[*].cert_pem)
}