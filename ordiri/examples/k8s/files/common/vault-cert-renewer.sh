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