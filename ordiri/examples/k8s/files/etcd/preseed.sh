#!/bin/bash
set -eou pipefail

CLUSTER_PORT=2380
CLIENT_PORT=2379
ETCD_VER=v3.5.4
DOWNLOAD_URL=https://storage.googleapis.com/etcd

cd $(mktemp -d)

{% include 'common/includes/install-vault.sh' %}
{% include 'common/includes/install-root-ca.sh' %}
{% import 'common/includes/install-cert-renewer.sh' as renewer %}
{{ renewer.vault_cert_renewer("etcd-node", "https://vault-0.ordiri:8200", "pki/issue/homelab-default") }}

local_ip=$(curl 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname # Export these so we can use them in envsubst call below

curl -L ${DOWNLOAD_URL}/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz -o etcd-${ETCD_VER}-linux-amd64.tar.gz
tar xzvf etcd-${ETCD_VER}-linux-amd64.tar.gz --strip-components=1
rm -f etcd-${ETCD_VER}-linux-amd64.tar.gz
mv ./{etcd,etcdctl} /sbin/.

# todo once dns is implemented properly, change this to use the subnet local dns records
# should make this jinja loop
peers=""
endpoints=""
for i in $(seq 0 2); do 
    hn="etcd-${i}.ordiri"
    if [[ -n "${peers}" ]]; then
        peers="${peers},"
        endpoints="${endpoints},"
    fi
    peers="${peers}${hn}=https://${hn}:2380"
    endpoints="${endpoints}https://${hn}:2379"
done

{{ with_local_file('etcd/systemd/etcd.service', "/etc/systemd/system/etcd.service", executable=True) }}

systemctl enable cert-renewer@etcd.timer
systemctl enable cert-renewer@etcd.service
systemctl enable /etc/systemd/system/etcd.service
systemctl daemon-reload || true

echo "export ETCDCTL_API=3
export ETCDCTL_ENDPOINTS=$endpoints
export ETCDCTL_INSECURE_TRANSPORT=false
export ETCDCTL_CACERT=/etc/ssl/certs/etcd-ca.crt
export ETCDCTL_CERT=/etc/ssl/certs/etcd.crt
export ETCDCTL_KEY=/etc/ssl/private/etcd.key # todo: change this and ship tls certs via metadata server
" > $HOME/.etcdctl

echo "
# Etcd installed
#
# To test, please run
source $HOME/.etcdctl
etcdctl member list
"