# ordiri

network inspired by openstack
network =: subnet


dhcp
node-a -> bridge (vlan) -> services -> dnsmasq

same node, same net, same subnet:
node-a -> bridge (vlan) -> node-b

same node, same net, diff subnet:
node-a -> bridge (vlan) -> router -> node-b

same node, same net, diff subnet:
node-a -> bridge (vlan) -> bridge(vlan->vxlan) -> external net -> bridge -> bridge(vlan) -> node-b

external network:
node-a -> bridge (vlan) -> router -> external net