package dnsmasq

import "fmt"

type NetmaskOptionNumber int

const (
	DhcpOptionNetmask               NetmaskOptionNumber = 1
	DhcpOptionTimeOffset            NetmaskOptionNumber = 2
	DhcpOptionRouter                NetmaskOptionNumber = 3
	DhcpOptionDnsServer             NetmaskOptionNumber = 6
	DhcpOptionLogServer             NetmaskOptionNumber = 7
	DhcpOptionLprServer             NetmaskOptionNumber = 9
	DhcpOptionBootFileSize          NetmaskOptionNumber = 13
	DhcpOptionDomainName            NetmaskOptionNumber = 15
	DhcpOptionSwapServer            NetmaskOptionNumber = 16
	DhcpOptionRootPath              NetmaskOptionNumber = 17
	DhcpOptionExtensionPath         NetmaskOptionNumber = 18
	DhcpOptionIpForwardEnable       NetmaskOptionNumber = 19
	DhcpOptionNonLocalSourceRouting NetmaskOptionNumber = 20
	DhcpOptionPolicyFilter          NetmaskOptionNumber = 21
	DhcpOptionMaxDatagramReassembly NetmaskOptionNumber = 22
	DhcpOptionDefaultTtl            NetmaskOptionNumber = 23
	DhcpOptionMtu                   NetmaskOptionNumber = 26
	DhcpOptionAllSubnetsLocal       NetmaskOptionNumber = 27
	DhcpOptionRouterDiscovery       NetmaskOptionNumber = 31
	DhcpOptionRouterSolicitation    NetmaskOptionNumber = 32
	DhcpOptionStaticRoute           NetmaskOptionNumber = 33
	DhcpOptionTrailerEncapsulation  NetmaskOptionNumber = 34
	DhcpOptionArpTimeout            NetmaskOptionNumber = 35
	DhcpOptionEthernetEncap         NetmaskOptionNumber = 36
	DhcpOptionTcpTtl                NetmaskOptionNumber = 37
	DhcpOptionTcpKeepalive          NetmaskOptionNumber = 38
	DhcpOptionNisDomain             NetmaskOptionNumber = 40
	DhcpOptionNisServer             NetmaskOptionNumber = 41
	DhcpOptionNtpServer             NetmaskOptionNumber = 42
	DhcpOptionNetbiosNs             NetmaskOptionNumber = 44
	DhcpOptionNetbiosDd             NetmaskOptionNumber = 45
	DhcpOptionNetbiosNodetype       NetmaskOptionNumber = 46
	DhcpOptionNetbiosScope          NetmaskOptionNumber = 47
	DhcpOptionXWindowsFs            NetmaskOptionNumber = 48
	DhcpOptionXWindowsDm            NetmaskOptionNumber = 49
	DhcpOptionT1                    NetmaskOptionNumber = 58
	DhcpOptionT2                    NetmaskOptionNumber = 59
	DhcpOptionVendorClass           NetmaskOptionNumber = 60
	DhcpOptionNisPlusDomain         NetmaskOptionNumber = 64
	DhcpOptionNisPlusServer         NetmaskOptionNumber = 65
	DhcpOptionTftpServer            NetmaskOptionNumber = 66
	DhcpOptionBootfileName          NetmaskOptionNumber = 67
	DhcpOptionMobileIpHome          NetmaskOptionNumber = 68
	DhcpOptionSmtpServer            NetmaskOptionNumber = 69
	DhcpOptionPop3Server            NetmaskOptionNumber = 70
	DhcpOptionNntpServer            NetmaskOptionNumber = 71
	DhcpOptionIrcServer             NetmaskOptionNumber = 74
	DhcpOptionUserClass             NetmaskOptionNumber = 77
	DhcpOptionRapidCommit           NetmaskOptionNumber = 80
	DhcpOptionClientArch            NetmaskOptionNumber = 93
	DhcpOptionClientInterfaceId     NetmaskOptionNumber = 94
	DhcpOptionClientMachineId       NetmaskOptionNumber = 97
	DhcpOptionDomainSearch          NetmaskOptionNumber = 119
	DhcpOptionSipServer             NetmaskOptionNumber = 120
	DhcpOptionClasslessStaticRoute  NetmaskOptionNumber = 121
	DhcpOptionVendorIdEncap         NetmaskOptionNumber = 125
	DhcpOptionTftpServerAddress     NetmaskOptionNumber = 150
	DhcpOptionServerIpAddress       NetmaskOptionNumber = 255
)

type NetmaskOptionName string

func (optName NetmaskOptionName) Option(val string) string {
	return fmt.Sprintf("option:%s,%s", optName, val)
}

func (optName NetmaskOptionName) Number() int {
	for opt, name := range OptionNames {
		if name == optName {
			return opt
		}
	}

	return 0
}

func (optNum NetmaskOptionNumber) Option(val string) string {
	if name := optNum.Name(); name != "" {
		return fmt.Sprintf("option:%s,%s", name, val)
	}

	return fmt.Sprintf("%d,%s", optNum, val)
}

func (optNum NetmaskOptionNumber) Name() string {
	for opt, name := range OptionNames {
		if opt == int(optNum) {
			return string(name)
		}
	}

	return ""
}

var OptionNames = map[int]NetmaskOptionName{
	1:   "netmask",
	2:   "time-offset",
	3:   "router",
	6:   "dns-server",
	7:   "log-server",
	9:   "lpr-server",
	13:  "boot-file-size",
	15:  "domain-name",
	16:  "swap-server",
	17:  "root-path",
	18:  "extension-path",
	19:  "ip-forward-enable",
	20:  "non-local-source-routing",
	21:  "policy-filter",
	22:  "max-datagram-reassembly",
	23:  "default-ttl",
	26:  "mtu",
	27:  "all-subnets-local",
	31:  "router-discovery",
	32:  "router-solicitation",
	33:  "static-route",
	34:  "trailer-encapsulation",
	35:  "arp-timeout",
	36:  "ethernet-encap",
	37:  "tcp-ttl",
	38:  "tcp-keepalive",
	40:  "nis-domain",
	41:  "nis-server",
	42:  "ntp-server",
	44:  "netbios-ns",
	45:  "netbios-dd",
	46:  "netbios-nodetype",
	47:  "netbios-scope",
	48:  "x-windows-fs",
	49:  "x-windows-dm",
	58:  "T1",
	59:  "T2",
	60:  "vendor-class",
	64:  "nis+-domain",
	65:  "nis+-server",
	66:  "tftp-server",
	67:  "bootfile-name",
	68:  "mobile-ip-home",
	69:  "smtp-server",
	70:  "pop3-server",
	71:  "nntp-server",
	74:  "irc-server",
	77:  "user-class",
	80:  "rapid-commit",
	93:  "client-arch",
	94:  "client-interface-id",
	97:  "client-machine-id",
	119: "domain-search",
	120: "sip-server",
	121: "classless-static-route",
	125: "vendor-id-encap",
	150: "tftp-server-address",
	255: "server-ip-address",
}
