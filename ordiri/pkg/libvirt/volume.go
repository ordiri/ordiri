// lots from https://github.com/dmacvicar/terraform-provider-libvirt/blob/06d383abe97b94603edb6fd68f318ad1b3ad4685/libvirt/domain.go

package libvirt

import (
	"libvirt.org/go/libvirtxml"
)

type VolumeOption func(*libvirtxml.StorageVolume) error

func WithSize(sizeInBytes uint64) VolumeOption {
	return func(sv *libvirtxml.StorageVolume) error {
		sv.Capacity = &libvirtxml.StorageVolumeSize{
			Unit:  "bytes",
			Value: sizeInBytes,
		}

		return nil
	}
}

func NewVolume(name string, opts ...VolumeOption) (*libvirtxml.StorageVolume, error) {
	volume := &libvirtxml.StorageVolume{
		Name: name,
		Target: &libvirtxml.StorageVolumeTarget{
			Format: &libvirtxml.StorageVolumeTargetFormat{
				Type: "qcow2",
			},
			Permissions: &libvirtxml.StorageVolumeTargetPermissions{
				Mode: "644",
			},
		},
		Capacity: &libvirtxml.StorageVolumeSize{
			Unit:  "bytes",
			Value: 1,
		},
	}

	for _, o := range opts {
		if err := o(volume); err != nil {
			return nil, err
		}
	}

	return volume, nil
}
