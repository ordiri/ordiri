#!/usr/bin/env bash

set -eou pipefail
cd $(mktemp -d)

export local_hostname=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-hostname)
export local_ip=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-ipv4)

mkdir -p /vault/root/vault-tls

if [[ ! -f /vault/root/vault-tls/vault.key ]]; then
    echo "[req]
distinguished_name = req_distinguished_name
req_extensions = req_ext
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = AU
ST = NSW
L = Sydney
O = Ordiri
OU = Cloud
CN = ${local_hostname}.homelab.house.dmann.xyz

[v3_req]
keyUsage = keyEncipherment, dataEncipherment
extendedKeyUsage = serverAuth
subjectAltName = @alt_names
[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1 = ${local_hostname}.homelab.house.dmann.xyz
DNS.2 = ${local_hostname}.ordiri
IP.1 = ${local_ip}" > /vault/root/vault-tls/vault.conf
    openssl req -x509 -nodes -days 730 -newkey rsa:4096 -keyout /vault/root/vault-tls/vault.key -out /vault/root/vault-tls/vault.crt -config /vault/root/vault-tls/vault.conf
fi

cp /vault/root/vault-tls/vault.crt /usr/local/share/ca-certificates/
update-ca-certificates

chown -Rf vault:vault /vault/root