#!/usr/bin/env bash

set -eou pipefail
cd $(mktemp -d)

export VAULT_SKIP_VERIFY=true
if [[ "$(vault status --format=json | jq -r '.initialized')" == "false" ]]; then
    vault operator init --format=json | tee /vault/root/vault-operator-init.log
fi

export VAULT_ADDR=https://vault-root-0.ordiri:8200
if [[ "$(vault status --format=json | jq -r '.sealed')" == "true" ]]; then
    # Minus 1 to make the looping easier
    threshold=$(cat /vault/root/vault-operator-init.log | jq -r '.unseal_threshold - 1')
    for idx in $(seq 0 $threshold); do
    vault operator unseal $(cat /vault/root/vault-operator-init.log | jq --arg idx "$idx" -r '.unseal_keys_hex[$idx | tonumber]')
    done
fi

vault status