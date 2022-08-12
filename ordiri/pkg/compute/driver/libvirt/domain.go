// lots from https://github.com/dmacvicar/terraform-provider-libvirt/blob/06d383abe97b94603edb6fd68f318ad1b3ad4685/libvirt/domain.go

package libvirt

import (
	"context"
	"fmt"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/digitalocean/go-libvirt"
	"github.com/ordiri/ordiri/pkg/log"
	"libvirt.org/go/libvirtxml"
)

type EnsureResult string

const (
	EnsureResultDomainUnknown EnsureResult = "unknown"
	EnsureResultDomainCreated EnsureResult = "created"
	EnsureResultDomainUpdated EnsureResult = "updated"
	EnsureResultDomainNone    EnsureResult = "none"
	EnsureResultDomainDeleted EnsureResult = "deleted"
)

func EnsureExisting(ctx context.Context, client *Libvirt, dom libvirt.Domain, opts ...DomainOption) (EnsureResult, *libvirtxml.Domain, error) {
	log := log.FromContext(ctx)
	existingXml, err := client.DomainGetXMLDesc(dom, libvirt.DomainXMLSecure|libvirt.DomainXMLUpdateCPU|libvirt.DomainXMLInactive)
	if err != nil {
		return EnsureResultDomainUnknown, nil, err
	}

	existing := &libvirtxml.Domain{}
	if err := existing.Unmarshal(existingXml); err != nil {
		return EnsureResultDomainUnknown, nil, err
	}

	fmt.Print("\n\n\n\n")
	spew.Dump(existingXml)
	fmt.Print("\n\n\n\n")

	domain := &libvirtxml.Domain{}
	if err := domain.Unmarshal(existingXml); err != nil {
		return EnsureResultDomainUnknown, nil, err
	}

	for _, f := range opts {
		if err := f(domain); err != nil {
			return EnsureResultDomainUnknown, nil, fmt.Errorf("error applying option - %w", err)
		}
	}

	domainStr, err := domain.Marshal()
	if err != nil {
		return EnsureResultDomainUnknown, nil, err
	}
	// We do this by marshaling both objects to ensure the exact same
	// serialisation, otherwise we're comparing a string from libvirt
	// with a string we generated, will always fail
	wasChanged := func() bool {
		existingXml, err := existing.Marshal()
		if err != nil {
			return true
		}

		return domainStr != existingXml
	}()
	log.V(5).Info("updating existing domain", "wasChanged", wasChanged)
	dom, err = client.DomainDefineXMLFlags(domainStr, 0)
	if err != nil {
		return EnsureResultDomainUnknown, nil, fmt.Errorf("unable to update xml definition - %w", err)
	}

	state, _, err := client.DomainGetState(dom, 0)
	if err != nil {
		return EnsureResultDomainUnknown, nil, fmt.Errorf("unable to get domain state - %w", err)
	}
	if state == int32(libvirt.DomainRunning) {
		if err := doLiveUpdates(client, dom, existing, domain); err != nil {
			return EnsureResultDomainUnknown, nil, fmt.Errorf("error applying live updates - %w", err)
		}
	}

	res := EnsureResultDomainNone
	if wasChanged {
		res = EnsureResultDomainUpdated
	}

	return res, domain, nil
}

