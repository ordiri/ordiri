resource "vault_mount" "dmann_xyz_v1_ica2_v1" {
 path                      = "dmann-xyz/v1/ica2/v1"
 type                      = "pki"
 description               = "PKI engine hosting intermediate CA2 v1 for test org"
 default_lease_ttl_seconds = local.default_1hr_in_sec
 max_lease_ttl_seconds     = local.default_1y_in_sec
}

resource "vault_pki_secret_backend_intermediate_cert_request" "dmann_xyz_v1_ica2_v1" {
 depends_on   = [vault_mount.dmann_xyz_v1_ica2_v1]
 backend      = vault_mount.dmann_xyz_v1_ica2_v1.path
 type         = "internal"
 common_name  = "DmannXYZ Certification Authority - CA2 v1"
 key_type     = "rsa"
 key_bits     = "2048"
 ou                   = "DmannXYZ Certification Authority"
 organization         = "DmannXYZ"
 country              = "AU"
 locality             = "NSW"
 province             = "Sydney"
}

resource "vault_pki_secret_backend_root_sign_intermediate" "dmann_xyz_v1_sign_ica2_v1_by_ica1_v1" {
 depends_on = [
   vault_pki_secret_backend_intermediate_set_signed.dmann_xyz_v1_ica1_v1_signed_cert,
   vault_pki_secret_backend_intermediate_cert_request.dmann_xyz_v1_ica2_v1,
 ]
 backend              = vault_mount.dmann_xyz_v1_ica1_v1.path
 csr                  = vault_pki_secret_backend_intermediate_cert_request.dmann_xyz_v1_ica2_v1.csr
 common_name          = "Intermediate CA2 v1.1"
 exclude_cn_from_sans = true
 ou                   = "DmannXYZ Certification Authority"
 organization         = "DmannXYZ"
 country              = "AU"
 locality             = "NSW"
 province             = "Sydney"
 max_path_length      = 1
 ttl                  = local.default_1y_in_sec
}

resource "vault_pki_secret_backend_intermediate_set_signed" "dmann_xyz_v1_ica2_v1_signed_cert" {
 depends_on  = [vault_pki_secret_backend_root_sign_intermediate.dmann_xyz_v1_sign_ica2_v1_by_ica1_v1]
 backend     = vault_mount.dmann_xyz_v1_ica2_v1.path
 certificate = vault_pki_secret_backend_root_sign_intermediate.dmann_xyz_v1_sign_ica2_v1_by_ica1_v1.certificate
}
