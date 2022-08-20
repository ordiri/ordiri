package ipxe

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/ordiri/ordiri/log"

	// "github.com/ordiri/ordiri/log"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	corev1alpha1client "github.com/ordiri/ordiri/pkg/generated/clientset/versioned/typed/core/v1alpha1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	// "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

var ipxeVars = map[string]string{
	"manufacturer": "manufacturer",
	"product":      "product",
	"serial":       "serial",
	"asset":        "asset",
	"mac":          "mac",
	"uuid":         "uuid",
	"busid":        "busid",
	"user-class":   "user-class",
	"dhcp-server":  "dhcp-server",
	"domain":       "domain",
	"hostname":     "hostname",
	"ip":           "ip",
	"netmask":      "netmask",
	"gateway":      "gateway",
	"dns":          "dns",
	"syslog":       "syslog",
	"ntp-server":   "42:ipv4",
	"next-server":  "next-server",
	"filename":     "filename",
	"node-role":    "smbios/node-role",
}

// Server serves boot and provisioning configs to machines via HTTP.
type Server struct {
	client corev1alpha1client.MachineInterface
	cfg    *IpxeConfigs
}

// NewServer returns a new Server.
func NewServer(client corev1alpha1client.MachineInterface, config *IpxeConfigs) *Server {
	return &Server{
		client: client,
		cfg:    config,
	}
}

// HTTPHandler returns a HTTP handler for the server.
func (s *Server) HTTPHandler() http.Handler {
	mux := http.NewServeMux()
	// handler := otelhttp.NewHandler(mux, "server")

	chain := func(tag, route string, next http.Handler) {
		// next = otelhttp.WithRouteTag(tag, next)
		logger := s.logRequest(next)
		mux.Handle(route, logger)
	}

	getNode := func(ctx context.Context, uuid string) (*corev1alpha1.Machine, error) {
		if uuid == "" {
			return nil, errors.New("missing uuid")
		}

		res, err := s.client.Get(ctx, uuid, v1.GetOptions{})

		if err != nil {
			return nil, fmt.Errorf("error getting node - %w", err)
		}

		return res, nil
	}

	getNodeRole := func(nodeObj *corev1alpha1.Machine) (*IpxeRole, error) {
		role := nodeObj.Spec.Role
		if role == "" {
			return nil, fmt.Errorf("missing node role %s", nodeObj.Name)
		}

		config, ok := s.cfg.Roles[role]
		if !ok {
			return nil, fmt.Errorf("node role %s is not registered", role)
		}
		return config, nil
	}

	chain("/fetch", "/fetch", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		filename := r.URL.Query().Get("file")
		if filename == "" {
			errorResponse(w, r, "{{ .Message }}", struct{ Message string }{Message: "missing filename"})
			return
		}
		uuid := r.URL.Query().Get("uuid")
		nodeObj, err := getNode(ctx, uuid)
		if err != nil {
			errorResponse(w, r, "{{ .Message }}", struct{ Message string }{Message: err.Error()})
			return
		}

		config, err := getNodeRole(nodeObj)
		if err != nil {
			errorResponse(w, r, "{{ .Message }}", struct{ Message string }{Message: err.Error()})
			return
		}

		if _, ok := config.Files[filename]; !ok {
			errorResponse(w, r, "{{ .Message }}", struct{ Message string }{Message: "invalid file specified"})
			return
		}

		successResponse(w, r, config.Files[filename], struct {
			Node   *corev1alpha1.Machine
			Config IpxeConfig
		}{
			Node:   nodeObj,
			Config: config.Ipxe,
		})
	}))
	chain("/discover.ipxe", "/discover.ipxe", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		uuid := r.URL.Query().Get("uuid")
		nodeObj, err := getNode(ctx, uuid)
		isNew := false

		if uuid != "" && nodeObj == nil {
			isNew = true
			nodeObj = &corev1alpha1.Machine{
				ObjectMeta: v1.ObjectMeta{
					Name: uuid,
				},
			}
		} else if err != nil {
			ipxeErrorResponse(w, r, err.Error())
			return
		}

		if nodeObj.Spec.Properties == nil {
			nodeObj.Spec.Properties = []corev1alpha1.MachineProperty{}
		}

		changed := false
		needsDiscovery := false
		queryVars := r.URL.Query()
		properties, err := nodeObj.Properties()
		if err != nil {
			ipxeErrorResponse(w, r, err.Error())
		}

		for key := range ipxeVars {
			currentValue, hasCurrentValue := properties[key]
			queryValues, hasQueryValue := queryVars[key]
			queryValue := ""
			if hasQueryValue && len(queryValues) > 0 {
				queryValue = queryValues[0]
			}

			if !hasCurrentValue && !hasQueryValue {
				needsDiscovery = true
			} else if hasQueryValue && !hasCurrentValue {
				changed = true
				nodeObj.Spec.Properties = append(nodeObj.Spec.Properties, corev1alpha1.MachineProperty{
					Name:  key,
					Value: queryValue,
				})
			} else if hasQueryValue && currentValue != queryValue {
				changed = true
				for k, prop := range nodeObj.Spec.Properties {
					if prop.Name == key {
						nodeObj.Spec.Properties[k].Value = queryValue
						break
					}
				}
			}
		}

		if isNew {
			nodeObj, err = s.client.Create(ctx, nodeObj, v1.CreateOptions{})
			if err != nil {
				ipxeErrorResponse(w, r, err.Error())
				return
			}
		} else if changed {
			nodeObj, err = s.client.Update(ctx, nodeObj, v1.UpdateOptions{})
			if err != nil {
				ipxeErrorResponse(w, r, err.Error())
				return
			}
		}

		successResponse(w, r, IpxeDiscoverTemplate, struct {
			Node           *corev1alpha1.Machine
			NeedsDiscovery bool
		}{
			Node:           nodeObj,
			NeedsDiscovery: needsDiscovery,
		})
	}))

	chain("/boot.ipxe", "/boot.ipxe", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		uuid := r.URL.Query().Get("uuid")
		nodeObj, err := getNode(ctx, uuid)
		if err != nil {
			ipxeErrorResponse(w, r, err.Error())
			return
		}

		if needsDiscovery(nodeObj) {
			successResponse(w, r, IpxeDiscoverTemplate, struct {
				Node           *corev1alpha1.Machine
				NeedsDiscovery bool
			}{
				Node:           nodeObj,
				NeedsDiscovery: true,
			})
			return
		}

		config, err := getNodeRole(nodeObj)
		if err != nil {
			ipxeErrorResponse(w, r, err.Error())
			return
		}

		successResponse(w, r, config.Ipxe.TemplateString(), struct {
			Node   *corev1alpha1.Machine
			Config IpxeConfig
		}{
			Node:   nodeObj,
			Config: config.Ipxe,
		})

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
