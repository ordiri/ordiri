curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | tee /etc/apt/sources.list.d/kubernetes.list
apt-get update
apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl

echo "deb [signed-by=/usr/share/keyrings/libcontainers-archive-keyring.gpg] https://provo-mirror.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Debian_11/ /" > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
echo "deb [signed-by=/usr/share/keyrings/libcontainers-crio-archive-keyring.gpg] https://provo-mirror.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/1.25/Debian_11/ /" > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable:cri-o:1.25.list

mkdir -p /usr/share/keyrings
rm -f /usr/share/keyrings/libcontainers-*
curl -fsSL https://provo-mirror.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Debian_11/Release.key | gpg --dearmor -o /usr/share/keyrings/libcontainers-archive-keyring.gpg
curl -fsSL https://provo-mirror.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/1.25/Debian_11/Release.key | gpg --dearmor -o /usr/share/keyrings/libcontainers-crio-archive-keyring.gpg

apt-get update
apt-get install -y cri-o cri-o-runc

systemctl enable crio
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

{{ with_local_file('common/kube/modules-load.d/modules.conf', "/etc/modules-load.d/modules.conf") }}
{{ with_local_file('common/kube/sysctl.d/kubelet.conf', "/etc/sysctl.d/kubelet.conf") }}