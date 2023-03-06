#!/usr/bin/env bash
{% macro vault_policy(name) %}
{{ with_local_file('vault/policies/%s.hcl' % name, "/var/lib/vault/policies/%s.hcl" % name) }}
vault policy write {{name}} /var/lib/vault/policies/{{name}}.hcl
{% endmacro %}
set -eou pipefail

cd $(mktemp -d)

local_ip=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname

chown -f vault:ssl-cert /etc/ssl/private/vault.key /etc/ssl/certs/vault.crt /etc/ssl/certs/vault-ca.crt || true

export VAULT_ADDR="https://${local_hostname}.ordiri:8200"

if [[ "${local_hostname}" == "vault-0" ]]; then
    if [[ "$(vault status --format=json | jq -r '.initialized')" != "true" ]]; then
        if [ -s "/var/lib/vault/root" ]; then
            echo "vault root token already exists on disk ?!"
            exit 2    
        fi
        
        vault operator init --format=json > /var/lib/vault/root # lol
        VAULT_ADDR=https://vault-root-0.ordiri:8200 \
        VAULT_TOKEN=$(VAULT_ADDR=https://vault-root-0.ordiri:8200 vault write auth/approle/login role_id=vault-vms-autounseal -format=json | jq -r '.auth.client_token') \
            vault kv put secret/vault/root/operator-init output=@/var/lib/vault/root token=$(cat /var/lib/vault/root | jq -r '.root_token')
    fi
    
    VAULT_TOKEN=$(cat /var/lib/vault/root | jq -r '.root_token')
    export VAULT_TOKEN

    if ! vault audit list -format json | jq -e '.["file/"]'; then
        vault audit enable file file_path=/var/lib/vault/audit.log
    fi 

    if ! vault secrets list -format json | jq -e '.["secret/"]'; then
        vault secrets enable -path=secret kv-v2
    fi

    if ! vault secrets list -format json | jq -e '.["pki/"]'; then
        vault secrets enable pki
        vault secrets tune -max-lease-ttl=43800h pki
        vault write -format=json pki/intermediate/generate/internal \
            common_name="homelab.dmann.xyz Intermediate Authority" \
            issuer_name="homelab-dot-dmann-xyz" \
            | jq -r '.data.csr' > pkiermediate.csr

        VAULT_ADDR=https://vault-root-0.ordiri:8200 \
        VAULT_TOKEN=$(VAULT_ADDR=https://vault-root-0.ordiri:8200 vault write auth/approle/login role_id=vault-ca-bootstrap -format=json | jq -r '.auth.client_token') \
            vault write -format=json pki_int/root/sign-intermediate \
            csr=@pkiermediate.csr \
            format=pem_bundle ttl="43800h" \
            | jq -r '.data.certificate' > intermediate.cert.pem

        vault write pki/intermediate/set-signed certificate=@intermediate.cert.pem
    fi

    # Setup the transit engine we'll use to seal/unseal the cluster
    if ! vault secrets list -format json | jq -e '.["transit/"]'; then
        vault secrets enable transit
        vault write -f transit/keys/k8-autounseal-transit
    fi

    vault write pki/config/urls \
        issuing_certificates="https://${local_hostname}.ordiri:8200/v1/pki/ca" \
        crl_distribution_points="https://${local_hostname}.ordiri:8200/v1/pki/crl"

    # Use oidc from ordiri control plane to drive a hostname based tls cert
    vault write pki/roles/homelab-default \
        issuer_ref="$(vault read -field=default pki/config/issuers)" \
        allowed_domains="homelab.dmann.xyz,ordiri" \
        allow_subdomains=true \
        max_ttl="720h"

    mkdir -p /var/lib/vault/policies/
    {{ vault_policy('generate-homelab-cert') }}
    {{ vault_policy('k8-master') }}
    {{ vault_policy('k8-worker') }}
    {{ vault_policy('k8-auth-config') }}
    {{ vault_policy('k8-autounseal-transit') }}

    if ! vault auth list -format json | jq -e '.["approle/"]'; then
        vault auth enable approle
    fi
    if ! vault auth list -format json | jq -e '.["kubernetes/"]'; then
        vault auth enable kubernetes
    fi
    # if ! vault auth list -format json | jq -e '.["oidc/"]'; then
    #     vault auth enable oidc
    # fi

    # vault write auth/oidc/config \
    #      oidc_discovery_url="https://vault.homelab.dmann.xyz:8200/v1/identity/oidc/provider/default/.well-known/openid-configuration" \
    #      oidc_client_id="$AUTH0_CLIENT_ID" \
    #      oidc_client_secret="$AUTH0_CLIENT_SECRET" \
    #      default_role="reader"

    etcd_cidr="10.200.0.0/24"
    vault write auth/approle/role/etcd-node token_policies="generate-homelab-cert" \
    token_ttl=5m token_max_ttl=10m bind_secret_id=false token_bound_cidrs=${etcd_cidr}
    vault write auth/approle/role/etcd-node/role-id role_id=etcd-node  # make it possible to login with a simple id

    kube_masters_cidr="10.200.1.0/24"
    vault write auth/approle/role/kube-master-node token_policies="generate-homelab-cert,k8-master,k8-auth-config" \
    token_ttl=5m token_max_ttl=10m bind_secret_id=false token_bound_cidrs=${kube_masters_cidr}
    vault write auth/approle/role/kube-master-node/role-id role_id=kube-master-node  # make it possible to login with a simple id

    kube_workers_cidr="10.200.2.0/24"
    vault write auth/approle/role/kube-worker-node token_policies="generate-homelab-cert,k8-worker" \
    token_ttl=5m token_max_ttl=10m bind_secret_id=false token_bound_cidrs=${kube_workers_cidr}
    vault write auth/approle/role/kube-worker-node/role-id role_id=kube-worker-node # make it possible to login with a simple id

    vault write auth/kubernetes/role/k8-autounseal-transit token_policies="k8-autounseal-transit" \
        token_ttl=5m token_max_ttl=10m \
        bound_service_account_names=vault \
        bound_service_account_namespaces=vault \
        alias_name_source=serviceaccount_name

    # TODO Replace once CloudDNS is implemented
    # echo "10.200.1.214 cluster.homelab.dmann.xyz" >> /etc/hosts
fi

while true; do
    if [[ "$(vault status --format=json | jq -r '.sealed')" != "false" ]]; then
        echo "Vault is still sealed, waiting"
        sleep 1
    else
        echo "Vault is unsealed, continuing"
        break
    fi
done