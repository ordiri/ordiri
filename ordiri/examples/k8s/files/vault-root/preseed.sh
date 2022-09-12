#!/usr/bin/env bash

set -eou pipefail

cd $(mktemp -d)

export local_hostname=$(curl 169.254.169.254/latest/meta-data/local-hostname)
export local_ip=$(curl 169.254.169.254/latest/meta-data/local-ipv4)

{% include 'common/install-vault.sh' %}

if [[ -z "$(lsblk /dev/vdb --json | jq -r '.blockdevices[].children // ""')" ]]; then
    # type=83 is equal to 1 root partition that takes the whole disk
    echo 'type=83' | sfdisk  /dev/vdb
    mkfs -t ext4 /dev/vdb1
fi

mkdir -p /vault/root 

{{ with_local_file('vault-root/vault/vault.hcl', "/etc/vault.d/vault.hcl") }}
{{ with_local_file('vault-root/bin/vault-tls-configure.sh', "/sbin/vault-tls-configure.sh") }}
{{ with_local_file('vault-root/bin/insecure-unseal-vault.sh', "/sbin/insecure-unseal-vault.sh") }}
{{ with_local_file('vault-root/bin/configure-vault.sh', "/sbin/configure-vault.sh") }}
chmod +x /sbin/insecure-unseal-vault.sh /sbin/vault-tls-configure.sh /sbin/configure-vault.sh

# Gives us the UUID var used in the systemd mount...
eval $(blkid /dev/vdb1 --output export)
{{ with_local_file('vault-root/systemd/vault-root.mount', "/etc/systemd/system/vault-root.mount", executable=True) }}
{{ with_local_file('vault-root/systemd/vault-tls-configure.service', "/etc/systemd/system/vault-tls-configure.service") }}
{{ with_local_file('vault-root/systemd/insecure-unseal-vault.service', "/etc/systemd/system/insecure-unseal-vault.service") }}
{{ with_local_file('vault-root/systemd/configure-vault-server.service', "/etc/systemd/system/configure-vault-server.service") }}

chown -Rf vault:vault /vault/root 

systemctl enable vault-root.mount vault configure-vault-server.service insecure-unseal-vault.service vault-tls-configure.service
