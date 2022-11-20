package dhcp

import (
	"fmt"

	"github.com/ordiri/ordiri/config"
	"github.com/ordiri/ordiri/pkg/dnsmasq"
	"inet.af/netaddr"
)

func DnsMasqConfig(confDir, name, ifaceName string, network netaddr.IPPrefix, network6 netaddr.IPPrefix, hostMappingDir, dhcpMappingDir string) dnsmasq.Config {
	routerAddr := network.IP().Next()
	dhcpAddr := routerAddr.Next()
	router6Addr := network6.IP().Next()
	dhcp6Addr := router6Addr.Next()

	return dnsmasq.New(
		// disable dns
		dnsmasq.WithOption("log-dhcp", ""),
		dnsmasq.WithOption("dhcp-boot", "ipxe.kpxe,boothost,"+config.IPXEBootHost.String()),
		dnsmasq.WithOption("keep-in-foreground", ""),
		// "domain-needed","", # we want the name of a vm to resolve without a domain
		dnsmasq.WithOption("bogus-priv", ""),
		dnsmasq.WithOption("local", "/ordiri/"),

		dnsmasq.WithOption("interface", ifaceName),
		dnsmasq.WithOption("expand-hosts", ""),
		// "no-resolv","",
		// dnsmasq.WithOption("server", []string{"8.8.8.8", "8.8.4.4"}),
		// "local",fmt.Sprintf("/%s.homelab.dmann.xyz/", name),
		dnsmasq.WithOption("listen-address", []string{"::1", "127.0.0.1", dhcpAddr.String(), dhcp6Addr.String()}),
		// "expand-hosts", "",
		dnsmasq.WithOption("domain", "ordiri"),
		dnsmasq.WithOption("dhcp-fqdn", ""),
		dnsmasq.WithOption("dhcp-range", []string{
			fmt.Sprintf("%s,%s", dhcpAddr.String(), "static"),
			fmt.Sprintf("%s,constructor:%s,%s", "::", ifaceName, "static"),
		}),
		// dnsmasq.WithOption("dhcp-range", []string{dhcp6Addr.String(), "static"}),
		// dnsmasq.WithOption("dhcp-range", []string{dhcp6Addr.String(), "static"}),
		dnsmasq.WithOption("dhcp-hostsdir", dhcpMappingDir),
		dnsmasq.WithOption("hostsdir", hostMappingDir),
		dnsmasq.WithOption("dhcp-option", []string{
			dnsmasq.DhcpOptionDomainSearch.Option("ordiri,homelab.dmann.xyz"),
			dnsmasq.DhcpOptionRouter.Option(routerAddr.String()),
			dnsmasq.DhcpOptionDnsServer.Option(dhcpAddr.String()),
		}),
		// dnsmasq.WithOption("dhcp-authoritative", ""),

		dnsmasq.WithOption("log-queries", ""),
		// dnsmasq.WithOption("enable-ra", ""),
	)
}
