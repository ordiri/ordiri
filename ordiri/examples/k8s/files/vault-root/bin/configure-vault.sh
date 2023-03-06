#!/usr/bin/env bash
{% macro vault_policy(name) %}
{{ with_local_file('vault-root/policies/%s.hcl' % name, "/var/lib/vault/policies/%s.hcl" % name) }}
vault policy write {{name}} /var/lib/vault/policies/{{name}}.hcl
{% endmacro %}

set -eou pipefail
cd $(mktemp -d)

export VAULT_ADDR=https://vault-root-0.ordiri:8200
export local_hostname=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-hostname)
export local_ip=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-ipv4)

cat /vault/root/vault-operator-init.log | jq -r '.root_token' | vault login  -
if ! vault audit list -format json | jq -e '.["file/"]'; then
    vault audit enable file file_path=/vault/root/audit.log
fi

# Setup the transit engine we'll use to seal/unseal the cluster
if ! vault secrets list -format json | jq -e '.["transit/"]'; then
    vault secrets enable transit
    vault write -f transit/keys/vault-vms-autounseal
fi

mkdir -p /var/lib/vault/policies/
{{ vault_policy('vault-vms-autounseal') }}
{{ vault_policy('generate-cert') }}
{{ vault_policy('sign-root-ca') }}

# Setup the transit engine we'll use to seal/unseal the cluster
if ! vault auth list -format json | jq -e '.["approle/"]'; then
    vault auth enable approle
fi

# Todo: should be dynamic and this whole thing is pretty silly buti it's quasi
# secure
vault_ips="10.200.3.0/24"
vault write auth/approle/role/vault-vms-autounseal token_policies="vault-vms-autounseal" \
    token_ttl=5m token_max_ttl=10m bind_secret_id=false token_bound_cidrs=${vault_ips},127.0.0.1/32
# make it possible to login with a simple id
vault write auth/approle/role/vault-vms-autounseal/role-id role_id=vault-vms-autounseal 

vault write auth/approle/role/vault-ca-bootstrap token_policies="sign-root-ca,generate-cert" \
    token_ttl=5m token_max_ttl=10m bind_secret_id=false token_bound_cidrs=${vault_ips},127.0.0.1/32
# make it possible to login with a simple id
vault write auth/approle/role/vault-ca-bootstrap/role-id role_id=vault-ca-bootstrap 

# Setup the transit engine we'll use to seal/unseal the cluster
if ! vault secrets list -format json | jq -e '.["pki/"]'; then
    vault secrets enable pki
    vault secrets tune -max-lease-ttl=87600h pki
    vault write -field=certificate pki/root/generate/internal \
        common_name="dmann.xyz Root CA" \
        issuer_name="dmann-xyz-2022" \
        ttl=87600h > root_2022_ca.crt

    vault write pki/config/urls \
    issuing_certificates="https://${local_hostname}.ordiri:8200/v1/pki/ca" \
    crl_distribution_points="https://${local_hostname}.ordiri:8200/v1/pki/crl"
fi
vault write pki/roles/dmann-xyz-2022 allow_any_name=true

if ! vault secrets list -format json | jq -e '.["pki_int/"]'; then
    vault secrets enable -path=pki_int pki
    vault secrets tune -max-lease-ttl=43800h pki_int
    vault write -format=json pki_int/intermediate/generate/internal \
    common_name="dmann.xyz Intermediate Authority" \
    issuer_name="dmann-default" \
    | jq -r '.data.csr' > pki_intermediate.csr

    vault write -format=json pki/root/sign-intermediate \
    issuer_ref="dmann-xyz-2022" \
    csr=@pki_intermediate.csr \
    format=pem_bundle ttl="43800h" \
    | jq -r '.data.certificate' > intermediate.cert.pem

    vault write pki_int/intermediate/set-signed certificate=@intermediate.cert.pem
fi
vault write pki_int/roles/dmann-default \
    issuer_ref="$(vault read -field=default pki_int/config/issuers)" \
    allowed_domains="dmann.xyz,ordiri" \
    allow_subdomains=true \
    max_ttl="720h"