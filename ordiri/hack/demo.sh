# Print out all the current networks, subnets and virtual machines
# A Network contains many subnets and controls high level network configuration
# A subnet represents an allocatable block of ips, enables private / public access to a network by
./bin/ordctl get network,subnet,virtualmachine -o 'custom-columns=KIND:kind,NAME:metadata.name,UID:metadata.uid,CIDR:spec.cidr,NETWORK:spec.networkInterfaces[],DHCP:spec.dhcp'

ssh mothership



virsh list --all
virsh console ordiri-test-0

ip -br -c addr

virsh console ordiri-test-1
ip -br -c addr

virsh console ordiri-test-workers-0
ip -br -c addr

ip netns exec service-kubevms-workers ip -br -c addr
ip netns exec service-kubevms-etcd ip -br -c addr
ip netns exec router-kubevms ip -br -c addr

My previous homelab was pretty hacky and still manually provisioned terraform and a bunch of "old" patterns / hard coded secrets and really was not something I was proud of so I reimagined it from the ground up. This is my legit attempt at creating an openstack style system but following the same "control loop" style of eventual consistency / reconciling that makes Kubernetes so good (I actually use the low level api server runtime so while it's kubectl compatible, it has no concept of a Pod and it's not just a a bunch of kube crds)

Essentially you create a VM definition in YAML, similar to how you would a kube Pod. It'll get allocated by the scheduler to some physical node in the cluster (think kube worker getting a pod), that physical node will see it's been allocated a new vm and provision any networking (geneve tunnels between other physical hosts running vms on the same subnet, nftables, openflow rules, virtual switch ports/bridges and virtual router/dns/dhcp srv in segregated network namespaces) and then the literal VM will be started (libvirt/kvm). I have a side component that provides an IPXE boot server based on the "profile" of the virtual machine being launched (depending on mac addr during an ipxe boot it'll serve different ipxe chains).

Still to come is the ec2 style security groups and a metadata server (169.254.169.254). I'm keen to replace dnsmasq with a native golang dhcp server as well to make it easy to provide aws private route53 zones and stuff like that as well. Also there is an incredible amount of multicast traffic still happening because i'm not filling any arp/switch port forwarding caches and as a result lots of things flood till mac addrs get learned.

High level, a packet leaves the vm 
    -> enters a vlan tagged switch port
        -> if same network, same host, switch to correct port and strip vlan
        -> if same network, diff host, strip vlan, send over all this networks geneve tunnels which contain nodes on this network
            -> On geneve tunnel egress, tag with the node local vlan for the nodes subnet and send it down to the correct vm (maybe host 1 is vlan 1, host 2 is vlan 123 because runs diff networks which have already used vlan 1)
        -> if diff network, send to the this networks virtual router
        
