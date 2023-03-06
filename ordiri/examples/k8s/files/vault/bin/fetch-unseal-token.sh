#!/usr/bin/env bash

set -eou pipefail

cd $(mktemp -d)
vault_unseal_token=$(VAULT_ADDR=https://vault-root-0.ordiri:8200 vault write auth/approle/login role_id=vault-vms-autounseal -format=json | jq -r '.auth.client_token')

local_ip=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname

{{ with_local_file('vault/vault/vault.hcl', "/etc/vault.d/vault.hcl", executable=True) }}