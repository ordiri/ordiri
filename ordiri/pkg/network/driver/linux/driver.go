package linux

import (
	"context"
	"fmt"
	"sync"

	"github.com/coreos/go-systemd/v22/dbus"
	"github.com/mdlayher/netlink"
	"github.com/ordiri/ordiri/pkg/network/driver"
	"github.com/vishvananda/netns"
	"golang.org/x/sys/unix"
)

const (
	networkNamespacePath = "/var/run/netns"
)

const (
	InterfaceBridgePrefix     = "obr"
	InterfaceTunTapPrefix     = "ovm"
	PublicGatewayCablePrefix  = "prtr-"
	InternalRouterCablePrefix = "irtr-"
	NetworkServiceCablePrefix = "svc-"
)

var (
	nlMsgReqAck = netlink.Message{
		Header: netlink.Header{
			Flags: netlink.Request | netlink.Acknowledge,
		},
	}
)

type ifaceList struct {
	interfaces map[string]map[int]NetworkInterface
	l          sync.Mutex
}

func (il *ifaceList) set(ns string, iface NetworkInterface) {
	il.l.Lock()
	defer il.l.Unlock()
	if il.interfaces == nil {
		il.interfaces = make(map[string]map[int]NetworkInterface)
	}

	if il.interfaces[ns] == nil {
		il.interfaces[ns] = map[int]NetworkInterface{}
	}

	il.interfaces[ns][iface.Attrs().Index] = iface
}

func (il *ifaceList) get(ns string, name string) *NetworkInterface {
	for _, iface := range il.interfaces[ns] {
		if iface.Name() == name {
			return &iface
		}
	}
	return nil
}
func (il *ifaceList) search(name string) (string, *NetworkInterface) {
	for ns, ifaces := range il.interfaces {
		for _, iface := range ifaces {
			if iface.Name() == name {
				return ns, &iface
			}
		}
	}
	return "", nil
}

func New() (driver.RunnableDriver, error) {
	ctx := context.Background()
	dbusConn, err := dbus.NewWithContext(ctx)
	if err != nil {
		return nil, err
	}

	return &linuxDriver{
		groups: []uint32{
			unix.RTMGRP_LINK,
			// unix.rtmgrp_i
		},
		dbus:       dbusConn,
		interfaces: &ifaceList{},
	}, nil
}

type linuxDriver struct {
	// config
	groups []uint32

	// objs
	dbus *dbus.Conn

	stopCh chan struct{}

	// data
	interfaces *ifaceList
	ns         map[int32]string
}

func (ln *linuxDriver) Info() driver.DriverInfo {
	return driver.DriverInfo{
		Name:    "linux",
		Version: "v1alpha1",
	}
}
func (ln *linuxDriver) Close() error {
	close(ln.stopCh)
	return nil
}

// Start a subscriber that listens for netlink events
// and stops when the context finishes
func (ln *linuxDriver) Start(ctx context.Context) error {
	// 	if ln.conn == nil {
	// 		if err := ln.Dial(); err != nil {
	// 			return err
	// 		}
	// 		defer ln.Close()
	// 	}
	// 	if err := ln.conn.SetOption(netlink.GetStrictCheck, true); err != nil {
	// 		return err
	// 	}
	// 	if err := ln.conn.SetOption(netlink.ListenAllNSID, true); err != nil {
	// 		return err
	// 	}
	// 	if err := ln.conn.SetOption(netlink.ExtendedAcknowledge, true); err != nil {
	// 		return err
	// 	}

	// 	ctx, cancel := context.WithCancel(ctx)
	// 	defer cancel()

	// 	errCh := make(chan error)
	// 	go func() {
	// 		for {
	// 			select {
	// 			case <-ctx.Done():
	// 				return
	// 			case msg := <-ln.msgCh:
	// 				_, err := ln.conn.Send(msg.message, msg.family, msg.flags)
	// 				if err != nil {
	// 					errCh <- err
	// 				}
	// 			}
	// 		}
	// 	}()

	// 	go func() {
	// 		for {
	// 			select {
	// 			case <-ctx.Done():
	// 				return
	// 			default:
	// 				fmt.Printf("Receve from queue \n")
	// 				rtmsg, msgs, err := ln.conn.Receive()
	// 				if err != nil {
	// 					errCh <- err
	// 					return
	// 				}
	// 				spew.Dump(rtmsg, msgs)
	// 			}
	// 		}
	// 	}()

	// 	go func() {
	// 		<-errCh
	// 		cancel()
	// 	}()
	// 	fmt.Printf("waiting for shutdown")

	// 	return <-errCh

	namespaces, err := listNamespaces()
	if err != nil {
		return fmt.Errorf("can't list namespaces - %w", err)
	}

	curNs, err := netns.Get()
	if err != nil {
		return err
	}
	stopCh := make(chan error)
	defer close(stopCh)

	go func() {
		<-ctx.Done()
		stopCh <- ctx.Err()
	}()

	ctx, cancel := context.WithCancel(ctx)

	// Get in this ns first
	go func() {
		if err := ln.watchNamespaceInterfaces(ctx, "root", curNs); err != nil && err != ctx.Err() {
			stopCh <- err
		}
	}()

	ln.ns = map[int32]string{}
	for _, name := range namespaces {
		go func(name string) {
			handle, err := netns.GetFromName(name)
			// _ = ns
			if err != nil {
				stopCh <- err
				return
			}
			defer handle.Close()
			if err := ln.watchNamespaceInterfaces(ctx, name, handle); err != nil && err != ctx.Err() {
				stopCh <- err
				return
			}
		}(name)
	}

	err = <-stopCh
	cancel()

	return err
}

var _ driver.RunnableDriver = &linuxDriver{}
