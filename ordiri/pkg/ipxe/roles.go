package ipxe

type IpxeConfig struct {
	Kernel   string   `yaml:"kernel"`
	Initrd   []string `yaml:"initrd"`
	Args     []string `yaml:"args"`
	Template string   `yaml:"template"`
}

type IpxeRole struct {
	Ipxe  IpxeConfig        `yaml:"ipxe"`
	Files map[string]string `yaml:"files"`
}

type IpxeConfigs struct {
	Roles map[string]*IpxeRole `yaml:"roles"`
}

func (config *IpxeConfig) TemplateString() string {
	if config.Template != "" {
		return config.Template
	}

	return IpxeBootTemplate
}