func EnsureNew(ctx context.Context, client *Libvirt, domain *libvirtxml.Domain) (*libvirt.Domain, EnsureResult, error) {
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

func Ensure(ctx context.Context, client *Libvirt, name string, desiredState libvirt.DomainState, opts ...DomainOption) (*libvirtxml.Domain, *libvirt.Domain, EnsureResult, error) {
	domain, err := NewDomain(name, opts...)
	if err != nil {
		return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("unable to create new domain - %w", err)
	}

	if domain.UUID == "" {
		return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("missing domain uuid")
	}

	var res EnsureResult
	dom, err := client.DomainLookupByUUID(uuidFromString(domain.UUID))
	if err != nil {
		dom, _res, err := EnsureNew(ctx, client, domain)
		if err != nil {
			return domain, nil, res, fmt.Errorf("error creating new domain - %w", err)
		}
		res = _res

		return domain, dom, res, nil
	} else {
		_res, _domain, err := EnsureExisting(ctx, client, dom, opts...)
		if err != nil {
			return domain, nil, res, fmt.Errorf("error updating existing domain - %w", err)
		}
		res = _res
		domain = _domain
	}

	domainState, _, err := client.DomainGetState(dom, 0)
	if err != nil {
		return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("couldn't get state of domain - %w", err)
	}
	actualState := libvirt.DomainState(domainState)

	if actualState != desiredState {
		if desiredState == libvirt.DomainRunning && actualState == libvirt.DomainPaused {
			if err := client.DomainResume(dom); err != nil {
				return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("unable to resume domain - %w", err)
			}
		} else if desiredState == libvirt.DomainRunning && (actualState == libvirt.DomainShutdown || actualState == libvirt.DomainShutoff) {
			if _, err := client.DomainCreateWithFlags(dom, 0); err != nil {
				return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("unable to start domain - %w", err)
			}
		} else if desiredState == libvirt.DomainShutdown {
			if err := client.DomainShutdownFlags(dom, libvirt.DomainShutdownDefault); err != nil {
				return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("unable to shutdown domain - %w", err)
			}
		} else {
			return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("unknown state %d", desiredState)
		}
		time.Sleep(time.Second * 5)
		dstate, reason, err := client.DomainGetState(dom, 0)
		if err != nil {
			return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("couldn't get state of domain - %w", err)
		}
		actualState := libvirt.DomainState(dstate)
		if desiredState != actualState {
			return nil, nil, EnsureResultDomainUnknown, fmt.Errorf("error transitioning vm status - %s - %w", DomainState(actualState, reason), err)
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

func doLiveUpdates(client *Libvirt, dom libvirt.Domain, old, new *libvirtxml.Domain) error {
	disks := map[string]libvirtxml.DomainDisk{}
	for _, disk := range old.Devices.Disks {
		disks[disk.Target.Dev] = disk
	}

	ifaces := map[string]libvirtxml.DomainInterface{}
	for _, iface := range old.Devices.Interfaces {
		ifaces[iface.Target.Dev] = iface
	}
	// spew.Dump("Got the ifaces", ifaces)
	// spew.Dump("Got the disks", disks)

	// Call the attach device for all the devices not yet seen
	for _, disk := range new.Devices.Disks {
		xml, err := disk.Marshal()
		if err != nil {
			return fmt.Errorf("unable to marshal disk to remove - %w", err)
		}
		if _, ok := disks[disk.Target.Dev]; !ok {
			if err := client.DomainAttachDeviceFlags(dom, xml, 0); err != nil {
				return fmt.Errorf("error creating new disk %s - %w", disk.Target.Dev, err)
			}
		} else {
			needsUpdate := false
			if needsUpdate {
				if err := client.DomainUpdateDeviceFlags(dom, xml, libvirt.DomainDeviceModifyLive); err != nil {
					return fmt.Errorf("error updating disk %s - %w", disk.Target.Dev, err)
				}
			}
		}

		delete(disks, disk.Target.Dev)
	}

	// Call the attach device for all the devices not yet seen
	for _, iface := range new.Devices.Interfaces {
		xml, err := iface.Marshal()
		if err != nil {
			return fmt.Errorf("unable to marshal iface to remove - %w", err)
		}
		if old, ok := ifaces[iface.Target.Dev]; !ok {
			if err := client.DomainAttachDeviceFlags(dom, xml, 0); err != nil {
				return fmt.Errorf("error creating new network interface %s - %w", iface.Target.Dev, err)
			}
		} else {
			needsUpdate := false
			if old.Target.Dev != iface.Target.Dev {
				needsUpdate = true
			}

			if needsUpdate {
				if err := client.DomainUpdateDeviceFlags(dom, xml, libvirt.DomainDeviceModifyLive); err != nil {
					return fmt.Errorf("error updating network interface %s - %w", iface.Target.Dev, err)
				}
			}

		}
		delete(ifaces, iface.Target.Dev)
	}

	for _, iface := range ifaces {
		xml, err := iface.Marshal()
		if err != nil {
			return fmt.Errorf("unable to marshal iface to remove - %w", err)
		}

		if err := client.DomainDetachDeviceFlags(dom, xml, uint32(libvirt.DomainDeviceModifyLive)); err != nil {
			return fmt.Errorf("unable to remove ifac %s - %w", iface.Target.Dev, err)
		}
	}

	for _, disk := range disks {
		xml, err := disk.Marshal()
		if err != nil {
			return fmt.Errorf("unable to marshal iface to remove - %w", err)
		}

		if err := client.DomainDetachDeviceFlags(dom, xml, uint32(libvirt.DomainDeviceModifyLive)); err != nil {
			return fmt.Errorf("unable to remove ifac %s - %w", disk.Target.Dev, err)
		}
	}

	return nil
}
