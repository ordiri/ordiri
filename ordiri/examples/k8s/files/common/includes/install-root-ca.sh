{% import 'common/includes/wait-for-ca.sh' as ca_waiter %}
# Wait for vault-root to come up and serve a valid TLS cert we can grab
while ! ( echo | openssl s_client -connect vault-root-0.ordiri:8200  2>/dev/null | openssl x509 > /usr/local/share/ca-certificates/vault-root-srv.crt ); do
    echo "Waiting..."
    sleep 10
done

if [[ ! -s "/usr/local/share/ca-certificates/vault-root-srv.crt" ]]; then
    echo "Vault root server certificate is unexpectedly empty"
    exit 2
fi

# Import the cert from above into the system cert store so we don't get cert errors talking to the root vaults self-signed cert
# which is different than the CA cert it'll be issuing, that we also want to trust
update-ca-certificates

{{ ca_waiter.wait_for_vault_ca("https://vault-root-0.ordiri:8200", "pki_int") }}

curl -fsSL -L -XGET https://vault-root-0.ordiri:8200/v1/pki_int/ca_chain | awk 'BEGIN {c=0;} /BEGIN CERT/{c++} { print > "/usr/local/share/ca-certificates/vault-root-ca." c ".crt"}'
update-ca-certificates