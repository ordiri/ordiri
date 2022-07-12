package systemd

import (
	"io"
	"io/ioutil"

	"github.com/coreos/go-systemd/v22/unit"
)

type NetworkUnitType string

var (
	NetworkUnitTypeNetwork NetworkUnitType = "network"
	NetworkUnitTypeDevice                  = "netdev"
)

func NetworkFromUnit(reader io.Reader, netType NetworkUnitType) (*Network, error) {
	sections, err := unit.DeserializeSections(reader)
	if err != nil {
		return nil, err
	}

	network := &Network{}
	for _, unit := range sections {
		if unit.Section == "Match" {
			for _, value := range unit.Entries {
				if value.Name == "Name" {
					network.Match.Names = append(network.Match.Names, value.Value)
				}
			}
		}
	}

	return network, nil
}
func NetworkDeviceFromUnit(reader io.Reader) (*NetworkDevice, error) {
	sections, err := unit.DeserializeSections(reader)
	if err != nil {
		return nil, err
	}

	networkDevice := &NetworkDevice{}
	for _, unit := range sections {
		if unit.Section == "NetDev" {
			for _, value := range unit.Entries {
				if value.Name == "Name" {
					networkDevice.Name = value.Value
				}
				if value.Name == "Kind" {
					networkDevice.Kind = NetworkDeviceKind(value.Value)
				}
			}
		}
	}

	return networkDevice, nil
}

// https://www.freedesktop.org/software/systemd/man/systemd.netdev.html#Supported%20netdev%20kinds
type NetworkDeviceKind string

var (
	NetworkDeviceKindBridge NetworkDeviceKind = "bridge"
	NetworkDeviceKindBond   NetworkDeviceKind = "bond"
)

type NetworkBondMode string

var (
	NetworkBondModeBalanceRr    NetworkBondMode = "balance-rr"
	NetworkBondModeActiveBackup NetworkBondMode = "active-backup"
	NetworkBondModeBalanceXor   NetworkBondMode = "balance-xor"
	NetworkBondModeBroadcast    NetworkBondMode = "broadcast"
	NetworkBondMode8023ad       NetworkBondMode = "802.3ad"
	NetworkBondModeBalanceTlb   NetworkBondMode = "balance-tlb"
	NetworkBondModeBalanceAlb   NetworkBondMode = "balance-alb"
)

type NetworkBond struct {
	Mode          NetworkBondMode
	DefaultPvId   int64
	VlanFiltering bool
}

type NetworkMatch struct {
	Names []string
}

// Logical network should do this, not the systemd network
// Device *NetworkDevice
// Network represents a SystemD Network unit
type Network struct {
	Name   string
	DHCP   bool
	Match  NetworkMatch
	Bond   string
	Bridge string
}

type NetworkDevice struct {
	Name string
	Kind NetworkDeviceKind
	Bond NetworkBond
}

func (n *NetworkDevice) String() string {
	reader := unit.SerializeSections(n.Sections())
	b, err := ioutil.ReadAll(reader)
	if err != nil {
		panic(err.Error())
	}

	return string(b)
}

func (n *NetworkDevice) Sections() []*unit.UnitSection {
	deviceSection := &unit.UnitSection{
		Section: "NetDev",
		Entries: []*unit.UnitEntry{
			{
				Name:  "Name",
				Value: n.Name,
			},
			{
				Name:  "Kind",
				Value: string(n.Kind),
			},
		},
	}

	return []*unit.UnitSection{
		deviceSection,
	}
}

func (n *Network) String() string {
	reader := unit.SerializeSections(n.Sections())
	b, err := ioutil.ReadAll(reader)
	if err != nil {
		panic(err.Error())
	}
	return string(b)
}

func (n *Network) Sections() []*unit.UnitSection {
	matchSection := &unit.UnitSection{
		Section: "Match",
		Entries: []*unit.UnitEntry{},
	}
	networkSection := &unit.UnitSection{
		Section: "Network",
		Entries: []*unit.UnitEntry{},
	}

	if len(n.Match.Names) > 0 {
		for _, name := range n.Match.Names {
			matchSection.Entries = append(matchSection.Entries, &unit.UnitEntry{
				Name:  "Name",
				Value: name,
			})
		}
	}

	if n.Bond != "" {
		networkSection.Entries = append(networkSection.Entries, &unit.UnitEntry{
			Name:  "Bond",
			Value: n.Bond,
		})
	} else if n.Bridge != "" {
		networkSection.Entries = append(networkSection.Entries, &unit.UnitEntry{
			Name:  "Bridge",
			Value: n.Bridge,
		})
	}

	networkSection.Entries = append(networkSection.Entries, &unit.UnitEntry{
		Name:  "DHCP",
		Value: encodeBool(n.DHCP),
	})

	return []*unit.UnitSection{
		matchSection,
		networkSection,
	}

}

func encodeBool(b bool) string {
	if b {
		return "on"
	}
	return "off"
}
