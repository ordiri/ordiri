#!/bin/bash
set -eou pipefail

apt-get install -y dnsutils

cd $(mktemp -d)
local_ip=$(curl 169.254.169.254/latest/meta-data/local-ipv4)
local_hostname=$(curl 169.254.169.254/latest/meta-data/local-hostname)
export local_ip local_hostname # Export these so we can use them in envsubst call below

{% include 'common/includes/install-vault.sh' %}
{% include 'common/includes/install-root-ca.sh' %}
{% import 'common/includes/install-cert-renewer.sh' as renewer %}
{{ renewer.vault_cert_renewer("kube-master-node", "https://vault-0.ordiri:8200", "pki/issue/homelab-default") }}

{% include 'common/includes/install-kube.sh' %}

{{ with_local_file('kube-masters/systemd/kube-master-bootstrap.service', "/etc/systemd/system/kube-master-bootstrap.service") }}
{{ with_local_file('kube-masters/bin/bootstrap.sh', "/sbin/bootstrap.sh", mode="+x") }}
mkdir -p /usr/local/kubeadm/
{{ with_local_file('kube-masters/kubeadm/config.yaml', "/usr/local/kubeadm/config.yaml") }}

echo "br_netfilter
bridge
overlay
" > /etc/modules-load.d/modules.conf

echo "net.bridge.bridge-nf-call-iptables=1
net.ipv4.ip_forward=1
" > /etc/sysctl.d/kubelet.conf



cluster_ip=$(dig +short kube-master-0.ordiri)
echo "${cluster_ip} cluster.homelab.dmann.xyz" >> /etc/hosts

systemctl enable cert-renewer@etcd.timer \
    cert-renewer@etcd.service \
    cert-renewer@kube-master.timer \
    cert-renewer@kube-master.service \
    /etc/systemd/system/kube-master-bootstrap.service


echo "Completed preseed"