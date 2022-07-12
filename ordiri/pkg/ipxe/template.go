package ipxe

import (
	"bufio"
	"fmt"
	"net/url"
	"strings"
	"text/template"

	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
)

const IpxeBootTemplate = `#!ipxe

echo CPU: ${cpuvendor} ${cpumodel}

ifstat ||

set attempt:int8 1
:dhcp_retry
echo DHCP attempt ${attempt}
dhcp --timeout 5000 && goto dhcp_ok ||
ifstat ||
inc attempt
iseq ${attempt} 10 || goto dhcp_retry

:dhcp_fail
echo DHCP failed - rebooting
reboot ||
exit

:dhcp_ok
kernel {{ .Config.Kernel }} {{ .Config.Args | join " " }}
{{- range $file := .Config.Initrd }}
initrd {{ $file }}
{{end}}

boot
`

const IpxeDiscoverTemplate = `#!ipxe

{{ if .NeedsDiscovery }}
# Node needs discovery, sending to discovery URL to record information
chain -ar {{ .Node | DiscoveryUrl }}
{{ else if .Node | IsNodePending }}
# Node is pending approval
sleep 60
chain -ar {{ .Node | DiscoveryUrl }}
{{ else if .Node | IsNodeRejected }}
# Node was rejected from joining 
echo node join request was rejected
{{ else if .Node | IsNodeApproved }}
# Node was approved to join
chain -ar {{ .Node | BootUrl }}
{{ end}}
`

func ipxeFuncs() template.FuncMap {
	return template.FuncMap{
		"IpxeEcho": func(lines string) string {
			reader := strings.NewReader(lines)
			scanner := bufio.NewScanner(reader)
			scanner.Split(bufio.ScanLines)
			var text []string

			for scanner.Scan() {
				text = append(text, fmt.Sprintf("echo %s", scanner.Text()))
			}

			return strings.Join(text, "\n")
		},
		"DiscoveryUrl": func(node *corev1alpha1.Machine) string {
			queryString := []string{}
			for key, value := range ipxeVars {
				queryString = append(queryString, fmt.Sprintf("%s=${%s}", url.QueryEscape(key), value))
			}
			return "discover.ipxe?" + strings.Join(queryString, "&")
		},
		"BootUrl": func(node *corev1alpha1.Machine) string {
			return "boot.ipxe?uuid=${uuid}"
		},
		"NeedsDiscovery": func(nodeObj *corev1alpha1.Machine) bool {
			properties, err := nodeObj.Properties()
			if err != nil {
				return true
			}

			discovered := 0
			for key, _ := range ipxeVars {
				if _, ok := properties[key]; !ok {
					return true
				}
				discovered += 1
			}

			return discovered != len(ipxeVars)
		},
		"IsNodeRejected": func(nodeObj *corev1alpha1.Machine) bool {
			return nodeObj.IsRejected()
		},
		"IsNodeApproved": func(nodeObj *corev1alpha1.Machine) bool {
			return nodeObj.IsApproved()
		},
		"IsNodePending": func(nodeObj *corev1alpha1.Machine) bool {
			return nodeObj.IsPending()
		},
	}
}
