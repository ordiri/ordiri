package sdn

import "github.com/ordiri/ordiri/pkg/iptables"

func Iptables(ns string) (*iptables.IPTables, error) {
	return iptables.New(
		iptables.Command(func(args []string) []string {
			return append([]string{"ip", "netns", "exec", ns}, args...)
		}),
		iptables.Debug(true),
		iptables.Sudo(true),
	)
}
