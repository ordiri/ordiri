// lots from https://github.com/dmacvicar/terraform-provider-libvirt/blob/06d383abe97b94603edb6fd68f318ad1b3ad4685/libvirt/domain.go

package libvirt

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/u-root/u-root/pkg/pci"
	"libvirt.org/go/libvirtxml"
)

const CephSecretUUID = "4eadcf35-dc7d-4d80-a7fe-5f599d1ec49f"

type DomainOption func(*libvirtxml.Domain) error

func WithUuid(uuid string) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		domain.UUID = uuid

		return nil
	}
}
func WithBasicDefaults() DomainOption {
	return func(domain *libvirtxml.Domain) error {
		domain.Description = "Created by the golang scheduler"

		if domain.Clock == nil {

			domain.Clock = &libvirtxml.DomainClock{}
		}

		domain.Clock.Offset = "utc"

		return nil
	}
}
func WithBootDevice(bootDevice ...string) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		if domain.OS == nil {
			domain.OS = &libvirtxml.DomainOS{}
		}

		if domain.OS.BootDevices == nil {
			domain.OS.BootDevices = []libvirtxml.DomainBootDevice{}
		}
		existing := map[string]libvirtxml.DomainBootDevice{}
		for _, bootDevice := range domain.OS.BootDevices {
			existing[bootDevice.Dev] = bootDevice
		}

		for _, dev := range bootDevice {
			if _, ok := existing[dev]; ok {
				continue
			}

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

		for _, console := range domain.Devices.Consoles {
			if console.Target != nil && console.Target.Port != nil {
				if *console.Target.Port == targetPort && console.Target.Type == targetType {
					return nil
				}
			}
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
		if domain.VCPU == nil {
			domain.VCPU = &libvirtxml.DomainVCPU{}
			domain.VCPU.Placement = "static"
		}
		if domain.CPU == nil {
			domain.CPU = &libvirtxml.DomainCPU{}
			domain.CPU.Mode = "custom"
			domain.CPU.Match = "exact"
			domain.CPU.Check = "none"
		}
		if domain.CPU.Model == nil {
			domain.CPU.Model = &libvirtxml.DomainCPUModel{}
			domain.CPU.Model.Fallback = "forbid"
			domain.CPU.Model.Value = "qemu64"
			domain.CPU.Features = append(domain.CPU.Features, libvirtxml.DomainCPUFeature{
				Name:   "svm",
				Policy: "disable",
			})
			// <feature name='svm' policy='disable'/>

		}
		domain.VCPU.Value = cpus

		return nil
	}
}

func WithMemory(size uint) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		if domain.CurrentMemory == nil {
			domain.CurrentMemory = &libvirtxml.DomainCurrentMemory{}
		}
		domain.CurrentMemory.Value = size
		domain.CurrentMemory.Unit = "KiB"

		if domain.Memory == nil {
			domain.Memory = &libvirtxml.DomainMemory{}
		}

		domain.Memory.Value = size
		domain.Memory.Unit = "KiB"
		return nil
	}
}

func extractPcieDevice(addr string) (uint, uint, uint, uint, error) {
	// 0000:04:00.0
	parts := strings.Split(addr, ":")
	if len(parts) != 3 {
		return 0, 0, 0, 0, fmt.Errorf("invalid device addr - %s", addr)
	}
	domainStr := parts[0]
	domain, err := strconv.Atoi(domainStr)
	if err != nil {
		return 0, 0, 0, 0, fmt.Errorf("unable to convert domain %q to number - %w", domain, err)
	}

	slotStr := parts[1]

	slot, err := strconv.Atoi(slotStr)
	if err != nil {
		return 0, 0, 0, 0, fmt.Errorf("unable to convert slot %q to number - %w", slot, err)
	}
	busAndFunc := parts[2]
	bfParts := strings.Split(busAndFunc, ".")
	if len(bfParts) != 2 {
		return 0, 0, 0, 0, fmt.Errorf("missing function in device addr - %s", addr)
	}
	busStr := bfParts[0]
	bus, err := strconv.Atoi(busStr)
	if err != nil {
		return 0, 0, 0, 0, fmt.Errorf("unable to convert bus %q to number - %w", bus, err)
	}
	functionStr := bfParts[1]
	function, err := strconv.Atoi(functionStr)
	if err != nil {
		return 0, 0, 0, 0, fmt.Errorf("unable to convert function %q to number - %w", function, err)
	}

	return uint(domain), uint(slot), uint(bus), uint(function), nil
}

