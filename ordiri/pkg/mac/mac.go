package mac

import (
	"encoding/binary"
	"net"

	crand "crypto/rand"
	mrand "math/rand"
)

const MacAddrLength = 6

var EmptyMacAddr = []byte{}

var Parse = net.ParseMAC

func init() {
	// https://stackoverflow.com/posts/54491783/revisions
	var b [8]byte
	_, err := crand.Read(b[:])
	if err != nil {
		panic("cannot seed math/rand package with cryptographically secure random number generator")
	}
	mrand.Seed(int64(binary.LittleEndian.Uint64(b[:])))
}

func New() net.HardwareAddr {
	buf := make([]byte, MacAddrLength)
	_, err := crand.Read(buf[:])
	if err != nil {
		panic("failed mac gen")
		return EmptyMacAddr
	}

	return buf
}

func Unicast() net.HardwareAddr {
	buf := New()
	buf[0] = (buf[0] | 2) & 0xfe // Set local bit, ensure unicast address
	return buf
}

func Multicast() net.HardwareAddr {
	buf := New()
	buf[0] |= 2
	return buf
}
