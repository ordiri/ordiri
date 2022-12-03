import ordiriConfig from '../../ordiri-config';
import { CreateResourcePage } from '../generic-resource';
import { ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus, ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostSubnetStatus, NetworkOrdiriComV1alpha1Api } from '@ordiri/client-typescript';
import { Chip } from '@mui/material';

const PageTitle = "Network Services"

interface NetworkResourceProps { }

const vlanColors: Array<any> = [
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success"
]

const NetworkResourcesPage = (props: NetworkResourceProps) => {
    const api = new NetworkOrdiriComV1alpha1Api(ordiriConfig)

    // pretty bad, creates a whole new on every render
    const Page = CreateResourcePage({
        "Networks": {
            lister: api.listNetworkOrdiriComV1alpha1NetworkForAllNamespacesRaw.bind(api),
            columns: {
                name: {
                    label: "Name",
                    selector: "metadata.name",
                },
                segment: {
                    label: "Segment",
                    selector: "status.vni",
                },
                hosts: {
                    label: "Hosts",
                    selector: "status.hosts",
                    formatter: (hosts?: Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus>) => {
                        if (!hosts) {
                            return "N/A"
                        }
                        return hosts.map(it => <Chip key={it.node} label={it.node} size="small" />)
                    }
                }
            }
        },
        "Subnets": {
            lister: api.listNetworkOrdiriComV1alpha1SubnetForAllNamespacesRaw.bind(api),
            columns: {
                name: {
                    label: "Name",
                    selector: "metadata.name",
                },
                network: {
                    label: "Network",
                    selector: "spec.network.name",
                },
                mac: {
                    label: "Mac",
                    selector: "spec.router.mac",
                },
                hosts: {
                    label: "Hosts",
                    selector: "status.hosts",
                    formatter: (hosts?: Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostSubnetStatus>) => {
                        if (!hosts) {
                            return "N/A"
                        }
                        
                        return Object.entries(hosts).map(([_, { node, router }]) => <>
                            <Chip  key={node} label={`${node} - ${router.mac}`} size="small" />
                        </>)
                    }
                }
            }
        },
    })

    return <Page title={PageTitle} />
}


export default NetworkResourcesPage