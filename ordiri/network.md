vm scheduled on machine
    -> random vlan # assigned to the network of the vm on that host
    -> addr given, 10.0.2.2
    vm sends packet


    packet leaves the vm destined
        -> gains vlan on first ovs bridge based on the virtual port it's conncted too
            -> 10.0.2.3 -> same phys machine?
                -> ovs bridge will route the traffic to the port connected to the 10.0.2.3 machine
            -> 10.0.2.4 -> not on the same machine
                -> ovs bridge will discover 10.0.2.4 which sends packet over vxlan tunnel to spine
                -> spine will send to each vxlan which inturn sends to the bridge with the vlan for that network on

                
            -> external network?
                Goes 