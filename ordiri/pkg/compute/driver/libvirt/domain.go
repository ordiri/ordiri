// lots from https://github.com/dmacvicar/terraform-provider-libvirt/blob/06d383abe97b94603edb6fd68f318ad1b3ad4685/libvirt/domain.go

package libvirt

import (
	"fmt"
	"time"

	"github.com/digitalocean/go-libvirt"
	"libvirt.org/go/libvirtxml"
)

type EnsureResult string

const (
	EnsureResultDomainUnknown = "unknown"
	EnsureResultDomainCreated = "created"
	EnsureResultDomainUpdated = "updated"
	EnsureResultDomainNone    = "none"
	EnsureResultDomainDeleted = "deleted"
)

func doLiveUpdates(client *Libvirt, dom libvirt.Domain, old, new *libvirtxml.Domain) error {
	disks := map[string]libvirtxml.DomainDisk{}
	for _, disk := range old.Devices.Disks {
		disks[disk.Device] = disk
	}

	ifaces := map[string]libvirtxml.DomainInterface{}
	for _, iface := range old.Devices.Interfaces {
		ifaces[iface.MAC.Address] = iface
	}

	// Call the attach device for all the devices not yet seen
	for _, disk := range new.Devices.Disks {
		xml, err := disk.Marshal()
		if err != nil {
			return fmt.Errorf("unable to marshal disk to remove - %w", err)
		}
		if _, ok := disks[disk.Device]; !ok {
			if err := client.DomainAttachDeviceFlags(dom, xml, 0); err != nil {
				return fmt.Errorf("error updating disk %s - %w", disk.Device, err)
			}
		} else {
			if err := client.DomainUpdateDeviceFlags(dom, xml, libvirt.DomainDeviceModifyLive); err != nil {
				return fmt.Errorf("error updating disk %s - %w", disk.Device, err)
			}

		}
		delete(disks, disk.Device)
	}

	// Call the attach device for all the devices not yet seen
	for _, iface := range new.Devices.Interfaces {
		xml, err := iface.Marshal()
		if err != nil {
			return fmt.Errorf("unable to marshal iface to remove - %w", err)
		}
		if _, ok := ifaces[iface.MAC.Address]; !ok {
			if err := client.DomainAttachDeviceFlags(dom, xml, 0); err != nil {
				return fmt.Errorf("error updating network interface %s - %w", iface.MAC.Address, err)
			}
		} else {
			if err := client.DomainUpdateDeviceFlags(dom, xml, libvirt.DomainDeviceModifyLive); err != nil {
				return fmt.Errorf("error updating network interface %s - %w", iface.MAC.Address, err)
			}

		}
		delete(ifaces, iface.MAC.Address)
	}

	for _, iface := range ifaces {
		xml, err := iface.Marshal()
		if err != nil {
			return fmt.Errorf("unable to marshal iface to remove - %w", err)
		}

		if err := client.DomainDetachDeviceFlags(dom, xml, uint32(libvirt.DomainDeviceModifyLive)); err != nil {
			return fmt.Errorf("unable to remove ifac %s - %w", iface.MAC.Address, err)
		}
	}

	for _, disk := range disks {
		xml, err := disk.Marshal()
		if err != nil {
			return fmt.Errorf("unable to marshal iface to remove - %w", err)
		}

		if err := client.DomainDetachDeviceFlags(dom, xml, uint32(libvirt.DomainDeviceModifyLive)); err != nil {
			return fmt.Errorf("unable to remove ifac %s - %w", disk.Device, err)
		}
	}

	return nil
}

func EnsureExisting(client *Libvirt, dom libvirt.Domain, domain *libvirtxml.Domain) (EnsureResult, error) {
	existingXml, err := client.DomainGetXMLDesc(dom, 0)
	if err != nil {
		return EnsureResultDomainUnknown, err
	}

	existing := &libvirtxml.Domain{}
	if err := existing.Unmarshal(existingXml); err != nil {
		return EnsureResultDomainUnknown, err
	}

	domainStr, err := domain.Marshal()
	if err != nil {
		return EnsureResultDomainUnknown, err
	}

	dom, err = client.DomainDefineXMLFlags(domainStr, 0)
	if err != nil {
		return EnsureResultDomainUnknown, fmt.Errorf("unable to update xml definition - %w", err)
	}

	state, _, err := client.DomainGetState(dom, 0)
	if err != nil {
		return EnsureResultDomainUnknown, fmt.Errorf("unable to get domain state - %w", err)
	}
	if state == int32(libvirt.DomainRunning) {

		if err := doLiveUpdates(client, dom, existing, domain); err != nil {
			return EnsureResultDomainUnknown, fmt.Errorf("error applying live updates - %w", err)
		}
	}

	return EnsureResultDomainUpdated, nil
}

