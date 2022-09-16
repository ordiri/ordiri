{% macro wait_for_etcd(vault_addr, vault_path) %}
# There can be a race condition where by the vault({{vault_addr}}) may not be configured yet

{% endmacro %}