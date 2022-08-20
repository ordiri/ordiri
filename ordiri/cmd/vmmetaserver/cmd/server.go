/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import ( // "github.com/ordiri/ordiri/config"
	// "k8s.io/client-go/tools/clientcmd"
	// "github.com/ordiri/ordiri/config"
	"github.com/spf13/cobra"
)

var port = "9090"

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
		// loadingRules := clientcmd.NewDefaultClientConfigLoadingRules()
		// // if you want to change the loading rules (which files in which order), you can do so here

		// configOverrides := &clientcmd.ConfigOverrides{}
		// // if you want to change override values or bind them to flags, there are methods to help you

		// kubeConfig := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(loadingRules, configOverrides)
		// restConfig, err := kubeConfig.ClientConfig()
		// if err != nil {
		// 	return err
		// }

		// client := clientset.NewForConfigOrDie(restConfig)

		// stopCh := make(chan struct{})

		// conn, err := net.Listen("unix", "/run/ordlet/metadata.sock")
		// if err != nil {
		// 	return err
		// }

		// log.Logger.Info("Starting server")
		// err = http.Serve(conn, metadataServer.HTTPHandler())
		// stopCh <- struct{}{}

		// if err != nil {
		// 	return err
		// }
		// return nil
		return nil
	},
}

func init() {
	rootCmd.AddCommand(serverCmd)

	serverCmd.PersistentFlags().StringP("network", "n", "", "which network")
	serverCmd.PersistentFlags().StringP("subnet", "s", "", "which subnet to watch")

}
