package systemd_test

import (
	"fmt"
	"strings"
	"testing"

	"github.com/davecgh/go-spew/spew"
	"github.com/ordiri/ordiri/pkg/systemd"
)

func TestFullNetwork(t *testing.T) {
	bondDevice := systemd.NetworkDevice{
		Name: "bond0",
		Kind: systemd.NetworkDeviceKindBond,
		Bond: systemd.NetworkBond{
			Mode: systemd.NetworkBondModeActiveBackup,
		},
	}
	bondedNetwork := systemd.Network{
		Name: "bond0",
		Match: systemd.NetworkMatch{
			Names: []string{"eno2", "eno3"},
		},
		Bond: bondDevice.Name,
	}

	mgmtNetwork := systemd.Network{
		Name: "mgmt",
		Match: systemd.NetworkMatch{
			Names: []string{"eno1"},
		},
		DHCP: true,
	}

	fmt.Printf("%s\n%s\n%s\n", bondDevice.String(), mgmtNetwork.String(), bondedNetwork.String())
}

func TestEncoder(t *testing.T) {
	physicalDev := systemd.NetworkDevice{
		Name: "vmbridge",
		Kind: systemd.NetworkDeviceKindBridge,
	}
	net := systemd.Network{
		Name: "eno1",
		Match: systemd.NetworkMatch{
			Names: []string{"eno1"},
		},
		Bridge: physicalDev.Name,
	}

	spew.Dump(physicalDev, net)
}

func TestNetworkParser(t *testing.T) {
	fake := `[Match]
Name=vmwan
[Network]
DHCP=yes
[BridgeVLAN]
#PVID=1
#EgressUntagged=1
#VLAN=1-4094
`

	reader := strings.NewReader(fake)
	res, err := systemd.NetworkFromUnit(reader, systemd.NetworkUnitTypeNetwork)
	if err != nil {
		panic(err.Error())
	}

	spew.Dump(res)
}
func TestNetworkDeviceParser(t *testing.T) {
	fake := `[NetDev]
Name=vmwan
Kind=bridge
`

	reader := strings.NewReader(fake)
	res, err := systemd.NetworkDeviceFromUnit(reader)
	if err != nil {
		panic(err.Error())
	}

	spew.Dump(res)
}
