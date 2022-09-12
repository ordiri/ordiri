#!/usr/bin/env bash

set -eou pipefail

cd $(mktemp -d)
apt update && apt install -y gpg jq wget curl ca-certificates ssl-cert
# Wait for vault-root to come up and serve a valid TLS cert we can grab
while ! ( echo | openssl s_client -connect vault-root-0.ordiri:8200  2>/dev/null | openssl x509 > /usr/local/share/ca-certificates/vault-root-srv.crt ); do
    echo "Waiting..."
    sleep 10
done

# Import the cert from above into the system cert store
update-ca-certificates

# Wait for it to be unsealed and ready to use
while [[ "$(curl -s -X GET https://vault-root-0.ordiri:8200/v1/sys/health | jq -e '.sealed')" != "false" ]]; do
    mkdir -p /tmp/
    echo "Waiting for Root Vault to become initialized..."
    curl -s -X GET https://vault-root-0.ordiri:8200/v1/sys/health > /tmp/last-vault-root-status.log
    sleep 10
done

while ! curl -s -L -XGET https://vault-root-0.ordiri:8200/v1/pki_int/ca_chain; do 
    echo "Waiting for PKI to be configured"
done

# We do this in 2 stages because the first curl imports the root which issues the second
curl -s -L -XGET https://vault-root-0.ordiri:8200/v1/pki_int/ca_chain | awk 'BEGIN {c=0;} /BEGIN CERT/{c++} { print > "/usr/local/share/ca-certificates/vault-root." c ".crt"}'
update-ca-certificates

local_ip=$(curl 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname # Export these so we can use them in envsubst call below

{% include 'common/install-vault.sh' %}

echo 'disable_mlock = true
ui=true

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
    retry_join {
    leader_tls_servername = "vault-2.ordiri"
    leader_api_addr = "https://vault-2.ordiri:8200"
    leader_ca_cert_file     = "/etc/ssl/certs/vault-ca.crt"
    leader_client_cert_file = "/etc/ssl/certs/vault.crt"
    leader_client_key_file  = "/etc/ssl/private/vault.key"
    }
}

cluster_addr = "https://${local_hostname}:8201"
api_addr = "https://${local_hostname}:8200"

listener "tcp" {
    address            = "0.0.0.0:8200"
    tls_client_ca_file = "/etc/ssl/certs/vault-ca.crt"
    tls_cert_file      = "/etc/ssl/certs/vault.crt"
    tls_key_file       = "/etc/ssl/private/vault.key"
}

seal "transit" {
    address = "https://vault-root-0.ordiri:8200"
    disable_renewal = "false"
    key_name = "vault-vms-autounseal"
    mount_path = "transit/"
    tls_skip_verify = "true"
}' | envsubst > /etc/vault.d/vault.hcl


tee /usr/bin/vault-cert <<'EOF'
#!/usr/bin/env bash

tmp=$(mktemp)

export local_hostname=$(curl 169.254.169.254/latest/meta-data/local-hostname)
export local_ip=$(curl 169.254.169.254/latest/meta-data/local-ipv4)

VAULT_TOKEN=$(vault write auth/approle/login role_id=$VAULT_ROLE_ID -format=json | jq -r '.auth.client_token') \
    vault write --format=json $VAULT_PATH \
    common_name="${local_hostname}.homelab.dmann.xyz" \
    ip_sans="${local_ip}" \
    alt_names="${local_hostname}.ordiri" \
    ttl="24h" > $tmp


cat $tmp | jq -r '.data.ca_chain | join("\n")' > $CA_LOCATION
cat $tmp | jq -r '.data.certificate' > $CERT_LOCATION
cat $tmp | jq -r '.data.private_key' > $KEY_LOCATION
rm -f $tmp || true # should be in a trap
EOF

chmod +x /usr/bin/vault-cert

tee /etc/systemd/system/cert-renewer@.service <<'EOF'
[Unit]
Description=Certificate renewer for %I
After=network-online.target
Documentation=https://github.com/smallstep/cli/blob/005920ad4122fa5838c338b567d6584fcc33c1cc/systemd/cert-renewer@.service
StartLimitIntervalSec=0

[Service]
Type=oneshot
User=root

Environment=CA_LOCATION=/etc/ssl/certs/%i-ca.crt
Environment=CERT_LOCATION=/etc/ssl/certs/%i.crt
Environment=KEY_LOCATION=/etc/ssl/private/%i.key
Environment=VAULT_ROLE_ID=vault-ca-bootstrap
Environment=VAULT_ADDR=https://vault-root-0.ordiri:8200
Environment=VAULT_PATH=pki_int/issue/dmann-default

ExecCondition=/usr/bin/env sh -c "! test -f ${CERT_LOCATION} || ! /usr/bin/openssl x509 -checkend 86400 -noout -in ${CERT_LOCATION}"

; ExecStart renews the certificate, if ExecStartPre was successful.
ExecStart=/usr/bin/vault-cert

; Try to reload or restart the systemd service that relies on this cert-renewer
; If the relying service doesn't exist, forge ahead.
; (In systemd <229, use `reload-or-try-restart` instead of `try-reload-or-restart`)
ExecStartPost=/usr/bin/env sh -c "! systemctl --quiet is-enabled %i.service || systemctl try-reload-or-restart %i"
[Install]
WantedBy=multi-user.target
EOF

tee /etc/systemd/system/cert-renewer@.timer <<'EOF'
[Unit]
Description=Timer for certificate renewal of %I
Documentation=https://smallstep.com/docs/step-ca/certificate-authority-server-production
Documentation=https://github.com/smallstep/cli/blob/005920ad4122fa5838c338b567d6584fcc33c1cc/systemd/cert-renewer%40.timer

