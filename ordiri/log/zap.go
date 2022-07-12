package log

import (
	"flag"
	"os"

	"github.com/go-logr/logr"
	k8zap "sigs.k8s.io/controller-runtime/pkg/log/zap"
)

func InitializeLogger() logr.Logger {
	opts := k8zap.Options{
		Development: true,
	}
	cmdLine := flag.NewFlagSet(os.Args[0], flag.ContinueOnError)
	opts.BindFlags(cmdLine)
	cmdLine.Parse(os.Args[1:])

	return k8zap.New(k8zap.UseFlagOptions(&opts))
}

var Logger = InitializeLogger()
