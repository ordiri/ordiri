/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import ( // "github.com/ordiri/ordiri/config"
	// "k8s.io/client-go/tools/clientcmd"
	// "github.com/ordiri/ordiri/config"
	"context"
	"log"
	"net"
	"net/url"

	"net/http"
	"net/http/httputil"

	"github.com/spf13/cobra"
)

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
		proxy := httputil.NewSingleHostReverseProxy(&url.URL{
			Host:   "metadataserver",
			Scheme: "http",
		})
		proxy.Transport = &http.Transport{
			DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
				return net.Dial("unix", "/run/ordiri/metadata/md-server.sock")
			},
		}

		log.Println("Starting proxy server on", ":80")
		if err := http.ListenAndServe(":80", proxy); err != nil {
			log.Fatal("ListenAndServe:", err)
		}

		return nil
	},
}

func init() {
	rootCmd.AddCommand(serverCmd)

	serverCmd.PersistentFlags().StringP("network", "n", "", "which network")
	serverCmd.PersistentFlags().StringP("subnet", "s", "", "which subnet to watch")

}