[Timer]
Persistent=true

; Run the timer unit every 15 minutes.
OnCalendar=*:1/15

; Always run the timer on time.
AccuracySec=1us

; Add jitter to prevent a "thundering hurd" of simultaneous certificate renewals.
RandomizedDelaySec=5m

[Install]
WantedBy=timers.target
EOF
mkdir -p /var/lib/vault/data
chown -Rf vault:vault /var/lib/vault

systemctl enable cert-renewer@vault.timer
systemctl enable cert-renewer@vault.service
mkdir -p /etc/systemd/system/vault.service.requires/
ln -sf /etc/systemd/system/cert-renewer@vault.service /etc/systemd/system/vault.service.requires/cert-renewer@vault.service

addgroup --system 'ssl-cert' || true
chown -R root:ssl-cert '/etc/ssl/private'
chmod 710 '/etc/ssl/private'
chmod 440 '/etc/ssl/private/'*
usermod -a -G ssl-cert vault || true

if systemctl --quiet is-enabled vault.service; then
    if systemctl --quiet is-active vault.service; then
    systemctl reload vault || true
    else
    systemctl restart vault || true
    fi
fi
systemctl enable vault

echo "[Unit]
Description=Get the unseal token
Requires=network-online.target
Before=vault.service
PartOf=vault.service

[Service]
ExecStart=/bin/bash -c /sbin/fetch-unseal-token.sh

[Install]
RequiredBy=vault.service" > /etc/systemd/system/fetch-unseal-token.service

echo "[Unit]
Description=Configure vault
After=vault.service
PartOf=vault.service
Wants=first-boot-complete.target

[Service]
ExecStart=/bin/bash -c /sbin/configure-vault.sh
Restart=on-failure
RestartSec=10

[Install]
WantedBy=vault.service" > /etc/systemd/system/configure-vault.service

systemctl enable configure-vault.service fetch-unseal-token.service

tee /sbin/fetch-unseal-token.sh <<'EOF'
#!/usr/bin/env bash

cd $(mktemp -d)
vault_unseal_token=$(VAULT_ADDR=https://vault-root-0.ordiri:8200 vault write auth/approle/login role_id=vault-vms-autounseal -format=json | jq -r '.auth.client_token')

echo "VAULT_TOKEN=${vault_unseal_token}" >  /etc/vault.d/vault.env
EOF

chmod +x /sbin/fetch-unseal-token.sh

tee /sbin/configure-vault.sh <<'EOF'
#!/usr/bin/env bash

set -eou pipefail

cd $(mktemp -d)

local_ip=$(curl 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname # Export these so we can use them in envsubst call below

chown -f vault:ssl-cert /etc/ssl/private/vault.key /etc/ssl/certs/vault.crt /etc/ssl/certs/vault-ca.crt || true

export VAULT_ADDR="https://${local_hostname}.ordiri:8200"
if [[ "${local_hostname}" == "vault-0" ]]; then
    if [[ "$(vault status --format=json | jq -r '.initialized')" != "true" ]]; then
    vault operator init --format=json > /var/lib/vault/root # lol
    fi
    
    cat /var/lib/vault/root | jq -r '.root_token' | vault login -

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

    vault write pki/config/urls \
    issuing_certificates="https://${local_hostname}.ordiri:8200/v1/pki/ca" \
    crl_distribution_points="https://${local_hostname}.ordiri:8200/v1/pki/crl"

    vault write pki/roles/homelab-default \
    issuer_ref="$(vault read -field=default pki/config/issuers)" \
    allowed_domains="homelab.dmann.xyz,ordiri" \
    allow_subdomains=true \
    max_ttl="720h"

    vault policy write generate-homelab-cert - <<POLICY
    path "pki/issue/homelab-default" {
    capabilities = [ "update" ]
    }
POLICY

    vault policy write k8-master - <<POLICY
    path "secret/data/k8s/master/*" {
    capabilities = [ "update", "create", "read", "patch" ]
    }
    path "secret/data/k8s/worker/*" {
    capabilities = [ "update", "create", "read", "patch" ]
    }
POLICY
    vault policy write k8-worker - <<POLICY
    path "secret/data/k8s/worker/*" {
    capabilities = [ "read" ]
    }
POLICY

    if ! vault auth list -format json | jq -e '.["approle/"]'; then
    vault auth enable approle
    fi

    etcd_ips="10.200.0.0/24"
    vault write auth/approle/role/etcd-node token_policies="generate-homelab-cert" \
    token_ttl=5m token_max_ttl=10m bind_secret_id=false token_bound_cidrs=${etcd_ips}
    # make it possible to login with a simple id
    vault write auth/approle/role/etcd-node/role-id role_id=etcd-node 

    kube_masters="10.200.1.0/24"
    vault write auth/approle/role/kube-master-node token_policies="generate-homelab-cert,k8-master" \
    token_ttl=5m token_max_ttl=10m bind_secret_id=false token_bound_cidrs=${kube_masters}
    # make it possible to login with a simple id
    vault write auth/approle/role/kube-master-node/role-id role_id=kube-master-node 

    kube_workers="10.200.2.0/24"
    vault write auth/approle/role/kube-worker-node token_policies="generate-homelab-cert" \
    token_ttl=5m token_max_ttl=10m bind_secret_id=false token_bound_cidrs=${kube_workers}
    # make it possible to login with a simple id
    vault write auth/approle/role/kube-worker-node/role-id role_id=kube-worker-node
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
EOF
chmod +x /sbin/configure-vault.sh