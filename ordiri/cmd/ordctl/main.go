/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package main

import (
	"os"

	ordcreate "github.com/ordiri/ordiri/cmd/ordctl/cmd/create"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	"k8s.io/component-base/cli"
	"k8s.io/kubectl/pkg/cmd"
	"k8s.io/kubectl/pkg/cmd/apply"
	"k8s.io/kubectl/pkg/cmd/create"
	"k8s.io/kubectl/pkg/cmd/describe"
	"k8s.io/kubectl/pkg/cmd/edit"
	"k8s.io/kubectl/pkg/cmd/get"
	"k8s.io/kubectl/pkg/cmd/label"
	"k8s.io/kubectl/pkg/cmd/patch"
	"k8s.io/kubectl/pkg/cmd/util"

	// Import to initialize client auth plugins.
	_ "k8s.io/client-go/plugin/pkg/client/auth"
)

var defaultConfigFlags = genericclioptions.NewConfigFlags(true).WithDeprecatedPasswordFlag().WithDiscoveryBurst(300).WithDiscoveryQPS(50.0)
var streams = genericclioptions.IOStreams{In: os.Stdin, Out: os.Stdout, ErrOut: os.Stderr}

func main() {
	command := cmd.NewDefaultKubectlCommand()

	f := util.NewFactory(defaultConfigFlags)
	command.ResetCommands()

	command.AddCommand(describe.NewCmdDescribe("kubectl", f, streams))
	command.AddCommand(get.NewCmdGet("kubectl", f, streams))
	command.AddCommand(label.NewCmdLabel(f, streams))
	command.AddCommand(apply.NewCmdApply("kubectl", f, streams))
	command.AddCommand(edit.NewCmdEdit(f, streams))

	createCmd := create.NewCmdCreate(f, streams)
	patchCmd := patch.NewCmdPatch(f, streams)

	createCmd.ResetCommands()
	patchCmd.ResetCommands()
	createCmd.AddCommand(ordcreate.NewCmdCreateNetwork(f, streams))
	createCmd.AddCommand(ordcreate.NewCmdCreateSubnet(f, streams))
	createCmd.AddCommand(ordcreate.NewCmdCreateRoute(f, streams))

	command.AddCommand(createCmd)
	command.AddCommand(patchCmd)

	command.SetUsageFunc(nil)
	command.SetUsageTemplate("")

	os.Exit(cli.Run(command))
}
