package libvirt

import (
	"github.com/digitalocean/go-libvirt"
	"github.com/digitalocean/go-libvirt/socket/dialers"
)

var cache map[string]*Libvirt = make(map[string]*Libvirt)

type Libvirt struct {
	*libvirt.Libvirt
}

func Local() *Libvirt {
	return Host("127.0.0.1")
}

func New(addr string) *Libvirt {
	dialer := dialers.NewRemote(addr, dialers.UsePort("16509"))
	l := libvirt.NewWithDialer(dialer)
	if err := l.Connect(); err != nil {
		panic("failed to connect to libvirt " + err.Error())
	}

	return &Libvirt{
		Libvirt: l,
	}
}

func Host(addr string) *Libvirt {
	client, ok := cache[addr]
	if !ok {
		client = New(addr)
		cache[addr] = client
	}
	return client
}
