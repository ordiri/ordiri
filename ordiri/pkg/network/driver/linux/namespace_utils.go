package linux

import (
	"fmt"
	"runtime"

	"github.com/vishvananda/netns"
)

// executeInNetns sets execution of the code following this call to the
// network namespace newNs, then moves the thread back to curNs if open,
// otherwise to the current netns at the time the function was invoked
// In case of success, the caller is expected to execute the returned function
// at the end of the code that needs to be executed in the network namespace.
// Example:
// func jobAt(...) error {
//      d, err := executeInNetns(...)
//      if err != nil { return err}
//      defer d()
//      < code which needs to be executed in specific netns>
//  }
// Taken from the SubscribeAt in the github.com/vishvananda/netlink package
// TODO: his function probably belongs to netns pkg.
func ExecuteInNetns(newNs, curNs netns.NsHandle) (func(), error) {
	var (
		err       error
		moveBack  func(netns.NsHandle) error
		closeNs   func() error
		unlockThd func()
	)
	restore := func() {
		// order matters
		if moveBack != nil {
			moveBack(curNs)
		}
		if closeNs != nil {
			closeNs()
		}
		if unlockThd != nil {
			unlockThd()
		}
	}
	if newNs.IsOpen() {
		runtime.LockOSThread()
		unlockThd = runtime.UnlockOSThread
		if !curNs.IsOpen() {
			if curNs, err = netns.Get(); err != nil {
				restore()
				return nil, fmt.Errorf("could not get current namespace while creating netlink socket: %v", err)
			}
			closeNs = curNs.Close
		}
		if err := netns.Set(newNs); err != nil {
			restore()
			return nil, fmt.Errorf("failed to set into network namespace %d while creating netlink socket: %v", newNs, err)
		}
		moveBack = netns.Set
	}
	return restore, nil
}
