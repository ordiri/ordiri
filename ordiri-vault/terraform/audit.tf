resource "vault_audit" "admin" {
  type = "file"

  options = {
    file_path = "/var/log/vault/audit.log"
  }
}
