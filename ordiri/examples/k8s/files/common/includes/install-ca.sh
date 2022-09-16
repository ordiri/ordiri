{% import 'common/includes/wait-for-ca.sh' as ca_waiter %}
{% include 'common/includes/install-root-ca.sh' %}

{{ ca_waiter.wait_for_vault_ca("https://vault-0.ordiri:8200", "pki") }}

curl  -fsSL https://vault-0.ordiri:8200/v1/pki/ca_chain | awk 'BEGIN {c=0;} /BEGIN CERT/{c++} { print > "/usr/local/share/ca-certificates/vault." c ".crt"}'
update-ca-certificates
