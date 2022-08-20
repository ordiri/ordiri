package metadata

type resolver = func(*VirtualMachineMetadata) (string, bool)

func propertyResolver(field string) resolver {
	return func(m *VirtualMachineMetadata) (string, bool) {
		for prop, val := range m.Properties {
			if prop == field {
				return val, true
			}
		}

		return "", false
	}
}

var resolvers = map[string]resolver{
	"ami-id":            propertyResolver("ami-id"),
	"ami-launch-index":  propertyResolver("ami-launch-index"),
	"ami-manifest-path": propertyResolver("ami-manifest-path"),
	"hostname": func(vmm *VirtualMachineMetadata) (string, bool) {
		return vmm.Name, true
	},
	"instance-action": propertyResolver("instance-action"),
	"instance-id":     propertyResolver("uuid"),
	"instance-type":   propertyResolver("instance-type"),
	"local-hostname": func(vmm *VirtualMachineMetadata) (string, bool) {
		return vmm.Name, true
	},
	"local-ipv4": propertyResolver("ip"),
	"mac":        propertyResolver("mac"),
	"profile":    propertyResolver("profile"),
	"public-hostname": func(vmm *VirtualMachineMetadata) (string, bool) {
		return vmm.Name, true
	}, // Not correct as below
	"public-ipv4":     propertyResolver("ip"), // Not correct, this is only a link-local addr not a public
	"reservation-id":  propertyResolver("reservation-id"),
	"security-groups": propertyResolver("security-groups"),

	"block-device-mapping/": propertyResolver("block-device-mapping"),
	"events/":               propertyResolver("events"),
	"iam/":                  propertyResolver("iam"),
	"metrics/":              propertyResolver("metrics"),
	"network/":              propertyResolver("network"),
	"placement/":            propertyResolver("placement"),
	"public-keys/":          propertyResolver("public-keys"),
	"services/":             propertyResolver("services"),
}
