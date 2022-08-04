// lots from https://github.com/dmacvicar/terraform-provider-libvirt/blob/06d383abe97b94603edb6fd68f318ad1b3ad4685/libvirt/domain.go

package libvirt

import (
	"fmt"

	"libvirt.org/go/libvirtxml"
)

type DomainOption func(*libvirtxml.Domain) error

func WithBootDevice(bootDevice ...string) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		if domain.OS == nil {
			domain.OS = &libvirtxml.DomainOS{}
		}
		if domain.OS.BootDevices == nil {
			domain.OS.BootDevices = []libvirtxml.DomainBootDevice{}
		}

		for _, dev := range bootDevice {
			domain.OS.BootDevices = append(domain.OS.BootDevices, libvirtxml.DomainBootDevice{
				Dev: dev,
			})
		}
		return nil
	}
}

func WithConsole(targetPort uint, targetType string) DomainOption {
	return func(domain *libvirtxml.Domain) error {

		if domain.Devices == nil {
			domain.Devices = &libvirtxml.DomainDeviceList{}
		}
		domain.Devices.Consoles = append(domain.Devices.Consoles, libvirtxml.DomainConsole{
			Target: &libvirtxml.DomainConsoleTarget{
				Port: &targetPort,
				Type: targetType,
			},
		})
		return nil
	}
}

func WithCpu(cpus uint) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		domain.VCPU = &libvirtxml.DomainVCPU{
			Placement: "static",
			Value:     cpus,
		}
		domain.CPU = &libvirtxml.DomainCPU{
			Mode:  "custom",
			Match: "exact",
			Check: "full",
		}
		return nil
	}
}

func WithMemory(size uint) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		domain.CurrentMemory = &libvirtxml.DomainCurrentMemory{
			Value: size,
			Unit:  "KiB",
		}
		domain.Memory = &libvirtxml.DomainMemory{
			Value: size,
			Unit:  "KiB",
		}
		return nil
	}
}

func WithBridge(bridge ...string) DomainOption {
	interfaces := []libvirtxml.DomainInterface{}
	for _, bridgeName := range bridge {
		interfaces = append(interfaces, libvirtxml.DomainInterface{
			Source: &libvirtxml.DomainInterfaceSource{
				Bridge: &libvirtxml.DomainInterfaceSourceBridge{
					Bridge: bridgeName,
				},
			},
			Model: &libvirtxml.DomainInterfaceModel{
				Type: "virtio",
			},
		})
	}
	return WithNetworkInterfaces(interfaces...)
}

func WithNetworkInterfaces(interfaces ...libvirtxml.DomainInterface) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		if domain.Devices == nil {
			domain.Devices = &libvirtxml.DomainDeviceList{}
		}

		domain.Devices.Interfaces = append(domain.Devices.Interfaces, interfaces...)
		return nil
	}
}
func WithBiosOemString(entries ...string) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		if domain.OS == nil {
			domain.OS = &libvirtxml.DomainOS{}
		}
		domain.OS.SMBios = &libvirtxml.DomainSMBios{
			Mode: "sysinfo",
		}
		domainSysInfo := &libvirtxml.DomainSysInfo{}
		for _, dsi := range domain.SysInfo {
			if dsi.SMBIOS != nil {
				domainSysInfo = &dsi
			}
		}
		if domainSysInfo.SMBIOS == nil {
			domainSysInfo.SMBIOS = &libvirtxml.DomainSysInfoSMBIOS{}
		}

		if domainSysInfo.SMBIOS.OEMStrings == nil {
			domainSysInfo.SMBIOS.OEMStrings = &libvirtxml.DomainSysInfoOEMStrings{}
		}

		domainSysInfo.SMBIOS.OEMStrings.Entry = append(domainSysInfo.SMBIOS.OEMStrings.Entry, entries...)
		return nil
	}
}

func WithCephVolume(name, device string) DomainOption {
	return func(d *libvirtxml.Domain) error {
		return WithDisk(libvirtxml.DomainDisk{
			Device: "disk",

			Source: &libvirtxml.DomainDiskSource{
				Network: &libvirtxml.DomainDiskSourceNetwork{
					Protocol: "rbd",
					Name:     fmt.Sprintf("tenant1/%s", name),
					Hosts: []libvirtxml.DomainDiskSourceHost{
						{
							Name: "mothership",
							Port: "6789",
						},
					},
				},
			},
			Auth: &libvirtxml.DomainDiskAuth{
				Username: "libvirt",
				Secret: &libvirtxml.DomainDiskSecret{
					Type: "ceph",
					UUID: "4eadcf35-dc7d-4d80-a7fe-5f599d1ec49f",
				},
			},
			Target: &libvirtxml.DomainDiskTarget{
				Dev: device,
				Bus: "virtio",
			},
		})(d)
	}
}

func WithPoolVolume(pool, volume, device string) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		// domain.Devices.Disks = append(domain.Devices.Disks, )
		return WithDisk(libvirtxml.DomainDisk{
			Device: "disk",
			Source: &libvirtxml.DomainDiskSource{
				Volume: &libvirtxml.DomainDiskSourceVolume{
					Pool:   pool,
					Volume: volume,
				},
			},
			Target: &libvirtxml.DomainDiskTarget{
				Dev: device,
				Bus: "virtio",
			},
			Driver: &libvirtxml.DomainDiskDriver{
				Name: "qemu",
				Type: "qcow2",
			},
		})(domain)
	}
}

func WithDisk(disks ...libvirtxml.DomainDisk) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		domain.Devices.Disks = append(domain.Devices.Disks, disks...)
		return nil
	}
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
