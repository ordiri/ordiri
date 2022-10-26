#!/usr/bin/env bash

export VAULT_ADDR="https://vault.homelab.dmann.xyz:8200"
ip addr add 2403:5806:97ec:2::76:6175:6C74/24 dev eth0

apt update && apt install gpg snapd
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg >/dev/null
gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vault jq

snap install core
sudo snap refresh core
snap install --classic certbot
snap install --classic terraform

ln -s /snap/bin/certbot /usr/bin/certbot 

cat << 'EOF' > /opt/vault/tls-renew-hook.sh
#!/usr/bin/env bash

cp ${RENEWED_LINEAGE}/fullchain.pem /opt/vault/tls/tls.crt && chown vault:vault /opt/vault/tls/tls.crt
cp ${RENEWED_LINEAGE}/privkey.pem /opt/vault/tls/tls.key && chown vault:vault /opt/vault/tls/tls.key
systemctl reload vault || true
EOF
chmod +x /opt/vault/tls-renew-hook.sh

certbot certonly --deploy-hook /opt/vault/tls-renew-hook.sh --standalone -d vault.homelab.dmann.xyz -m ninja@codingninja.com.au --agree-tos -n

cat << EOF > /etc/vault.d/vault.hcl
ui = true
storage "file" {
  path = "/opt/vault/data"
}
listener "tcp" {
  address       = "[::]:8200"
  tls_cert_file = "/opt/vault/tls/tls.crt"
  tls_key_file  = "/opt/vault/tls/tls.key"
}
api_addr = "${VAULT_ADDR}"
EOF


systemctl enable --now vault
systemctl reload vault

if [ ! -s "/opt/vault/init.json" ]; then
    vault operator init -format json > /opt/vault/init.json
fi


mkdir -p /var/log/vault/ && chown -R vault:vault /var/log/vault/


# terraform init
VAULT_TOKEN=$(jq -r '.root_token' < /opt/vault/init.json) terraform apply -auto-approve
terraform output -json  | jq '."node-provision-secret-id"'