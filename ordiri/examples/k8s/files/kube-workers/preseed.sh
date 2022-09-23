#!/bin/bash

{% import 'common/includes/install-cert-renewer.sh' as renewer %}

set -eou pipefail

apt-get install -y dnsutils

cd $(mktemp -d)
local_ip=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname # Export these so we can use them in envsubst call below

{% include 'common/includes/install-vault.sh' %}
{% include 'common/includes/install-ca.sh' %}
{% include 'common/includes/install-kube.sh' %}
{{ renewer.vault_cert_renewer("kube-worker-node", "https://vault-0.ordiri:8200", "pki/issue/homelab-default") }}

{{ with_local_file('kube-workers/systemd/kube-worker-bootstrap.service', "/etc/systemd/system/kube-worker-bootstrap.service") }}
{{ with_local_file('kube-workers/bin/bootstrap.sh', "/sbin/bootstrap.sh", mode="+x") }}

cluster_ip=$(dig +short kube-master-0.ordiri)
echo "${cluster_ip} cluster.homelab.dmann.xyz" >> /etc/hosts

systemctl enable cert-renewer@etcd.timer \
    cert-renewer@etcd.service \
    cert-renewer@kube-worker.timer \
    cert-renewer@kube-worker.service \
    /etc/systemd/system/kube-worker-bootstrap.service

echo "Completed preseed"