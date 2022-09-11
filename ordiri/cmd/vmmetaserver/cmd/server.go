/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import ( // "github.com/ordiri/ordiri/config"
	// "k8s.io/client-go/tools/clientcmd"
	// "github.com/ordiri/ordiri/config"
	"context"
	"fmt"
	"log"
	"net"
	"net/url"

	"net/http"
	"net/http/httputil"

	"github.com/spf13/cobra"
	"inet.af/netaddr"
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
		network, err := cmd.Flags().GetString("network")
		if err != nil {
			return err
		}
		subnet, err := cmd.Flags().GetString("subnet")
		if err != nil {
			return err
		}
		tenant, err := cmd.Flags().GetString("tenant")
		if err != nil {
			return err
		}
		cidrFlag, err := cmd.Flags().GetString("cidr")
		if err != nil {
			return err
		}
		cidr, err := netaddr.ParseIPPrefix(cidrFlag)
		if err != nil {
			return fmt.Errorf("invalid cidr passed - %q - %w", cidrFlag, err)
		}

		proxy.Transport = &http.Transport{
			DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
				return net.Dial("unix", "/run/ordiri/metadata/md-server.sock")
			},
		}

		origDirector := proxy.Director
		proxy.Director = func(r *http.Request) {
			parsedIp, err := netaddr.ParseIPPort(r.RemoteAddr)
			if err != nil {
				return
			}

			// should log and alert heavily here, this would be a huge concern
			if !cidr.Contains(parsedIp.IP()) {
				return
			}
			origDirector(r)
			// spoofQuery := "=" +
			// if r.URL.RawQuery == "" {
			// 	r.URL.RawQuery = spoofQuery
			// } else {
			// 	r.URL.RawQuery = r.URL.RawQuery + "&" + spoofQuery
			// }
			r.Header.Set("X-Ordiri-Network", network)
			r.Header.Set("X-Ordiri-Subnet", subnet)
			r.Header.Set("X-Ordiri-Ip", parsedIp.IP().String())
			r.Header.Set("X-Ordiri-Tenant", tenant)
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

	serverCmd.PersistentFlags().StringP("cidr", "a", "", "which cidr to pre-filter requests by")
	serverCmd.PersistentFlags().StringP("network", "n", "", "which network this is for")
	serverCmd.PersistentFlags().StringP("subnet", "s", "", "which subnet this is for")
	serverCmd.PersistentFlags().StringP("tenant", "t", "", "which tenant this is for")

}
