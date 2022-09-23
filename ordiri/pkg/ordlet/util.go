package ordlet

import (
	"context"
	"fmt"
	"time"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func WaitForNetwork(ctx context.Context, nwm api.NetworkManager, nw string, timeout time.Duration) error {
	err := waitFor(ctx, func() error {
		return fmt.Errorf("no network")
		// if nwm.GetNetwork(nw) == nil {
		// }
		return nil
	}, timeout)
	if err != nil {
		return fmt.Errorf("timed out waiting for network - %w", err)
	}
	return nil
}

func WaitForSubnet(ctx context.Context, nwm api.SubnetManager, nw api.Network, sn string, timeout time.Duration) error {
	err := waitFor(ctx, func() error {
		return fmt.Errorf("no subnet")
		// if nwm.GetSubnet(nw, sn) == nil {
		// }
		return nil
	}, timeout)

	if err != nil {
		return fmt.Errorf("timed out waiting for subnet  - %w", err)
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
