resource "vault_pki_secret_backend_role" "role-pki-ca2-dmann-xyz" {
 backend            = vault_mount.dmann_xyz_v1_ica2_v1.path
 name               = "dmann-dot-xyz-subdomain"
 ttl                = local.default_1hr_in_sec
 allow_ip_sans      = true
 key_type           = "rsa"
 key_bits           = 2048
 key_usage          = [ "DigitalSignature"]
 allow_any_name     = false
 allow_localhost    = true
 allowed_domains    = ["dmann.xyz"]
 allow_bare_domains = false
 allow_subdomains   = true
 server_flag        = true
 client_flag        = true
 no_store           = false
 ou = ["DmannXYZ"]
}

resource "vault_pki_secret_backend_role" "role-pki-ca2-node" {
 backend            = vault_mount.dmann_xyz_v1_ica2_v1.path
 name               = "dmann-dot-xyz-node"
 ttl                = local.default_1hr_in_sec
 allow_ip_sans      = true
 key_type           = "rsa"
 key_bits           = 2048
 key_usage          = [ "DigitalSignature"]
 allow_any_name     = false
 allow_localhost    = false
 allowed_domains_template = true
 allowed_domains    = ["{{identity.entity.metadata.node}}.homelab.house.dmann.xyz"]
 allow_bare_domains = true
 allow_subdomains   = true
 server_flag        = true
 client_flag        = true
 no_store           = false
 ou = ["DmannXYZ - Infra"]
}

resource "vault_pki_secret_backend_role" "role-pki-ca2-approle-node" {
 backend            = vault_mount.dmann_xyz_v1_ica2_v1.path
 name               = "dmann-dot-xyz-approle-node"
 ttl                = local.default_1hr_in_sec
 allow_ip_sans      = true
 key_type           = "rsa"
 key_bits           = 2048
 key_usage          = [ "DigitalSignature"]
 allow_any_name     = false
 allow_localhost    = false
 allowed_domains_template = true
 allowed_domains    = ["{{identity.entity.aliases.${vault_auth_backend.approle.accessor}.metadata.node}}.homelab.house.dmann.xyz"]
 allow_bare_domains = true
 allow_subdomains   = false
 allow_glob_domains = false
 server_flag        = true
 client_flag        = true
 no_store           = false
 ou = ["DmannXYZ - Infra"]
}
