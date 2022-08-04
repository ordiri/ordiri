package compute

import (
	"context"
	"fmt"

	k8err "k8s.io/apimachinery/pkg/api/errors"
	"libvirt.org/go/libvirtxml"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/digitalocean/go-libvirt"
	internallibvirt "github.com/ordiri/ordiri/pkg/libvirt"

	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	storagev1alpha1 "github.com/ordiri/ordiri/pkg/apis/storage/v1alpha1"
)

func (r *VirtualMachineReconciler) getClaim(ctx context.Context, vm *computev1alpha1.VirtualMachine, disk *computev1alpha1.VirtualMachineVolume) (*storagev1alpha1.VolumeClaim, error) {
	claim, err := r.volumeClaim(ctx, vm, disk)
	if err != nil && !k8err.IsNotFound(err) {
		return nil, err
	}

	return claim, nil
}

func (r *VirtualMachineReconciler) getVolume(ctx context.Context, vm *computev1alpha1.VirtualMachine, disk *computev1alpha1.VirtualMachineVolume) (computev1alpha1.VirtualMachineVolumeStatus, internallibvirt.DomainOption, error) {
	status := computev1alpha1.VirtualMachineVolumeStatus{
		Name:   disk.Name,
		Bound:  false,
		Device: disk.Device,
	}

	if disk.VolumeClaim != nil {
		claim, err := r.getClaim(ctx, vm, disk)
		if err != nil {
			return status, nil, err
		}
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
	}

	return status, nil, fmt.Errorf("unknown disk type")

	// Ephemeral storage / CSI style
	// vol, err := r.volumeClaim(ctx, vm, disk)
	// if err != nil && !k8err.IsNotFound(err) {
	// 	return status, nil, err
	// }

	// pool, err := r.EnsurePool(ctx, poolName)
	// if err != nil {
	// 	return status, nil, err
	// }

	// storageVol, err := r.LibvirtClient.StorageVolLookupByName(*pool, vol.Name)
	// if err == nil {
	// 	return status, nil, nil
	// }

	// volume, err := internallibvirt.NewVolume(vol.Name,
	// 	internallibvirt.WithSize(uint64(vol.Spec.Size.Value())),
	// )
	// if err != nil {
	// 	return status, nil, fmt.Errorf("error creating new internal volume - %w", err)
	// }

	// volumeStr, err := volume.Marshal()
	// if err != nil {
	// 	return status, nil, err
	// }

	// storageVol, err = r.LibvirtClient.StorageVolCreateXML(*pool, volumeStr, 0)
	// if err != nil {
	// 	return status, nil, fmt.Errorf("unable to create storage volume - %w", err)
	// }

	// opt := internallibvirt.WithPoolVolume(poolName, volume.Name, disk.Device)
	// return computev1alpha1.VirtualMachineVolumeStatus{Name: storageVol.Name}, opt, nil
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
