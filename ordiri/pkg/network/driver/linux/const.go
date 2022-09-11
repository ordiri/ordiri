package linux

const (
	NetworkServicesNamespacePrefix = "ordiri-services-"
	NetworkRouterNamespacePrefix   = "ordiri-router-"
)
const (
	VethSuffixNamespace = "-in"
	VethSuffixRoot      = "-out"
)

const confDir = "/run/ordiri"

const IfaceHashSize = 5
