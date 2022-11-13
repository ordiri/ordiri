#!/usr/bin/env bash

export PATH=/sbin:$PATH
export VAULT_ADDR=https://vault.homelab.dmann.xyz:8200

roles="ceph-slave,"
latest_drivers="yes"
ceph="true"
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg >/dev/null
gpg --no-default-keyring --keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg --fingerprint
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
apt-get update
apt-get upgrade -y
apt-get install -y sudo curl wget ca-certificates systemd-timesyncd ssl-cert podman lvm2 qemu-kvm libvirt-clients libvirt-daemon-system bridge-utils virtinst libvirt-daemon openvswitch-switch psmisc vault jq libvirt-daemon-driver-storage-rbd libcephfs-dev librbd-dev librados-dev qemu-block-extra 


if [[ ! cat /etc/libvirt/libvirtd.conf | grep -E 'auth_tcp = "none"' ]]; then
    echo 'auth_tcp = "none"' >> /etc/libvirt/libvirtd.conf
fi

if [[ "$latest_drivers" == "yes" ]]; then
    (
        cd $(mktemp -d)
        wget -r -nd -erobots=off -A '*.fw' --accept-regex '/plain/' https://git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git/tree/bnx2x/
        mv *.fw /lib/firmware/bnx2x/.
        update-initramfs -c -k all
    )
fi

echo '/var/lib/libvirt/** rwk,' > /etc/apparmor.d/local/abstractions/libvirt-qemu 

cat << EOF > /etc/modules-load.d/nat.conf
nf_nat_tftp
nf_conntrack
nf_nat
br_netfilter
EOF

cat << EOF > /etc/sysctl.d/90-nat.conf
net.ipv4.ip_forward=1
net.ipv4.conf.all.forwarding=1
net.ipv6.conf.all.forwarding=1 
net.bridge.bridge-nf-call-arptables=1
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
EOF

echo 'PermitRootLogin prohibit-password' > /etc/ssh/sshd_config.d/allow_root.conf
systemctl restart sshd

systemctl stop libvirtd
systemctl enable --now libvirtd-tcp.socket

cat << 'EOF' > /usr/local/bin/refresh-node-cert
#!/usr/bin/env bash

set -eou pipefail

node_token=""
wrapped_secret_id_token_file="/run/vault/.node-provisioner-secret-id"
approle_role_name="node-provisioner"
cert_role_name=""
issuer_role=""

if [[ -s "/etc/ssl/private/node.key" ]] && [[ -s "/etc/ssl/certs/node.crt" ]]; then
    issuer_role="dmann-dot-xyz-node"
    node_token=$(vault login -field=token  \
        -method=cert  \
        -ca-cert=/etc/ssl/certs/ca-certificates.crt  \
        -client-cert=/etc/ssl/certs/node.crt  \
        -client-key=/etc/ssl/private/node.key \
        name="node")
else
    if [ ! -s "${wrapped_secret_id_token_file}" ]; then
        echo "missing wrapped token in ${wrapped_secret_id_token_file}"
        exit 2
    fi

    issuer_role="dmann-dot-xyz-approle-node"
    wrapped_token=$(cat "$wrapped_secret_id_token_file" && rm -f "$wrapped_secret_id_token_file")
    
    secret_id=$(VAULT_TOKEN="${wrapped_token}" vault unwrap -field=secret_id)
    node_token=$(vault write -field=token auth/approle/login \
        role_id=$approle_role_name \
        secret_id="${secret_id}")
fi

# We do this as a 2 step process to ensure a failed issue won't overwrite the current cert
generated_cert=$(VAULT_TOKEN="${node_token}" vault write -format=json "dmann-xyz/v1/ica2/v1/issue/${issuer_role}" \
    common_name="$(hostname --fqdn)")

echo "${generated_cert}" | tee \
    >(jq -r '.data.private_key' > /etc/ssl/private/node.key) \
    >(jq -r '.data.certificate' > /etc/ssl/certs/node.crt) \
    >(jq -r '.data.ca_chain | join("\n")' | awk 'BEGIN {c=0;} /BEGIN CERT/{c++} { print > "/usr/local/share/ca-certificates/node-root-ca." c ".crt"}')
update-ca-certificates
EOF
cat << 'EOF' > /etc/systemd/system/node-cert.service
[Unit]
Description=Node certificate
After=network-online.target
StartLimitIntervalSec=0

[Service]
Type=oneshot
User=root
Environment=VAULT_ADDR=https://vault.homelab.dmann.xyz:8200
ExecCondition=/usr/bin/env sh -c "(! test -s /etc/ssl/certs/node.crt || ! /usr/bin/openssl x509 -checkend 1800 -noout -in /etc/ssl/certs/node.crt) || true"

Restart=on-failure
RestartSec=5

; ExecStart renews the certificate, if ExecStartPre was successful.
ExecStart=/usr/local/bin/refresh-node-cert

[Install]
WantedBy=multi-user.target
EOF

