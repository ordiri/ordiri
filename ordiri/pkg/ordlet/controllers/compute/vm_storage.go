package compute

import (
	"context"
	"fmt"

	"libvirt.org/go/libvirtxml"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	"github.com/digitalocean/go-libvirt"
	internallibvirt "github.com/ordiri/ordiri/pkg/compute/driver/libvirt"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	storagev1alpha1 "github.com/ordiri/ordiri/pkg/apis/storage/v1alpha1"
)

func (r *VirtualMachineReconciler) getClaim(ctx context.Context, vm *computev1alpha1.VirtualMachine, disk *computev1alpha1.VirtualMachineVolume) (*storagev1alpha1.VolumeClaim, error) {
	claim, err := r.volumeClaim(ctx, vm, disk)
	if err != nil {
		return nil, err
	}

	return claim, nil
}

func (r *VirtualMachineReconciler) getVolume(ctx context.Context, vm *computev1alpha1.VirtualMachine, disk *computev1alpha1.VirtualMachineVolume) (computev1alpha1.VirtualMachineVolumeStatus, internallibvirt.DomainOption, error) {
	log := log.FromContext(ctx)
	status := computev1alpha1.VirtualMachineVolumeStatus{
		Name:   disk.Name,
		Bound:  false,
		Device: disk.Device,
	}

	if disk.VolumeClaim != nil {
		log.V(5).Info("getting volume claim", "disk", disk)
		claim, err := r.getClaim(ctx, vm, disk)
		if err != nil {
			return status, nil, err
		}

		log.V(5).Info("got claim", "disk", disk, "claim", claim)
		if claim.Spec.VolumeName == "" {
			return status, nil, fmt.Errorf("claim has no bound volume")
		}

		vol, err := r.volumeFromClaim(ctx, vm, claim)
		if err != nil {
			return status, nil, err
		}
		status.Bound = true
		status.Size = vol.Spec.Size

		return status, internallibvirt.WithCephVolume(vol.Name, disk.Device), nil
	} else if disk.HostLocal != nil {
		pool, err := r.EnsurePool(ctx, disk.HostLocal.PoolName)
		if err != nil {
			return status, nil, err
		}

		if _, err := r.LibvirtClient.StorageVolLookupByName(*pool, disk.HostLocal.VolName); err == nil {
			return status, internallibvirt.WithPoolVolume(pool.Name, disk.HostLocal.VolName, disk.Device), nil
		}

		volume, err := internallibvirt.NewVolume(disk.HostLocal.VolName,
			internallibvirt.WithSize(uint64(disk.HostLocal.Size.Value())),
		)
		if err != nil {
			return status, nil, fmt.Errorf("error creating new internal volume - %w", err)
		}

		volumeStr, err := volume.Marshal()
		if err != nil {
			return status, nil, err
		}

		storageVol, err := r.LibvirtClient.StorageVolCreateXML(*pool, volumeStr, 0)
		if err != nil {
			return status, nil, fmt.Errorf("unable to create storage volume - %w", err)
		}

		return status, internallibvirt.WithPoolVolume(storageVol.Pool, storageVol.Key, disk.Device), nil
	}

	return status, nil, fmt.Errorf("unknown disk type")
}

func (r *VirtualMachineReconciler) EnsurePool(ctx context.Context, name string) (*libvirt.StoragePool, error) {
	pool, err := r.LibvirtClient.StoragePoolLookupByName(name)
	if err != nil {
		xmlpool := libvirtxml.StoragePool{
			Name: name,
			Type: "dir",
			Target: &libvirtxml.StoragePoolTarget{
				Path: "/var/lib/libvirt/pool-" + name,
			},
			Source: &libvirtxml.StoragePoolSource{},
		}

		encoded, err := xmlpool.Marshal()
		if err != nil {
			return nil, fmt.Errorf("unable to create xml - %w", err)
		}

		pool, err = r.LibvirtClient.StoragePoolDefineXML(encoded, 0)
		if err != nil {
			return nil, fmt.Errorf("unable to create new storage pool - %w", err)
		}

		err = r.LibvirtClient.StoragePoolSetAutostart(pool, 1)
		if err != nil {
			return nil, fmt.Errorf("unable to enable autostart on storagepool - %w", err)
		}
	}

	if isActive, _ := r.LibvirtClient.StoragePoolIsActive(pool); isActive == 0 {
		err = r.LibvirtClient.StoragePoolCreate(pool, libvirt.StoragePoolCreateWithBuild)
		if err != nil {
			return nil, fmt.Errorf("unable to start pool - %w", err)
		}
	}

	return &pool, nil
}
func (r *VirtualMachineReconciler) volumeFromClaim(ctx context.Context, vm *computev1alpha1.VirtualMachine, claim *storagev1alpha1.VolumeClaim) (*storagev1alpha1.Volume, error) {
	volume := &storagev1alpha1.Volume{}
	volume.Name = claim.Spec.VolumeName
	if err := r.Client.Get(ctx, client.ObjectKeyFromObject(volume), volume); err != nil {
		return nil, err
	}

	return volume, nil
}
func (r *VirtualMachineReconciler) volumeClaim(ctx context.Context, vm *computev1alpha1.VirtualMachine, vol *computev1alpha1.VirtualMachineVolume) (*storagev1alpha1.VolumeClaim, error) {
	volume := &storagev1alpha1.VolumeClaim{}
	volume.Name = vol.Name
	if err := r.Client.Get(ctx, client.ObjectKeyFromObject(volume), volume); err != nil {
		return nil, err
	}

	return volume, nil
}
