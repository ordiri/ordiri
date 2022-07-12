package dnsmasq

import (
	"reflect"
	"strings"
)

var MultiOptions = map[string]bool{
	"server":      true,
	"dhcp-option": true,
}

type option func(Config) Config

func WithOption(name string, val interface{}) option {
	return func(c Config) Config {
		switch v := val.(type) {
		case string, []string:
			c[name] = v
		default:
			panic("unknown option type " + reflect.TypeOf(val).String())
		}

		return c
	}

}

func New(opts ...option) Config {
	c := Config{}
	for _, opt := range opts {
		c = opt(c)
	}
	return c
}

type Config map[string]interface{}

func (cfg Config) Configs() []string {
	cfgs := []string{}
	for key, val := range cfg {
		switch v := val.(type) {
		case string:
			if v == "" {
				cfgs = append(cfgs, key)
			} else {
				cfgs = append(cfgs, key+"="+v)
			}
		case []string:
			if MultiOptions[key] {
				for _, sub := range v {
					cfgs = append(cfgs, key+"="+sub)
				}
				break
			}
			if len(v) == 0 {
				cfgs = append(cfgs, key)
			} else {
				cfgs = append(cfgs, key+"="+strings.Join(v, ","))
			}
		}
	}
	return cfgs
}
func (cfg Config) ConfigFile() string {
	cfgs := cfg.Configs()

	return strings.Join(cfgs, "\n")
}

func (cfg Config) Args() []string {
	args := []string{}
	for _, cfg := range cfg.Configs() {
		args = append(args, "--"+cfg)
	}

	return args
}
