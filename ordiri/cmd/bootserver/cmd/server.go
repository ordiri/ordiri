/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"net/http"
	"time"

	// "github.com/ordiri/ordiri/config"
	"github.com/ordiri/ordiri/log"
	corev1alpha1 "github.com/ordiri/ordiri/pkg/apis/core/v1alpha1"
	clientset "github.com/ordiri/ordiri/pkg/generated/clientset/versioned"
	"github.com/ordiri/ordiri/pkg/generated/informers/externalversions"
	"github.com/ordiri/ordiri/pkg/ipxe"
	"k8s.io/client-go/tools/clientcmd"

	// "k8s.io/client-go/tools/clientcmd"

	// "github.com/ordiri/ordiri/config"
	"github.com/spf13/cobra"
)

var port = "8090"

// serverCmd represents the server command
var serverCmd = &cobra.Command{
	Use:   "server",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		ipxeConfigs := ipxe.IpxeConfigs{
			Roles: map[string]*ipxe.IpxeRole{},
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

		client := clientset.NewForConfigOrDie(restConfig)
		informerFactory := externalversions.NewSharedInformerFactory(client, time.Second*60)
		mp := informerFactory.Core().V1alpha1().MachineProfiles()

		mp.Informer().AddEventHandler(&ipxeConfigWatcher{
			ipxeConfigs: &ipxeConfigs,
		})

		stopCh := make(chan struct{})
		go func() {
			mp.Informer().Run(stopCh)
		}()

		ipxeServer := ipxe.NewServer(client.CoreV1alpha1().Machines(), &ipxeConfigs)

		log.Logger.Info("Starting server")
		err = http.ListenAndServe(":"+port, ipxeServer.HTTPHandler())
		stopCh <- struct{}{}

		if err != nil {
			return err
		}
		return nil
	},
}

type ipxeConfigWatcher struct {
	ipxeConfigs *ipxe.IpxeConfigs
}

func (ich *ipxeConfigWatcher) OnAdd(obj interface{}) {
	mp := obj.(*corev1alpha1.MachineProfile)
	log.Logger.Info("got machine profile onadd", "mp", mp)

	ich.ipxeConfigs.Roles[mp.Name] = &ipxe.IpxeRole{
		Ipxe: ipxe.IpxeConfig{
			Kernel: mp.Spec.IpxeConfiguration.Kernel,
			Initrd: mp.Spec.IpxeConfiguration.Initrd,
			Args:   mp.Spec.IpxeConfiguration.Args,
		},
		Files: mp.Spec.Files,
	}

}
func (ich *ipxeConfigWatcher) OnUpdate(oldObj, newObj interface{}) {
	mp := newObj.(*corev1alpha1.MachineProfile)

	log.Logger.Info("got machine profile onupdate", "mp", mp)

	ich.ipxeConfigs.Roles[mp.Name] = &ipxe.IpxeRole{
		Ipxe: ipxe.IpxeConfig{
			Kernel: mp.Spec.IpxeConfiguration.Kernel,
			Initrd: mp.Spec.IpxeConfiguration.Initrd,
			Args:   mp.Spec.IpxeConfiguration.Args,
		},
		Files: mp.Spec.Files,
	}

}
func (ich *ipxeConfigWatcher) OnDelete(obj interface{}) {
	mp := obj.(*corev1alpha1.MachineProfile)
	log.Logger.Info("got machine profile ondelete", "mp", mp)

	delete(ich.ipxeConfigs.Roles, mp.Name)
}

func init() {
	rootCmd.AddCommand(serverCmd)
}

// func NewProvisionerClient() apiserverv1.ProvisionerClient {
// 	opts := []grpc.DialOption{}
// 	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
// 	opts = append(opts, grpc.WithUnaryInterceptor(otelgrpc.UnaryClientInterceptor()))
// 	opts = append(opts, grpc.WithStreamInterceptor(otelgrpc.StreamClientInterceptor()))

// 	// todo make 55123 a config val
// 	conn, err := grpc.Dial(fmt.Sprintf("127.0.0.1:%d", 55123), opts...)

// 	if err != nil {
// 		panic(fmt.Sprintf("Failed to dial bufnet: %v", err))
// 	}
// 	return apiserverv1.NewProvisionerClient(conn)
// }
