package linux

import (
	"context"
	"fmt"

	"github.com/ordiri/ordiri/pkg/network/api"
)

func (ln *linuxDriver) RemoveNetwork(ctx context.Context, nw api.Network) error {
	return fmt.Errorf("method 'RemoveNetwork' not implemented")
}

func (ln *linuxDriver) EnsureNetwork(ctx context.Context, nw api.Network) error {
	if err := ln.installNat(ctx, nw); err != nil {
		return err
	}
	return nil
}
