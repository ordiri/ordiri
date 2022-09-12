{% macro vault_cert_renewer(vault_role, vault_addr, vault_path) %}
{{ with_local_file('common/bin/vault-cert.sh', "/usr/bin/vault-cert") }}
{{ with_local_file('common/systemd/cert-renewer@.service', "/etc/systemd/system/cert-renewer@.service") }}
{{ with_local_file('common/systemd/cert-renewer@.timer', "/etc/systemd/system/cert-renewer@.timer") }}

chmod +x /usr/bin/vault-cert
{% endmacro %}