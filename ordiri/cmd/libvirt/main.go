/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package main

import (
	"context"
	"errors"

	"github.com/davecgh/go-spew/spew"
	"github.com/digitalocean/go-libvirt"
	"github.com/google/uuid"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	clientset "github.com/ordiri/ordiri/pkg/generated/clientset/versioned"
	internallibvirt "github.com/ordiri/ordiri/pkg/libvirt"
	"github.com/spf13/cobra"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/tools/clientcmd"
)

// testCmd represents the test command
var testCmd = &cobra.Command{
	Use:   "test",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		provisioner := internallibvirt.New("10.0.2.118")
		domains, _, err := provisioner.ConnectListAllDomains(1, 0)
		if err != nil {
			return err
		}
		for _, domain := range domains {
			spew.Dump(domain)
		}
		networks, _, err := provisioner.ConnectListAllNetworks(1, 0)
		if err != nil {
			return err
		}

		for _, network := range networks {
			spew.Dump(network)
		}

		pools, count, err := provisioner.ConnectListAllStoragePools(1, 0)
		if err != nil {
			return err
		}
		if count == 0 {
			return errors.New("missing storage pool")
		}
		pool := pools[0]

		volume, err := internallibvirt.NewVolume("created-by-golang",
			internallibvirt.WithSize(10),
		)
		if err != nil {
			return err
		}

		volumeStr, err := volume.Marshal()
		if err != nil {
			return err
		}

		vol, err := provisioner.StorageVolCreateXML(pool, volumeStr, 0)
		if err != nil {
			return err
		}
		spew.Dump(vol)

		domain, err := internallibvirt.NewDomain("created-by-golang",
			internallibvirt.WithBootDevice("hd", "network"),
			internallibvirt.WithConsole(0, "serial"),
			internallibvirt.WithBridge("vmmgmt", "vmwan"),
			internallibvirt.WithBiosOemString("oemstr1", "oemstr2"),
			internallibvirt.WithPoolVolume(vol.Pool, vol.Name),
		)
		domain.Description = "Created by the golang scheduler"

		if err != nil {
			return err
		}

		domainStr, err := domain.Marshal()
		if err != nil {
			return err
		}

		dom, err := provisioner.DomainCreateXML(domainStr, libvirt.DomainNone)
		if err != nil {
			return err
		}
		spew.Dump(dom)
		domainUuid, err := uuid.FromBytes(dom.UUID[:])
		if err != nil {
			return err
		}

		loadingRules := clientcmd.NewDefaultClientConfigLoadingRules()
		// if you want to change the loading rules (which files in which order), you can do so here

		configOverrides := &clientcmd.ConfigOverrides{}
		// if you want to change override values or bind them to flags, there are methods to help you

		kubeConfig := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(loadingRules, configOverrides)
		restConfig, err := kubeConfig.ClientConfig()
		if err != nil {
			return err
		}

		// config, err := rest.InClusterConfig()
		// if err != nil {
		// 	return err
		// }

		client := clientset.NewForConfigOrDie(restConfig)
		// config.LoadAndWatch("ipxe-config.yaml", "ipxe-config", func(v *viper.Viper, e fsnotify.Event) {
		// 	if err := v.Unmarshal(&ipxeConfigs); err != nil {
		// 		panic(err.Error())
		// 	}
		// })

		ctx := context.Background()
		approvedState := true
		obj := &corev1alpha1.Machine{
			ObjectMeta: metav1.ObjectMeta{
				Name: domainUuid.String(),
			},
			Spec: corev1alpha1.MachineSpec{
				Role:     "physical",
				Approved: &approvedState,
			},
		}
		if err != nil {
			return err
		}
		res, err := client.CoreV1alpha1().Machines().Create(ctx, obj, metav1.CreateOptions{})
		if err != nil {
			return err
		}

		spew.Dump(res)

		return nil
	},
}

func main() {
	testCmd.Execute()
}
