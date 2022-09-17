package log

import (
	"github.com/go-logr/logr"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

type Log = logr.Logger

var FromContext = log.FromContext
