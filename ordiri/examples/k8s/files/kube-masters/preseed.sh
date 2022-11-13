#!/bin/bash

{% import 'common/includes/install-cert-renewer.sh' as renewer %}

set -eou pipefail

{% include 'common/includes/kube-init.sh' %}

cd $(mktemp -d)
local_ip=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl --retry 5 --retry-all-errors --retry-delay 5 --retry-max-time 120 -fsSL 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname # Export these so we can use them in envsubst call below

{% include 'common/includes/install-vault.sh' %}
{% include 'common/includes/install-ca.sh' %}
{% include 'common/includes/install-kube.sh' %}
{{ renewer.vault_cert_renewer("kube-master-node", "https://vault-0.ordiri:8200", "pki/issue/homelab-default") }}

{{ with_local_file('kube-masters/systemd/kube-master-bootstrap.service', "/etc/systemd/system/kube-master-bootstrap.service") }}
{{ with_local_file('kube-masters/bin/bootstrap.sh', "/sbin/bootstrap.sh", mode="+x") }}

mkdir -p /etc/kubernetes/
{{ with_local_file('kube-masters/kubeadm/config.yaml', "/etc/kubernetes/config.yaml") }}
export cert_key=$(kubeadm certs certificate-key);
{{ with_local_file('kube-masters/kubeadm/init.yaml', "/etc/kubernetes/init.yaml", executable=True) }}
{{ with_local_file('kube-masters/kubeadm/join.yaml', "/etc/kubernetes/join.yaml") }}


cluster_ip=$(dig +short kube-master-0.ordiri)
echo "${cluster_ip} cluster.homelab.dmann.xyz" >> /etc/hosts

systemctl enable cert-renewer@etcd.timer \
    cert-renewer@etcd.service \
    cert-renewer@kube-master.timer \
    cert-renewer@kube-master.service \
    /etc/systemd/system/kube-master-bootstrap.service

echo "Completed preseed"