this_host=10.0.2.118
remote_host=debian

ssh-add ~/.ssd/id_rsa
cd $(mktemp -d)
curl --silent --remote-name --location https://github.com/ceph/ceph/raw/quincy/src/cephadm/cephadm
chmod +x cephadm
./cephadm add-repo --release quincy
./cephadm install
cephadm bootstrap --mon-ip  10.0.2.118 --cluster-network

# URL: https://localhost:8443/
# User: admin
# Password: t4bevjg8gr
# 
apt-get install qemu-block-extra # needs on libvirt nodes

ssh-copy-id -f -i /etc/ceph/ceph.pub root@$remote_host

ceph orch host add $remote_host

ceph config set global osd_pool_default_pg_autoscale_mode on
osd crush chooseleaf type 0

ceph config set mon public_network 10.0.2.0/24,10.0.1.0/24



# https://docs.ceph.com/en/latest/rbd/libvirt/
ceph auth get-or-create client.libvirt mon 'profile rbd' osd 'profile rbd'

qemu-img create -f rbd rbd:tenant1/new-libvirt-image 2G



cat > secret.xml <<EOF
<secret ephemeral='no' private='no'>
  <uuid>4eadcf35-dc7d-4d80-a7fe-5f599d1ec49f</uuid>
  <usage type='ceph'>
    <name>client.libvirt secret</name>
  </usage>
</secret>
EOF
virsh secret-define --file secret.xml

ceph auth get-key client.libvirt | sudo tee client.libvirt.key


virsh secret-set-value --secret {uuid of secret} --base64 $(cat client.libvirt.key) && rm client.libvirt.key secret.xml


apt-get install libvirt-daemon-driver-storage-rbd libcephfs-dev librbd-dev librados-dev

ceph config set mgr mgr/cephadm/autotune_memory_target_ratio 0.2
ceph config set osd osd_memory_target_autotune true
