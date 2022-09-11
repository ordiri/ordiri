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
	networkLong = templates.LongDesc(i18n.T(`
		Create a namespace with the specified name.`))

	networkExample = templates.Examples(i18n.T(`
	  # Create a new namespace named my-namespace
	  kubectl create namespace my-namespace`))
)

// NewCmdCreateNetwork is a macro command to create a new network
func NewCmdCreateNetwork(f cmdutil.Factory, ioStreams genericclioptions.IOStreams) *cobra.Command {
	cmd := &cobra.Command{
		Use:                   "network NAME [--dry-run=server|client|none]",
		DisableFlagsInUseLine: true,
		Aliases:               []string{"ns"},
		Short:                 i18n.T("Create a network with the specified name"),
		Long:                  networkLong,
		Example:               networkExample,
		RunE: func(cmd *cobra.Command, args []string) error {
			restConfig, err := f.ToRESTConfig()
			if err != nil {
				return err
			}
			tenant := cmd.Flag("namespace").Value.String()
			client := versioned.NewForConfigOrDie(restConfig)
			// o.Client, err = coreclient.NewForConfig(restConfig)

			network := &v1alpha1.Network{
				ObjectMeta: v1.ObjectMeta{
					Name: args[0],
				},
			}

			_, err = client.NetworkV1alpha1().Networks(tenant).Create(cmd.Context(), network, v1.CreateOptions{})
			if err != nil {
				return err
			}

			log.Logger.Info("Created the network ", "network", network)

			return nil
		},
	}

	return cmd
}
