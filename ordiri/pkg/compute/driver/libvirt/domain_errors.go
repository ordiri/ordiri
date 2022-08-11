package libvirt

import (
	"fmt"

	"github.com/digitalocean/go-libvirt"
)

func DomainState(state libvirt.DomainState, reason int32) string {
	reasonStr := ""
	reasonType := ""
	switch state {
	case libvirt.DomainRunning:
		reasonType = "Running"
		switch libvirt.DomainRunningReason(reason) {
		default:
			reasonStr = "Unknown"
		case libvirt.DomainRunningBooted:
			reasonStr = "Booted"
		case libvirt.DomainRunningMigrated:
			reasonStr = "Migrated"
		case libvirt.DomainRunningRestored:
			reasonStr = "Restored"
		case libvirt.DomainRunningFromSnapshot:
			reasonStr = "From Snapshot"
		case libvirt.DomainRunningUnpaused:
			reasonStr = "Unpaused"
		case libvirt.DomainRunningMigrationCanceled:
			reasonStr = "Migration Canceled"
		case libvirt.DomainRunningSaveCanceled:
			reasonStr = "Save Canceled"
		case libvirt.DomainRunningWakeup:
			reasonStr = "Wakeup"
		case libvirt.DomainRunningCrashed:
			reasonStr = "Crashed"
		case libvirt.DomainRunningPostcopy:
			reasonStr = "Postcopy"
		}

	case libvirt.DomainBlocked:
		reasonType = "Blocked"
		switch libvirt.DomainBlockedReason(reason) {
		default:
			reasonStr = "Unknown"
		}

	case libvirt.DomainPaused:
		reasonType = "Paused"
		switch libvirt.DomainPausedReason(reason) {
		default:
			reasonStr = "Unknown"
		case libvirt.DomainPausedUser:
			reasonStr = "User"
		case libvirt.DomainPausedMigration:
			reasonStr = "Migration"
		case libvirt.DomainPausedSave:
			reasonStr = "Save"
		case libvirt.DomainPausedDump:
			reasonStr = "Dump"
		case libvirt.DomainPausedIoerror:
			reasonStr = "Ioerror"
		case libvirt.DomainPausedWatchdog:
			reasonStr = "Watchdog"
		case libvirt.DomainPausedFromSnapshot:
			reasonStr = "From Snapshot"
		case libvirt.DomainPausedShuttingDown:
			reasonStr = "Shutting Down"
		case libvirt.DomainPausedSnapshot:
			reasonStr = "Snapshot"
		case libvirt.DomainPausedCrashed:
			reasonStr = "Crashed"
		case libvirt.DomainPausedStartingUp:
			reasonStr = "Starting Up"
		case libvirt.DomainPausedPostcopy:
			reasonStr = "Postcopy"
		case libvirt.DomainPausedPostcopyFailed:
			reasonStr = "Postcopy Failed"
		}

	case libvirt.DomainShutdown:
		reasonType = "Shutdown"
		switch libvirt.DomainShutdownReason(reason) {
		default:
			reasonStr = "Unknown"
		case libvirt.DomainShutdownUser:
			reasonStr = "User"
		}

	case libvirt.DomainShutoff:
		reasonType = "Shutoff"
		switch libvirt.DomainShutoffReason(reason) {
		default:
			reasonStr = "Unknown"
		case libvirt.DomainShutoffShutdown:
			reasonStr = "Shutdown"
		case libvirt.DomainShutoffDestroyed:
			reasonStr = "Destroyed"
		case libvirt.DomainShutoffCrashed:
			reasonStr = "Crashed"
		case libvirt.DomainShutoffMigrated:
			reasonStr = "Migrated"
		case libvirt.DomainShutoffSaved:
			reasonStr = "Saved"
		case libvirt.DomainShutoffFailed:
			reasonStr = "Failed"
		case libvirt.DomainShutoffFromSnapshot:
			reasonStr = "From Snapshot"
		case libvirt.DomainShutoffDaemon:
			reasonStr = "Daemon"
		}
	case libvirt.DomainCrashed:
		reasonType = "Crashed"
		switch libvirt.DomainCrashedReason(reason) {
		default:
			reasonStr = "Unknown"
		case libvirt.DomainCrashedPanicked:
			reasonStr = "Panicked"
		}

	}
	return fmt.Sprintf("%s - %s", reasonType, reasonStr)
}
