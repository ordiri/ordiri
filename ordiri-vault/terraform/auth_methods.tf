resource "vault_auth_backend" "userpass" {
  type = "userpass"
}
resource "vault_auth_backend" "approle" {
  type = "approle"
}
resource "vault_auth_backend" "cert" {
    path = "cert"
    type = "cert"
}
resource "vault_auth_backend" "kubernetes" {
    path = "kubernetes"
    type = "kubernetes"
}
