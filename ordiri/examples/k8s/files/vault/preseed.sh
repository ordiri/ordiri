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
{% import 'common/install-cert-renewer.sh' as renewer %}
{{ renewer.vault_cert_renewer("vault-ca-bootstrap", "https://vault-root-0.ordiri:8200", "pki_int/issue/dmann-default") }}

addgroup --system 'ssl-cert' || true
chown -R root:ssl-cert '/etc/ssl/private'
chmod 710 '/etc/ssl/private'
chmod 440 '/etc/ssl/private/'*
usermod -a -G ssl-cert vault || true

{{ with_local_file('vault/vault/vault.hcl', "/etc/vault.d/vault.hcl", executable=True) }}
{{ with_local_file('vault/systemd/fetch-unseal-token.service', "/etc/systemd/system/fetch-unseal-token.service") }}
{{ with_local_file('vault/systemd/configure-vault.service', "/etc/systemd/system/configure-vault.service") }}

systemctl enable cert-renewer@vault.service cert-renewer@vault.timer configure-vault.service fetch-unseal-token.service vault
mkdir -p /etc/systemd/system/vault.service.requires/
ln -sf /etc/systemd/system/cert-renewer@vault.service /etc/systemd/system/vault.service.requires/cert-renewer@vault.service

{{ with_local_file('vault/bin/fetch-unseal-token.sh', "/sbin/fetch-unseal-token.sh") }}
{{ with_local_file('vault/bin/configure-vault.sh', "/sbin/configure-vault.sh") }}
chmod +x /sbin/configure-vault.sh /sbin/fetch-unseal-token.sh

mkdir -p /var/lib/vault/data
chown -Rf vault:vault /var/lib/vault
