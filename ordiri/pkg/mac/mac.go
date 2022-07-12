package mac

import (
	"crypto/rand"
	"net"
)

const MacAddrLength = 6

var EmptyMacAddr = []byte{}

func New() net.HardwareAddr {
	buf := make([]byte, MacAddrLength)
	_, err := rand.Read(buf[:])
	if err != nil {
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
