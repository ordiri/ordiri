package csi

// create a docker file to use in vscode for dev so librados works because gopls will run on the container with
// proper linux, what have i been xoing...

import (
	"github.com/container-storage-interface/spec/lib/go/csi"
)

func init() {
	csi.CapacityRange{}
}
