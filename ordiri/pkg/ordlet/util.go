package ordlet

import (
	"context"
	"fmt"
	"time"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func WaitForNetwork(ctx context.Context, nwm api.NetworkManager, nw string, timeout time.Duration) error {
	err := waitFor(ctx, func() error {
		if !nwm.HasNetwork(nw) {
			return fmt.Errorf("no network")
		}
		return nil
	}, timeout)
	if err != nil {
		return fmt.Errorf("timed out waiting for network - %w", err)
	}
	return nil
}

func WaitForSubnet(ctx context.Context, nwm api.SubnetManager, nw api.Network, sn string, timeout time.Duration) error {
	err := waitFor(ctx, func() error {
		if !nwm.HasSubnet(nw, sn) {
			return fmt.Errorf("no subnet")
		}
		return nil
	}, timeout)

	if err != nil {
		return fmt.Errorf("timed out waiting for subnet  - %w", err)
	}
	return nil
}

func WaitForRouter(ctx context.Context, nwm api.RouterManager, nw api.Network, sn api.Subnet, rtr string, timeout time.Duration) error {
	err := waitFor(ctx, func() error {
		if !nwm.HasRouter(nw, sn, rtr) {
			return fmt.Errorf("no router")
		}
		return nil
	}, timeout)
	if err != nil {
		return fmt.Errorf("timed out waiting for router - %w", err)
	}
	return nil
}

func WaitForInterface(ctx context.Context, nwm api.InterfaceManager, nw api.Network, sn api.Subnet, iface string, timeout time.Duration) error {
	err := waitFor(ctx, func() error {
		if !nwm.HasInterface(nw, sn, iface) {
			return fmt.Errorf("no interface")
		}
		return nil
	}, timeout)
	if err != nil {
		return fmt.Errorf("timed out waiting for interface - %w", err)
	}
	return nil
}

func waitFor(pCtx context.Context, fn func() error, timeout time.Duration) error {
	ctx, cancel := context.WithTimeout(pCtx, timeout)
	defer cancel()
	for {
		select {
		case <-ctx.Done():
			return fmt.Errorf("timed out")
		default:
			if err := fn(); err == nil {
				return nil
			}
		}
	}
}
