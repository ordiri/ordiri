package create

import (
	"github.com/ordiri/ordiri/log"
	"github.com/ordiri/ordiri/pkg/apis/network/v1alpha1"
	"github.com/ordiri/ordiri/pkg/generated/clientset/versioned"
	"github.com/spf13/cobra"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/cli-runtime/pkg/genericclioptions"
	cmdutil "k8s.io/kubectl/pkg/cmd/util"
	"k8s.io/kubectl/pkg/util/i18n"
	"k8s.io/kubectl/pkg/util/templates"
)

var (
	routeLong = templates.LongDesc(i18n.T(`
		Create a namespace with the specified name.`))

	routeExample = templates.Examples(i18n.T(`
	  # Create a new namespace named my-namespace
	  kubectl create namespace my-namespace`))
)

// NewCmdCreateRoute is a macro command to create a new route
func NewCmdCreateRoute(f cmdutil.Factory, ioStreams genericclioptions.IOStreams) *cobra.Command {
	cmd := &cobra.Command{
		Use:                   "route NAME [--dry-run=server|client|none]",
		DisableFlagsInUseLine: true,
		Short:                 i18n.T("Create a route with the specified name"),
		Long:                  routeLong,
		Example:               routeExample,
		RunE: func(cmd *cobra.Command, args []string) error {
			restConfig, err := f.ToRESTConfig()
			if err != nil {
				return err
			}
			client := versioned.NewForConfigOrDie(restConfig)
			// o.Client, err = coreclient.NewForConfig(restConfig)

			route := &v1alpha1.Route{
				ObjectMeta: v1.ObjectMeta{
					Name: args[0],
				},
			}

			tenant := cmd.Flag("namespace").Value.String()
			_, err = client.NetworkV1alpha1().Routes(tenant).Create(cmd.Context(), route, v1.CreateOptions{})
			if err != nil {
				return err
			}

			log.Logger.Info("Created the route", "route", route)

			return nil
		},
	}

	return cmd
}
