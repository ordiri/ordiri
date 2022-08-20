package linux

import (
	"log"
	"net"

	"github.com/insomniacslk/dhcp/dhcpv4"
	"github.com/insomniacslk/dhcp/dhcpv4/client4"
	"github.com/insomniacslk/dhcp/netboot"
)

func dhclient4(ifname string, attempts int, verbose bool) error {
	if attempts < 1 {
		attempts = 1
	}
	iface, err := net.InterfaceByName(ifname)
	if err != nil {
		return err
	}
	addrs, err := iface.Addrs()
	if err != nil {
		return err
	}
	if len(addrs) > 0 {
		for _, addr := range addrs {
			ip, ok := addr.(*net.IPNet)
			if !ok {
				continue
			}

			// todo: questionable
			if !ip.IP.IsGlobalUnicast() || ip.IP.To4() == nil {
				continue
			}

			return nil
		}
	}
	client := client4.NewClient()
	var (
		conv []*dhcpv4.DHCPv4
	)
	for attempt := 0; attempt < attempts; attempt++ {
		log.Printf("Attempt %d of %d", attempt+1, attempts)
		conv, err = client.Exchange(ifname)
		if err != nil && attempt < attempts {
			log.Printf("Error: %v", err)
			continue
		}
		break
	}

	if verbose {
		for _, m := range conv {
			log.Print(m.Summary())
		}
	}
	if err != nil {
		return err
	}
	// extract the network configuration
	netconf, err := netboot.ConversationToNetconfv4(conv)

	if err != nil {
		return err
	}

	if err := netboot.ConfigureInterface(ifname, &netconf.NetConf); err != nil {
		return err
	}

	return nil
}
