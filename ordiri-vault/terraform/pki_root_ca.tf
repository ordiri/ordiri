resource "vault_mount" "root_v1" {
  path        = "dmann-xyz/v1/root/v1"
  type        = "pki"
  description = "dmann.xyz Root PKI Mount"
}

resource "vault_pki_secret_backend_root_cert" "root_v1" {
  depends_on            = [vault_mount.root_v1]
  backend               = vault_mount.root_v1.path
  type                  = "internal"
  common_name           = "DmannXYZ Certification Authority - Root"
  ttl                   = "315360000"
  format                = "pem"
  private_key_format    = "der"
  key_type              = "rsa"
  key_bits              = 4096
  exclude_cn_from_sans  = true
  ou                   = "DmannXYZ Certification Authority"
  organization         = "DmannXYZ"
  country              = "AU"
  locality             = "NSW"
  province             = "Sydney"
}

