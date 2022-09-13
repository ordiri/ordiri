{% macro vault_cert_renewer(vault_role, vault_addr, vault_path) %}
{{ with_local_file('common/bin/vault-cert.sh', "/usr/bin/vault-cert", mode="+x") }}
{{ with_local_file('common/systemd/cert-renewer@.service', "/etc/systemd/system/cert-renewer@.service", vault_role=vault_role, vault_addr=vault_addr, vault_path=vault_path) }}
{{ with_local_file('common/systemd/cert-renewer@.timer', "/etc/systemd/system/cert-renewer@.timer") }}
{% endmacro %}