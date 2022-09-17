# Ordiri
An IaaC platform for my homelab

My homelab has gone through a lot of iterations through the years, starting off with basic raspberry pi's before moving to a small dedicated mac mini before finally making the shift to a rack mount server.

This project is an attepmt to solve my own personal problems when playing in my homelab which all stem from a lack of physical hardware. While Kubernetes is great for running applications, it lacks any true multi-tenancy and OpenStack felt a bit dead so I decided to take all the lessons i'd learnt and make my own system.

Currently it supports the 3 main areas you would care about - compute, storage and network - and is able to provision overlapping tenant isolated networks which span multiple physical hosts by using VXLan tunnels and linux namespaces, launch a virtual machine and provide it with both host level or distributed (Rados) block storage.

## [Ordiri](./ordiri)
Main code base for the per-node ordlet as well as the control plane apiserver

## [Kubernetes Example](./ordiri/examples/)
The API Server uses the Kubernetes API server packages to provide a kubernetes style api

## [API Server](./ordiri/cmd/apiserver)
The API Server uses the Kubernetes API server packages to provide a kubernetes style api

## [Boot Server](./ordiri/cmd/bootserver/) - Deprecated
A simple HTTP server that uses MachineProfiles to serve differing IPXE boot configurations to a machine

## [Ordiri Dashboard](./ordiri-dashboard)
A React UI for interacting with the API Server

## [Ordiri Client Typescript](./ordiri-client-typescript/)
Open API client for use in a browser

## Todo
Need tenant API logins and API auth, lots of hard coded stuff to support tenant isolation, search "tenant1"
Currently do a bunch of l3 routing in openflow rules but it's really inneficent and it all stems from a seperate vlan per subnet instead of per network.


----
## Running locally
```
Terminal 1: make etcd
Terminal 2: make run-apiserver # the apiserver-runtime 
Terminal 3: make run-manager # cluster wide controllers (scheduling & allocation mostly)
Terminal 4: make run-remote # the ordlets that run on physical hosts
Terminal 5: make run-ipxe # the ipxe metadata server
Terminal 6: make run-dashboard # the dashboard
```

---

Networking:
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