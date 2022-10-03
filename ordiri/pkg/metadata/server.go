package metadata

import (
	"context"
	"fmt"
	"net/http"
	"path"
	"strings"

	"inet.af/netaddr"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/davecgh/go-spew/spew"
	computev1alpha1 "github.com/ordiri/ordiri/pkg/apis/compute/v1alpha1"
	"github.com/ordiri/ordiri/pkg/metadata/resolvers"
	// "github.com/ordiri/ordiri/log"
	// "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
	// "github.com/ordiri/ordiri/config"
)

// Server serves boot and provisioning configs to machines via HTTP.
type Server struct {
	client      client.Client
	allHandlers []string
}

// NewServer returns a new Server.
func NewServer(client client.Client) *Server {
	return &Server{
		client: client,
	}
}

const VirtualMachineByInterfaceIpKey = ".spec.virtual_machine_by_interface_ip"

func KeyForVmInterface(network, subnet string, ip netaddr.IP) string {
	return fmt.Sprintf("%s:%s:%s", network, subnet, ip.String())
}

func (s *Server) HandleMissing(w http.ResponseWriter, r *http.Request) {
	potential := map[string]bool{}
	spew.Dump(s.allHandlers)
	for _, handlerPath := range s.allHandlers {
		fmt.Printf("checking if %q has %q prefix\n\n\n\n", r.URL.EscapedPath(), handlerPath)
		if strings.HasPrefix(handlerPath, r.URL.EscapedPath()) {
			path := strings.TrimPrefix(handlerPath, r.URL.EscapedPath())
			parts := strings.Split(path, "/")
			key := parts[0]
			if len(parts) > 1 {
				key = key + "/"
			}
			potential[key] = true
		}
	}
	for key := range potential {
		w.Write([]byte(key + "\n"))
	}
}

func (s *Server) vmForRequest(r *http.Request) (*computev1alpha1.VirtualMachine, string, string, string, error) {
	subnet := r.Header.Get("X-Ordiri-Subnet")
	network := r.Header.Get("X-Ordiri-Network")
	ip := r.Header.Get("X-Ordiri-Ip")
	tenant := r.Header.Get("X-Ordiri-Tenant")

	addr, err := netaddr.ParseIP(ip)

	if err != nil {
		return nil, "", "", "", fmt.Errorf("invalid ip addr - %w", err)
	}

	vmKey := KeyForVmInterface(network, subnet, addr)
	if subnet == "" || network == "" || ip == "" {
		return nil, "", "", "", fmt.Errorf("invalid incoming request for %q", vmKey)
	}
	fmt.Printf("Getting vm by for tenant %s vmkey: %+v\n", tenant, vmKey)

	vmByIp := &computev1alpha1.VirtualMachineList{}
	if err := s.client.List(context.Background(), vmByIp, client.InNamespace(tenant), client.MatchingFields{VirtualMachineByInterfaceIpKey: vmKey}); err != nil {
		return nil, "", "", "", fmt.Errorf("error listing machine for ip %q - %s", fmt.Sprintf("%s@%s", tenant, vmKey), err.Error())
	}

	if len(vmByIp.Items) == 0 {
		return nil, "", "", "", fmt.Errorf("missing machines for ip %q", vmKey)
	}

	return &vmByIp.Items[0], network, subnet, ip, nil
}
func (s *Server) HTTPHandler() http.Handler {
	mux := http.NewServeMux()
	// handler := otelhttp.NewHandler(mux, "server")
	s.allHandlers = []string{}

	apiBasePath := "/latest"
	udBasePath := apiBasePath + "/user-data"
	mux.Handle(udBasePath, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		vm, _, _, _, err := s.vmForRequest(r)
		if err != nil {
			errorResponse(w, r, err.Error(), nil)
			return
		}
		w.Write([]byte(vm.Spec.UserData))
	}))

	mdBasePath := apiBasePath + "/meta-data/"
	chain := func(tag, route string, handler resolvers.Resolver) {
		route = path.Join(mdBasePath, route)
		s.allHandlers = append(s.allHandlers, route)
		next := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			vm, subnet, network, ip, err := s.vmForRequest(r)
			if err != nil {
				errorResponse(w, r, err.Error(), nil)
				return
			}
			path := strings.TrimPrefix(r.URL.EscapedPath(), mdBasePath)
			res, success := handler(vm, path, subnet, network, ip)
			if !success {
				s.HandleMissing(w, r)
				return
			}
			w.Write([]byte(res))
		})
		logger := s.logRequest(next)
		mux.Handle(route, logger)
	}

	mux.Handle("/", http.HandlerFunc(s.HandleMissing))

	chain("Network", "local-ipv4", resolvers.LocalIpv4)
	chain("Network", "local-hostname", resolvers.Hostname)

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

type VirtualMachineMetadata struct {
	Name       string
	Properties map[string]string
}