cat << 'EOF' > /etc/systemd/system/node-cert.timer
[Unit]
Description=Timer for node cert renewer
[Timer]
Persistent=true
; Run the timer unit every 15 minutes.
OnCalendar=*:1/10
; Always run the timer on time.
AccuracySec=1us
; Add jitter to prevent a "thundering hurd" of simultaneous certificate renewals.
RandomizedDelaySec=1m
[Install]
WantedBy=timers.target
EOF
systemctl enable --now node-cert.timer node-cert.service
systemctl start node-cert.timer
chmod +x /usr/local/bin/refresh-node-cert

nodeProvisionerSecretId=$(whiptail --passwordbox "please enter the node provisioner secret ID" 8 78 --title "Node SecretID" 3>&1 1>&2 2>&3)
exitstatus=$?
if [ $exitstatus == 0 ]; then
    echo "User selected Ok and entered " $nodeProvisionerSecretId
    mkdir -p /run/vault/
    echo "$nodeProvisionerSecretId" > /run/vault/.node-provisioner-secret-id
else
    echo "failed to get the secret ID"
fi

if [[ "${ceph}" == "true" ]]; then
    if ! command cephadm; then
        (
            cd $(mktemp -d)
            curl --silent --remote-name --location https://github.com/ceph/ceph/raw/quincy/src/cephadm/cephadm -o /usr/local/bin/cephadm
            chmod +x cephadm
            ./cephadm add-repo --release quincy
            ./cephadm install
        )
    fi

    if [[ "${roles}" =~ ceph-master ]]; then
        if [ ! -s "/etc/ceph/ceph.client.admin.keyring " ]; then
            cephadm bootstrap --mon-ip 10.0.1.110
        fi
cat << 'EOF' > /etc/systemd/system/create-ceph-client.service
[Unit]
Description=Create ceph client for libvirt usage
After=network-online.target node-cert.service ceph.target
Wants=ceph.target node-cert.service
StartLimitIntervalSec=0

[Service]
Type=oneshot
Restart=on-failure
Environment=VAULT_ADDR=https://vault.homelab.dmann.xyz:8200

ExecStart=/usr/sbin/cephadm shell ceph auth get-or-create client.libvirt mon 'profile rbd' osd 'profile rbd'
        
ExecStartPost=bash -c "VAULT_TOKEN=$(vault login -field=token  \
        -method=cert  \
        -ca-cert=/etc/ssl/certs/ca-certificates.crt  \
        -client-cert=/etc/ssl/certs/node.crt  \
        -client-key=/etc/ssl/private/node.key \
        name=node) cephadm shell ceph auth get-key client.libvirt | vault kv put secret/libvirt/ceph-client keyring=-"
ExecStartPost=/usr/sbin/cephadm shell ceph config set mgr mgr/cephadm/autotune_memory_target_ratio 0.3
ExecStartPost=/usr/sbin/cephadm shell ceph config set mon mon_cluster_log_file_level info

[Install]
WantedBy=multi-user.target
EOF
    fi
fi

function with_vault_token() {
    VAULT_TOKEN=$(vault login -field=token  \
        -method=cert  \
        -ca-cert=/etc/ssl/certs/ca-certificates.crt  \
        -client-cert=/etc/ssl/certs/node.crt  \
        -client-key=/etc/ssl/private/node.key \
        name=node)
}


function provision_kube() {
    # wget https://raw.githubusercontent.com/rook/rook/release-1.10/deploy/examples/create-external-cluster-resources.py
    # eval $(python3.9 create-external-cluster-resources.py \
    #     --namespace rook-ceph \
    #     --rbd-data-pool-name kube-pods \
    #     --cephfs-metadata-pool-name cephfs.nfs.meta \
    #     --cephfs-data-pool-name cephfs.nfs.data \
    #     --cephfs-filesystem-name nfs \
    #     --format bash) 

    # wget https://raw.githubusercontent.com/rook/rook/release-1.10/deploy/examples/import-external-cluster.sh
    # chmod +x import-external-cluster.sh 
    
    cephadm shell ceph osd pool create kube-pods
    cephadm shell ceph osd pool set kube-pods size 2
    cephadm shell ceph osd pool application enable kube-pods rbd
    eval $(python3 create-external-cluster-resources.py --namespace rook-ceph --rbd-data-pool-name kube-pods --format bash)
}

function provision_ceph_nfs() {
    cephadm shell ceph orch apply nfs default
    cephadm shell ceph fs volume create nfs
    cephadm shell ceph nfs export create cephfs \
        --cluster-id default \
        --pseudo-path /homelab/media \
        --fsname nfs 
        # [--readonly] \
        # [--path=/path/in/cephfs] \
        # [--client_addr <value>...] \
        # [--squash <value>] \
        # [--sectype <value>...]

}

function provision_ceph_rgw() {
    cephadm shell ceph orch apply rgw default
}

function provision_log_shippers() {
    (
        cd $(mktemp -d)
        curl -L -O https://artifacts.elastic.co/downloads/beats/elastic-agent/elastic-agent-8.5.0-linux-x86_64.tar.gz
        tar xzvf elastic-agent-8.5.0-linux-x86_64.tar.gz
        cd elastic-agent-8.5.0-linux-x86_64
        sudo ./elastic-agent install --non-interactive --insecure --url http://logging.homelab.dmann.xyz:8220 --enrollment-token $ELASTIC_AGENT_ENROLL_TOKEN
    )
}