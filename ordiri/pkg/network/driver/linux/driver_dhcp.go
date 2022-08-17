package linux

import (
	"log"

	"github.com/insomniacslk/dhcp/dhcpv4"
	"github.com/insomniacslk/dhcp/dhcpv4/client4"
	"github.com/insomniacslk/dhcp/netboot"
)

func dhclient4(ifname string, attempts int, verbose bool) (*netboot.BootConf, error) {
	if attempts < 1 {
		attempts = 1
	}
	client := client4.NewClient()
	var (
		conv []*dhcpv4.DHCPv4
		err  error
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
		return nil, err
	}
	// extract the network configuration
	netconf, err := netboot.ConversationToNetconfv4(conv)

	if err != nil {
		return nil, err
	}

	if err := netboot.ConfigureInterface(ifname, &netconf.NetConf); err != nil {
		return nil, err
	}

	return netconf, err
}
