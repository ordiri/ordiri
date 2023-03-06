#!/usr/bin/env bash

cd $(mktemp -d)
set -eou pipefail

local_ip=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname


export VAULT_ADDR=https://vault-0.ordiri:8200

function get_vault_token() {
    export VAULT_TOKEN=$(vault write auth/approle/login ttl=30s role_id=kube-worker-node -format=json | jq -r '.auth.client_token')
}

while true; do
    get_vault_token
    command=$(vault kv get -field=command secret/k8s/worker/join-command || true)
    if [[ ! -z "$command" ]]; then 
        echo "$command"
        eval "$command"
        break
    fi

    echo "Waiting for kube-master-0 to provision join commands"
    sleep 30
done