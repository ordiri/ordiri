package metadata

import (
	"fmt"
	"net"
	"net/http"
	"strings"
	"time"

	"github.com/davecgh/go-spew/spew"
	"github.com/ordiri/ordiri/log"

	// "github.com/ordiri/ordiri/log"
	e "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	clientset "github.com/ordiri/ordiri/pkg/generated/clientset/versioned"

	// "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"

	// "github.com/ordiri/ordiri/config"

	"github.com/ordiri/ordiri/pkg/generated/informers/externalversions"
)

// Server serves boot and provisioning configs to machines via HTTP.
type Server struct {
	client clientset.Interface

	watcher *vmWatcher
}

// NewServer returns a new Server.
func NewServer(client clientset.Interface) *Server {
	return &Server{
		client: client,
	}
}

// HTTPHandler returns a HTTP handler for the server.
func (s *Server) Start(stopCh chan struct{}) {
	informerFactory := externalversions.NewSharedInformerFactory(s.client, time.Second*60)
	machine := informerFactory.Core().V1alpha1().Machines()
	s.watcher = &vmWatcher{
		Metas: make(map[string]*VirtualMachineMetadata),
	}

	machine.Informer().AddEventHandler(s.watcher)

	go func() {
		machine.Informer().Run(stopCh)
	}()

	<-stopCh
}

func (s *Server) HTTPHandler() http.Handler {
	mux := http.NewServeMux()
	// handler := otelhttp.NewHandler(mux, "server")

	chain := func(tag, route string, next http.Handler) {
		// next = otelhttp.WithRouteTag(tag, next)
		logger := s.logRequest(next)
		mux.Handle(route, logger)
	}

	mdBasePath := "/latest/meta-data/"
	chain("Metadata", mdBasePath, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		addr := r.RemoteAddr
		if r.URL.Query().Has("_spoof") {
			addr = r.URL.Query().Get("_spoof")
		}

		host, _, err := net.SplitHostPort(addr)
		if err != nil {
			errorResponse(w, r, fmt.Sprintf("invalid incoming request for %q", addr), nil)
			return
		}
		meta, ok := s.watcher.Metas[host]
		if !ok {
			errorResponse(w, r, fmt.Sprintf("missing metadata for machine %q", host), nil)
			return
		}
		path := strings.TrimPrefix(r.URL.EscapedPath(), mdBasePath)
		spew.Dump(path)
		resolver, ok := resolvers[path]
		if !ok {
			errorResponse(w, r, fmt.Sprintf("invalid path %q", path), nil)
			return
		}

		val, ok := resolver(meta)
		if !ok {
			errorResponse(w, r, fmt.Sprintf("unable to resolve value for %q", path), nil)
			return
		}

		successResponse(w, r, val, struct{}{})
	}))

	return mux
}

// logRequest logs HTTP requests.
func (s *Server) logRequest(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, req *http.Request) {
		log.Logger.Info("HTTP %s %v\n", req.Method, req.URL)
		next.ServeHTTP(w, req)
	}

	return http.HandlerFunc(fn)
}

type vmWatcher struct {
	Metas map[string]*VirtualMachineMetadata
}

func (ich *vmWatcher) OnAdd(obj interface{}) {
	machine, ok := obj.(*e.Machine)
	if !ok {
		log.Logger.Info("object was not a Machine")
		return
	}
	// log.Logger.Info("got machine profile onadd", "machine", machine)

	mp, err := machine.Properties()
	if err != nil {
		log.Logger.Error(err, "unable to get machine properties", "machine", machine)
		return
	}
	ip, ok := mp["ip"]
	if !ok {
		log.Logger.Info("object did not have an ip")
		return
	}
	ich.Metas[ip] = &VirtualMachineMetadata{
		Name:       getMachineName(machine),
		Properties: mp,
	}
}

func (ich *vmWatcher) OnUpdate(oldObj, newObj interface{}) {
	machine, ok := newObj.(*e.Machine)
	if !ok {
		log.Logger.Info("object was not a Machine")
		return
	}

	// log.Logger.Info("got machine profile onupdate", "machine", machine)

	mp, err := machine.Properties()
	if err != nil {
		log.Logger.Error(err, "unable to get machine properties", "machine", machine)
		return
	}

	ip, ok := mp["ip"]
	if !ok {
		log.Logger.Info("object did not have an ip")
		return
	}

	ich.Metas[ip] = &VirtualMachineMetadata{
		Name:       getMachineName(machine),
		Properties: mp,
	}
}

func getMachineName(m *e.Machine) string {
	if len(m.OwnerReferences) > 0 {
		for _, or := range m.OwnerReferences {
			if or.Kind != "VirtualMachine" {
				continue
			}
			return or.Name
		}
	}

	return m.Name
}

func (ich *vmWatcher) OnDelete(obj interface{}) {
	machine, ok := obj.(*e.Machine)
	if !ok {
		log.Logger.Info("object was not a Machine")
		return
	}
	mp, err := machine.Properties()
	if err != nil {
		log.Logger.Error(err, "unable to get machine properties", "machine", machine)
		return
	}

	ip, ok := mp["ip"]
	if !ok {
		log.Logger.Info("object did not have an ip")
		return
	}

	delete(ich.Metas, ip)
}

type VirtualMachineMetadata struct {
	Name       string
	Properties map[string]string
}
