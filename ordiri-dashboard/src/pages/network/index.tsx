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
            lister: api.listNetworkOrdiriComV1alpha1NetworkRaw.bind(api),
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
                    formatter: (hosts: Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostNetworkStatus>) => {
                        return hosts.map(it => <Chip key={it.node} label={it.node} size="small" />)
                    }
                }
            }
        },
        "Subnets": {
            lister: api.listNetworkOrdiriComV1alpha1SubnetRaw.bind(api),
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
                    formatter: (hosts: Array<ComGithubOrdiriOrdiriPkgApisNetworkV1alpha1HostSubnetStatus>) => {
                        const grouped = hosts.reduce((all, it) => {
                            const key = it.vlanId
                            if(!all[key]) {
                                all[key] = { vlan: it.vlanId , items: []}
                            }
                            all[key].items.push(it.node)
                            
                            return all
                        }, {} as Record<number, {vlan: number, items: string[]}>)
                        
                        return Object.entries(grouped).map(([vlanId, { items }]) => <Chip color={vlanColors[Number(vlanId)]} key={vlanId} label={`${vlanId} - ${items.join(", ")}`} size="small" />)
                    }
                }
            }
        },
    })

    return <Page title={PageTitle} />
}


export default NetworkResourcesPage