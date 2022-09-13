#!/usr/bin/env bash

set -eou pipefail

cd $(mktemp -d)

apt update && apt install -y ssl-cert

# We install Vault first to keep boot fast
{% include 'common/includes/install-vault.sh' %}
{% include 'common/includes/install-root-ca.sh' %}


local_ip=$(curl 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname # Export these so we can use them vault HCL files below

{% import 'common/includes/install-cert-renewer.sh' as renewer %}
{{ renewer.vault_cert_renewer("vault-ca-bootstrap", "https://vault-root-0.ordiri:8200", "pki_int/issue/dmann-default") }}

{{ with_local_file('vault/bin/fetch-unseal-token.sh', "/sbin/fetch-unseal-token.sh", mode="+x") }}
{{ with_local_file('vault/bin/configure-vault.sh', "/sbin/configure-vault.sh", mode="+x") }}

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