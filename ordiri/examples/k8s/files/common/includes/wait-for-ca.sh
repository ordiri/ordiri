{% macro wait_for_vault_ca(vault_addr, vault_path) %}
# Wait for it to be unsealed and ready to use
# https://developer.hashicorp.com/vault/api-docs/system/health#read-health-information
# this curl won't return a 200 all the time, a 429 indicates healthy still
while [[ "$(curl -sSL -X GET {{vault_addr}}/v1/sys/health | jq -e '.sealed')" != "false" ]]; do
    mkdir -p /tmp/
    echo "Waiting for Vault ({{vault_addr}}) to become initialized..."
    curl -sSL -X GET {{vault_addr}}/v1/sys/health > /tmp/last-vault-{{vault_path}}-status.log || true
    sleep 10
done

# There can be a race condition where by the vault({{vault_addr}}) may not be configured yet
while ! curl -fsSL -XGET {{vault_addr}}/v1/{{vault_path}}/ca_chain; do 
    echo "Waiting for PKI to be configured"
done
{% endmacro %}