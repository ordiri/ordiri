#!/usr/bin/env bash

set -eou pipefail

cd $(mktemp -d)

apt update && apt install -y ssl-cert

# We install Vault first to keep boot fast
{% include 'common/install-vault.sh' %}

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

# There can be a race condition where by the root vault may not be configured yet
while ! curl -s -L -XGET https://vault-root-0.ordiri:8200/v1/pki_int/ca_chain; do 
    echo "Waiting for PKI to be configured"
done

# We do this in 2 stages because the first openssl s_client call above imports the tls cert of the vault server
# and now we need the ca cert of the intermediate issuer that will be issuing our root ca certs
curl -s -L -XGET https://vault-root-0.ordiri:8200/v1/pki_int/ca_chain | awk 'BEGIN {c=0;} /BEGIN CERT/{c++} { print > "/usr/local/share/ca-certificates/vault-root-ca." c ".crt"}'
update-ca-certificates

local_ip=$(curl 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname # Export these so we can use them vault HCL files below

{% import 'common/install-cert-renewer.sh' as renewer %}
{{ renewer.vault_cert_renewer("vault-ca-bootstrap", "https://vault-root-0.ordiri:8200", "pki_int/issue/dmann-default") }}

{{ with_local_file('vault/bin/fetch-unseal-token.sh', "/sbin/fetch-unseal-token.sh", mode="+x") }}
{{ with_local_file('vault/bin/configure-vault.sh', "/sbin/configure-vault.sh", mode="+x") }}

{{ with_local_file('vault/vault/vault.hcl', "/etc/vault.d/vault.hcl", executable=True) }}
{{ with_local_file('vault/systemd/fetch-unseal-token.service', "/etc/systemd/system/fetch-unseal-token.service") }}
{{ with_local_file('vault/systemd/configure-vault.service', "/etc/systemd/system/configure-vault.service") }}

systemctl enable cert-renewer@vault.service cert-renewer@vault.timer configure-vault.service fetch-unseal-token.service vault
mkdir -p /etc/systemd/system/vault.service.requires/
ln -sf /etc/systemd/system/cert-renewer@vault.service /etc/systemd/system/vault.service.requires/cert-renewer@vault.service

addgroup --system 'ssl-cert' || true
chown -R root:ssl-cert '/etc/ssl/private'
chmod 710 '/etc/ssl/private'
chmod 440 '/etc/ssl/private/'*
usermod -a -G ssl-cert vault || true

mkdir -p /var/lib/vault/data
chown -Rf vault:vault /var/lib/vault

echo "Completed preseed sucessfully"