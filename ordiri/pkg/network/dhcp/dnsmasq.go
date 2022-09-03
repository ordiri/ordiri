package dhcp

import (
	"path"

	"github.com/ordiri/ordiri/pkg/dnsmasq"
	"inet.af/netaddr"
)

func DnsMasqConfig(confDir, name, ifaceName string, network netaddr.IPPrefix, hostDir, dhcpDir string) dnsmasq.Config {
	routerAddr := network.IP().Next()
	dhcpAddr := routerAddr.Next()

	return dnsmasq.New(
		// disable dns
		dnsmasq.WithOption("log-dhcp", ""),
		dnsmasq.WithOption("dhcp-boot", "ipxe.kpxe,boothost,10.0.2.118"),
		dnsmasq.WithOption("keep-in-foreground", ""),
		// "domain-needed","", # we want the name of a vm to resolve without a domain
		dnsmasq.WithOption("bogus-priv", ""),
		dnsmasq.WithOption("local", "/ordiri/"),

		dnsmasq.WithOption("interface", ifaceName),
		dnsmasq.WithOption("expand-hosts", ""),
		// "no-resolv","",
		// dnsmasq.WithOption("server", []string{"8.8.8.8", "8.8.4.4"}),
		// "local",fmt.Sprintf("/%s.homelab.dmann.xyz/", name),
		dnsmasq.WithOption("listen-address", []string{"::1", "127.0.0.1", dhcpAddr.String()}),
		// "expand-hosts", "",
		dnsmasq.WithOption("domain", "ordiri"),
		dnsmasq.WithOption("dhcp-fqdn", ""),
		dnsmasq.WithOption("dhcp-range", []string{dhcpAddr.String(), "static"}),
		dnsmasq.WithOption("dhcp-hostsdir", dhcpDir),
		dnsmasq.WithOption("hostsdir", hostDir),
		dnsmasq.WithOption("dhcp-option", []string{
			dnsmasq.DhcpOptionRouter.Option(routerAddr.String()),
			dnsmasq.DhcpOptionDnsServer.Option(dhcpAddr.String()),
		}),
		dnsmasq.WithOption("dhcp-authoritative", ""),

		dnsmasq.WithOption("log-queries", ""),
		dnsmasq.WithOption("log-facility", path.Join(confDir, "dnsmasq.log")),
	)
}