func EnsureNew(client *Libvirt, domain *libvirtxml.Domain) (*libvirt.Domain, EnsureResult, error) {
	domainStr, err := domain.Marshal()
	if err != nil {
		return nil, EnsureResultDomainUnknown, err
	}

	dom, err := client.DomainDefineXMLFlags(domainStr, 0)
	if err != nil {
		return nil, EnsureResultDomainUnknown, err
	}

	return &dom, EnsureResultDomainCreated, nil
}

func Ensure(client *Libvirt, name string, state libvirt.DomainState, opts ...DomainOption) (*libvirtxml.Domain, *libvirt.Domain, EnsureResult, error) {
	domain, err := NewDomain(name, opts...)
	if err != nil {
		return nil, nil, EnsureResultDomainUnknown, err
	}

	if domain.UUID == "" {
		return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("missing domain uuid")
	}

	var res EnsureResult
	dom, err := client.DomainLookupByUUID(uuidFromString(domain.UUID))
	if err != nil {
		dom, _res, err := EnsureNew(client, domain)
		if err != nil {
			return domain, nil, res, fmt.Errorf("error creating new domain - %w", err)
		}
		res = _res

		return domain, dom, res, nil
	} else {
		_res, err := EnsureExisting(client, dom, domain)
		if err != nil {
			return domain, nil, res, fmt.Errorf("error updating existing domain - %w", err)
		}
		res = _res
	}

	currentState, _, err := client.DomainGetState(dom, 0)
	if err != nil {
		return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("couldn't get state of domain - %w", err)
	}

	if libvirt.DomainState(currentState) != state {
		if state == libvirt.DomainRunning {
			if err := client.DomainResume(dom); err != nil {
				return nil, nil, EnsureResultDomainUnknown, err
			}
		} else if state == libvirt.DomainShutdown {
			if err := client.DomainShutdownFlags(dom, libvirt.DomainShutdownDefault); err != nil {
				return nil, nil, EnsureResultDomainUnknown, err
			}
		} else {
			return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("unknown state %d", state)
		}
		time.Sleep(time.Second * 5)
		currentState, reason, err := client.DomainGetState(dom, 0)
		if err != nil {
			return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("couldn't get state of domain - %w", err)
		}
		if state != libvirt.DomainState(currentState) {
			return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("error transitioning vm status - %s - %w", DomainState(currentState, reason), err)
		}
	}

	return domain, &dom, res, nil
}

func NewDomain(name string, opts ...DomainOption) (*libvirtxml.Domain, error) {
	domainDef := &libvirtxml.Domain{
		Name: name,
		SysInfo: []libvirtxml.DomainSysInfo{
			{
				SMBIOS: &libvirtxml.DomainSysInfoSMBIOS{
					// OEMStrings: &libvirtxml.DomainSysInfoOEMStrings{
					// 	Entry: []string{"jool"},
					// },
				},
			},
		},
		OS: &libvirtxml.DomainOS{
			Type: &libvirtxml.DomainOSType{
				Type: "hvm",
			},
			BIOS: &libvirtxml.DomainBIOS{
				UseSerial: "yes",
			},
			BootMenu: &libvirtxml.DomainBootMenu{
				Enable:  "yes",
				Timeout: "3000",
			},
		},
		Memory: &libvirtxml.DomainMemory{
			Unit:  "MiB",
			Value: 512,
		},
		VCPU: &libvirtxml.DomainVCPU{
			Placement: "static",
			Value:     1,
		},
		CPU: &libvirtxml.DomainCPU{},
		Devices: &libvirtxml.DomainDeviceList{
			Graphics: []libvirtxml.DomainGraphic{
				{
					Spice: &libvirtxml.DomainGraphicSpice{
						AutoPort: "yes",
					},
				},
			},
			Channels: []libvirtxml.DomainChannel{
				{
					Source: &libvirtxml.DomainChardevSource{
						UNIX: &libvirtxml.DomainChardevSourceUNIX{},
					},
					Target: &libvirtxml.DomainChannelTarget{
						VirtIO: &libvirtxml.DomainChannelTargetVirtIO{
							Name: "org.qemu.guest_agent.0",
						},
					},
				},
			},
		},
		Features: &libvirtxml.DomainFeatureList{
			PAE:  &libvirtxml.DomainFeature{},
			ACPI: &libvirtxml.DomainFeature{},
			APIC: &libvirtxml.DomainFeatureAPIC{},
		},
	}

	domainDef.Type = "kvm"

	domainDef.Devices.RNGs = []libvirtxml.DomainRNG{
		{
			Model: "virtio",
			Backend: &libvirtxml.DomainRNGBackend{
				Random: &libvirtxml.DomainRNGBackendRandom{Device: "/dev/urandom"},
			},
		},
	}

	for _, o := range opts {
		if err := o(domainDef); err != nil {
			return nil, err
		}
	}

	return domainDef, nil
}
