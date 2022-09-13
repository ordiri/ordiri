# Wait for vault-root to come up and serve a valid TLS cert we can grab
while ! ( echo | openssl s_client -connect vault-root-0.ordiri:8200  2>/dev/null | openssl x509 > /usr/local/share/ca-certificates/vault-root-srv.crt ); do
    echo "Waiting..."
    sleep 10
done

# Import the cert from above into the system cert store
update-ca-certificates

# Wait for it to be unsealed and ready to use
while [[ "$(curl -s -X GET https://vault-root-0.ordiri:8200/v1/sys/health | jq -e '.sealed')" != "false" ]]; do
    mkdir -p /tmp/
    echo "Waiting for Root Vault to become initialized..."
    curl -s -X GET https://vault-root-0.ordiri:8200/v1/sys/health > /tmp/last-vault-root-status.log
    sleep 10
done

# There can be a race condition where by the root vault may not be configured yet
while ! curl -s -L -XGET https://vault-root-0.ordiri:8200/v1/pki_int/ca_chain; do 
    echo "Waiting for PKI to be configured"
done

# We do this in 2 stages because the first openssl s_client call above imports the tls cert of the vault server
# and now we need the ca cert of the intermediate issuer that will be issuing our root ca certs
curl -s -L -XGET https://vault-root-0.ordiri:8200/v1/pki_int/ca_chain | awk 'BEGIN {c=0;} /BEGIN CERT/{c++} { print > "/usr/local/share/ca-certificates/vault-root-ca." c ".crt"}'
update-ca-certificates