package libvirt

import "fmt"

func DomainState(state, reason int32) string {
	reasonStr := ""
	reasonType := ""
	switch state {
	case 1:
		reasonType = "Running"
		switch reason {
		case 0:
			reasonStr = "Unknown"
		case 1:
			reasonStr = "Booted"
		case 2:
			reasonStr = "Migrated"
		case 3:
			reasonStr = "Restored"
		case 4:
			reasonStr = "From Snapshot"
		case 5:
			reasonStr = "Unpaused"
		case 6:
			reasonStr = "Migration Canceled"
		case 7:
			reasonStr = "Save Canceled"
		case 8:
			reasonStr = "Wakeup"
		case 9:
			reasonStr = "Crashed"
		case 10:
			reasonStr = "Postcopy"
		}

	case 2:
		reasonType = "Blocked"

		switch reason {
		case 0:
			reasonStr = "Unknown"
		}

	case 3:
		reasonType = "Paused"
		switch reason {
		case 0:
			reasonStr = "Unknown"
		case 1:
			reasonStr = "User"
		case 2:
			reasonStr = "Migration"
		case 3:
			reasonStr = "Save"
		case 4:
			reasonStr = "Dump"
		case 5:
			reasonStr = "Ioerror"
		case 6:
			reasonStr = "Watchdog"
		case 7:
			reasonStr = "From Snapshot"
		case 8:
			reasonStr = "Shutting Down"
		case 9:
			reasonStr = "Snapshot"
		case 10:
			reasonStr = "Crashed"
		case 11:
			reasonStr = "Starting Up"
		case 12:
			reasonStr = "Postcopy"
		case 13:
			reasonStr = "Postcopy Failed"
		}

	case 4:
		reasonType = "Shutdown"
		switch reason {
		case 0:
			reasonStr = "Unknown"
		case 1:
			reasonStr = "User"
		}

	case 5:
		reasonType = "Shutoff"
		switch reason {
		case 0:
			reasonStr = "Unknown"
		case 1:
			reasonStr = "Shutdown"
		case 2:
			reasonStr = "Destroyed"
		case 3:
			reasonStr = "Crashed"
		case 4:
			reasonStr = "Migrated"
		case 5:
			reasonStr = "Saved"
		case 6:
			reasonStr = "Failed"
		case 7:
			reasonStr = "From Snapshot"
		case 8:
			reasonStr = "Daemon"
		}
	case 6:
		reasonType = "Crashed"
		switch reason {
		case 0:
			reasonStr = "Unknown"
		case 1:
			reasonStr = "Panicked"
		}

	}
	return fmt.Sprintf("%s - %s", reasonType, reasonStr)
}
