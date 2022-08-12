# Ordiri
A multi-tenant IaaC platform

Built for my homelab
network inspired by openstack
network =: subnet


dhcp
```
node-a (vma)
    -> bridge (vlan) 
        -> services ns
            -> dnsmasq
            <- dnsmasq
        <- services ns
    <- bridge (vlan) 
node-a 
```

same node, same net, same subnet:
```
node-a (vma)
    -> bridge (vlan) 
        -> node-b (vmb)
        <- node-b (vmb)
    <- bridge (vlan) 
node-a (vma)
```

same node, same net, diff subnet:
```
node-a (vma)
    -> bridge (vlan) 
        -> router 
            -> node-a(vmb)
            <- node-a(vmb)
        <- router 
    <- bridge (vlan) 
node-a (vma)
```

diff node, same net, diff subnet:
```
node-a 
    -> bridge (vlan) 
        -> bridge(vlan->vxlan) 
            -> external net 
                -> bridge 
                    -> bridge(vlan) 
                        -> node-b
                        <- node-b
                    <- bridge(vlan) 
                <- bridge 
            <- external net 
        <- bridge(vlan->vxlan) 
    <- bridge (vlan) 
node-a 
```

external network:
```
node-a 
    -> bridge (vlan) 
        -> router (nat)
            -> external net
            <- external net
        -> router (nat)
    -> bridge (vlan) 
node-a 
```