func WithDevice(devices ...*pci.PCI) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		for _, device := range devices {

			pcieDomain, pcieBus, pcieSlot, pcieFunction, err := extractPcieDevice(device.Addr)
			if err != nil {
				panic("invalid pcie addr - " + device.Addr)
			}
			found := false
			for _, device := range domain.Devices.Hostdevs {
				if device.SubsysPCI != nil && device.SubsysPCI.Source != nil && device.SubsysPCI.Source.Address != nil {
					if pcieDomain == *device.SubsysPCI.Source.Address.Domain &&
						pcieBus == *device.SubsysPCI.Source.Address.Bus &&
						pcieSlot == *device.SubsysPCI.Source.Address.Slot &&
						pcieFunction == *device.SubsysPCI.Source.Address.Function {
						found = true
					}
				}
			}

			if !found {
				domain.Devices.Hostdevs = append(domain.Devices.Hostdevs, libvirtxml.DomainHostdev{
					SubsysPCI: &libvirtxml.DomainHostdevSubsysPCI{
						Source: &libvirtxml.DomainHostdevSubsysPCISource{
							Address: &libvirtxml.DomainAddressPCI{
								Domain:   &pcieDomain,
								Slot:     &pcieSlot,
								Bus:      &pcieBus,
								Function: &pcieFunction,
							},
						},
					},
					Managed: "yes",
				})
			}
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

		existing := map[string]libvirtxml.DomainInterface{}
		for _, iface := range domain.Devices.Interfaces {
			existing[iface.Target.Dev] = iface
		}

		for _, iface := range interfaces {
			if _, ok := existing[iface.Target.Dev]; ok {
				continue
			}

			domain.Devices.Interfaces = append(domain.Devices.Interfaces, iface)

		}
		return nil
	}
}
func WithVnc() DomainOption {
	return WithGraphics(libvirtxml.DomainGraphic{
		VNC: &libvirtxml.DomainGraphicVNC{
			Listen:    "0.0.0.0",
			AutoPort:  "yes",
			Passwd:    "password12",
			WebSocket: -1,
			Port:      -1,
		},
	})
}
func WithMetadata(ns, uri, key, value string) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		if domain.Metadata == nil {
			domain.Metadata = &libvirtxml.DomainMetadata{}
		}
		newXml := fmt.Sprintf("<%s:%s xmlns:%s=%q>%s</%s:%s>", ns, key, ns, uri, value, ns, key)
		if !strings.Contains(domain.Metadata.XML, newXml) {
			domain.Metadata.XML = domain.Metadata.XML + newXml
		}
		return nil
	}
}
func WithGraphics(graphics ...libvirtxml.DomainGraphic) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		if domain.Devices == nil {
			domain.Devices = &libvirtxml.DomainDeviceList{}
		}
		key := func(g libvirtxml.DomainGraphic) string {
			if g.VNC != nil {
				return "vnc"
			}
			if g.Spice != nil {
				return "spice"
			}
			panic("unable to decode graphic type")
		}

		existing := map[string]libvirtxml.DomainGraphic{}
		for _, graphic := range domain.Devices.Graphics {
			existing[key(graphic)] = graphic
		}

		for _, graphic := range graphics {
			if _, ok := existing[key(graphic)]; ok {
				continue
			}

			domain.Devices.Graphics = append(domain.Devices.Graphics, graphic)
		}
		return nil
	}
}
func WithBiosOemString(entries ...string) DomainOption {
	return func(domain *libvirtxml.Domain) error {
		if domain.OS == nil {
			domain.OS = &libvirtxml.DomainOS{}
		}
		if domain.OS.SMBios == nil {
			domain.OS.SMBios = &libvirtxml.DomainSMBios{}
		}
		domain.OS.SMBios.Mode = "sysinfo"
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

func WithCephVolume(secret, tenant, name, device string) DomainOption {
	return func(d *libvirtxml.Domain) error {
		return WithDisk(libvirtxml.DomainDisk{
			Device: "disk",

			Source: &libvirtxml.DomainDiskSource{
				Network: &libvirtxml.DomainDiskSourceNetwork{
					Protocol: "rbd",
					Name:     fmt.Sprintf("%s/%s", tenant, name),
					Hosts: []libvirtxml.DomainDiskSourceHost{
						{
							Name: "ceph",
							Port: "6789",
						},
					},
				},
			},
			Auth: &libvirtxml.DomainDiskAuth{
				Username: "libvirt",
				Secret: &libvirtxml.DomainDiskSecret{
					Type: "ceph",
					// Usage: "ordiri",
					UUID: secret, // todo: bring from somewhere else
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
		existing := map[string]libvirtxml.DomainDisk{}
		for _, disk := range domain.Devices.Disks {
			existing[disk.Target.Dev] = disk
		}

		for _, disk := range disks {
			if _, ok := existing[disk.Target.Dev]; ok {
				continue
			}

			domain.Devices.Disks = append(domain.Devices.Disks, disk)
		}
		return nil
	}
}
