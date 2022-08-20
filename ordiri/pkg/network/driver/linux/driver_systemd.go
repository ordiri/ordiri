package linux

import (
	"context"
	"fmt"
	"io"
	"os"
	"path"

	"github.com/coreos/go-systemd/unit"
	"github.com/ordiri/ordiri/pkg/log"
)

func (ln *linuxDriver) enableUnitFile(ctx context.Context, baseDir string, unitName string, opts []*unit.UnitOption) error {
	log := log.FromContext(ctx)
	unitReader := unit.Serialize(opts)
	unitBytes, err := io.ReadAll(unitReader)
	if err != nil {
		return fmt.Errorf("unable to get serialize unit file for service %q %w", unitName, err)
	}
	unitFile := path.Join(baseDir, unitName)
	if err := os.WriteFile(unitFile, unitBytes, 0644); err != nil {
		return fmt.Errorf("unable to create system unit file %q - %w", unitFile, err)
	}

	units, err := ln.dbus.ListUnitsByNamesContext(ctx, []string{unitName})
	if err != nil {
		return err
	}
	running := false
	for _, unit := range units {
		if unit.ActiveState == "active" {
			running = true
		}
	}
	needsReload := false
	if running {
		needsReloadProp, err := ln.dbus.GetUnitPropertyContext(ctx, unitName, "NeedDaemonReload")
		if err != nil {
			return fmt.Errorf("unable to fetch data to determine if dbus needs reload - %w", err)
		}

		if err := needsReloadProp.Value.Store(&needsReload); err != nil {
			return fmt.Errorf("error decoding data to determine if dbus needs reload - %w", err)
		}
	}

	if !running || needsReload {
		log.V(5).Info("No existing service, creating")
		if err := ln.dbus.ReloadContext(ctx); err != nil {
			return err
		}

		log.V(5).Info("enabling systemd service", "unit", unitName)
		started, _, err := ln.dbus.EnableUnitFilesContext(ctx, []string{unitFile}, true, true)
		if err != nil {
			return fmt.Errorf("unable to enable system unit file %q - %w", unitName, err)
		}

		if !started {
			return fmt.Errorf("invalid service unit file %q, not started", unitName)
		}
		pid, err := ln.dbus.RestartUnitContext(ctx, unitName, "replace", nil)

		if err != nil || pid == 0 {
			return fmt.Errorf("unable to start service %q - %w", unitName, err)

		}

		log.V(5).Info("started service", "unit", unitName)
	}
	return nil
}
