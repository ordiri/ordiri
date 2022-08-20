package metadata

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"strings"

	"github.com/davecgh/go-spew/spew"
	"github.com/ordiri/ordiri/log"
	"sigs.k8s.io/controller-runtime/pkg/client"

	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	// "github.com/ordiri/ordiri/log"
	e "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	// "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	// "github.com/ordiri/ordiri/config"
)

// Server serves boot and provisioning configs to machines via HTTP.
type Server struct {
	client client.Client
}

// NewServer returns a new Server.
func NewServer(client client.Client) *Server {
	return &Server{
		client: client,
	}
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

		host := net.ParseIP(addr)
		if host.IsUnspecified() {
			errorResponse(w, r, fmt.Sprintf("invalid incoming request for %q", addr), nil)
			return
		}
		vmByIp := &corev1alpha1.MachineList{}

		if err := s.client.List(context.Background(), vmByIp); err != nil {
			errorResponse(w, r, fmt.Sprintf("error listing machine for ip %q - %s", host, err.Error()), nil)
			return
		}
		if len(vmByIp.Items) == 0 {
			errorResponse(w, r, fmt.Sprintf("missing machines for machine %q", host), nil)
			return
		}
		props, err := vmByIp.Items[0].Properties()
		if err != nil {
			errorResponse(w, r, fmt.Sprintf("error getting properties for machine %q - %s", host, err.Error()), nil)
			return
		}
		meta := &VirtualMachineMetadata{
			Name:       vmByIp.Items[0].Name,
			Properties: props,
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
		fmt.Printf("HTTP %s %v\n", req.Method, req.URL)
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
