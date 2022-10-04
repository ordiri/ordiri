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
                hosts: {
                    label: "Hosts",
                    selector: "status.hosts",
                    formatter: (hosts?: Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostSubnetStatus>) => {
                        if (!hosts) {
                            return "N/A"
                        }
                        const grouped = hosts.reduce((all, it) => {
                            const key = it.node
                            if(!all[key]) {
                                all[key] = { node: it.node , items: []}
                            }
                            all[key].items.push(it.node)
                            
                            return all
                        }, {} as Record<string, {node: string, items: string[]}>)
                        
                        return Object.entries(hosts).map(([_, { node }]) => <Chip  key={node} label={`${node}}`} size="small" />)
                    }
                }
            }
        },
    })

    return <Page title={PageTitle} />
}


export default NetworkResourcesPage