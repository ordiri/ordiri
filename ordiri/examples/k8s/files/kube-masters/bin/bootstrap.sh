#!/usr/bin/env bash

cd $(mktemp -d)
set -eou pipefail

local_ip=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname

export VAULT_ADDR=https://vault-0.ordiri:8200

function get_vault_token() {
    export VAULT_TOKEN=$(vault write auth/approle/login ttl=30s role_id=kube-master-node -format=json | jq -r '.auth.client_token')
}

function write_tokens_to_vault() {
    get_vault_token

    curl -fsSL -o yq https://github.com/mikefarah/yq/releases/download/v4.27.5/yq_linux_amd64
    chmod +x yq
    test "$(sha256sum ./yq)" == "9a54846e81720ae22814941905cd3b056ebdffb76bf09acffa30f5e90b22d615  ./yq" || ( echo "failed fetching yq" && exit 2 )
    # Hacked in at 4am, don't judge
    cert_key=$(./yq eval-all --no-doc -e -r  '[select(.kind="InitConfiguration") | .certificateKey][0]' -o json /etc/kubernetes/kubeadm.yaml | jq --slurp -r '.[0]')
    
    kubeadm init phase upload-certs --upload-certs --config /etc/kubernetes/kubeadm.yaml
    vault kv put secret/k8s/master/join-cluster-config \
        cert_key=$cert_key \
        token=$(kubeadm token create --config /etc/kubernetes/kubeadm.yaml) \
        discovery_cert_hash=sha256:$(openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //')

    kubeadm token create --print-join-command | vault kv put secret/k8s/worker/join-command command=-
}

while ! curl --retry-all-errors --retry-delay 5 --retry 10 -fsSL --cacert /etc/ssl/certs/etcd-ca.crt --cert /etc/ssl/certs/etcd.crt --key /etc/ssl/private/etcd.key https://etcd-0.ordiri:2379/health; do 
    echo "Waiting for ETCD to be configured"
    sleep 5
done

if [[ ! -f "/etc/kubernetes/admin.conf" ]]; then
    if [[ "$local_hostname" == "kube-master-0" ]]; then
        cat /etc/kubernetes/config.yaml /etc/kubernetes/init.yaml > /etc/kubernetes/kubeadm.yaml
        kubeadm --config /etc/kubernetes/kubeadm.yaml init --upload-certs
        write_tokens_to_vault
    else
        while true; do
            get_vault_token
            export cert_key=$(vault kv get -field=cert_key secret/k8s/master/join-cluster-config || true)
            export discovery_cert_hash=$(vault kv get -field=discovery_cert_hash secret/k8s/master/join-cluster-config || true)
            export bootstrap_token=$(vault kv get -field=token secret/k8s/master/join-cluster-config || true)

            if [[ ! -z "$cert_key" && ! -z "$discovery_cert_hash" && ! -z "$bootstrap_token" ]]; then 
                cat /etc/kubernetes/config.yaml /etc/kubernetes/join.yaml | envsubst > /etc/kubernetes/kubeadm.yaml
                kubeadm --config /etc/kubernetes/kubeadm.yaml join
                break
            fi

            echo "Waiting for kube-master-0 to provision join commands"
            sleep 30
        done
    fi
elif [[ "$local_hostname" == "kube-master-0" ]]; then
    write_tokens_to_vault
fi