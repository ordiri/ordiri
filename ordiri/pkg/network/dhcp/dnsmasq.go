package dhcp

import (
	"path"

	"github.com/ordiri/ordiri/pkg/dnsmasq"
	"inet.af/netaddr"
)

func DnsMasqConfig(confDir, name string, network netaddr.IPPrefix) dnsmasq.Config {
	routerAddr := network.IP().Next()
	dhcpAddr := routerAddr.Next()
	rangeStart := dhcpAddr.Next()
	rangeEnd := network.Range().To().Prior()

	return dnsmasq.New(
		// disable dns
		dnsmasq.WithOption("log-dhcp", ""),
		dnsmasq.WithOption("dhcp-boot", "ipxe.kpxe,boothost,10.0.2.118"),
		dnsmasq.WithOption("keep-in-foreground", ""),
		// "domain-needed","",
		dnsmasq.WithOption("bogus-priv", ""),
		// "no-resolv","",
		dnsmasq.WithOption("server", []string{"8.8.8.8", "8.8.4.4"}),
		// "local",fmt.Sprintf("/%s.homelab.dmann.xyz/", name),
		dnsmasq.WithOption("listen-address", []string{"::1", "127.0.0.1", dhcpAddr.String()}),
		// "expand-hosts", "",
		// "domain", fmt.Sprintf("%s.homelab.dmann.xyz", name),
		dnsmasq.WithOption("dhcp-range", []string{rangeStart.String(), rangeEnd.String(), "24h"}),
		dnsmasq.WithOption("dhcp-option", []string{
			dnsmasq.DhcpOptionRouter.Option(routerAddr.String()),
			dnsmasq.DhcpOptionDnsServer.Option("10.0.1.1"),
		}),
		dnsmasq.WithOption("dhcp-authoritative", ""),

		dnsmasq.WithOption("log-queries", ""),
		dnsmasq.WithOption("log-facility", path.Join(confDir, "dnsmasq.log")),
	)
}
