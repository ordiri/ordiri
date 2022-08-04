package libvirt

import (
	"github.com/digitalocean/go-libvirt"
	"github.com/google/uuid"
)

func uuidFromString(uuidStr string) libvirt.UUID {
	ub := [libvirt.UUIDBuflen]byte{}
	newUuid, err := uuid.Parse(uuidStr)
	if err != nil {
		panic(err.Error())
	}

	copy(ub[:], newUuid[:])
	return libvirt.UUID(ub)
}
