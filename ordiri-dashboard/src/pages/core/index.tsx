import { Chip } from '@mui/material';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node, ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus, CoreOrdiriComV1alpha1Api } from '@ordiri/client-typescript';
import ordiriConfig from '../../ordiri-config';
import { CreateResourcePage } from '../generic-resource';

const PageTitle = "Core Services"

interface CoreResourceProps { }

const CoreResourcesPage = () => {
    const api = new CoreOrdiriComV1alpha1Api(ordiriConfig)

    const Page = CreateResourcePage<ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node>({
        "Nodes": {
            lister: api.listCoreOrdiriComV1alpha1NodeRaw.bind(api),
            columns: {
                name: {
                    label: "Name",
                    selector: "metadata.name",
                }, hosts: {
                    label: "Hosts",
                    selector: "status",
                    formatter: (res: ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus) => {
                        if (res.networks) {
                            return <>
                                <div>
                                    networks: {res.networks.map(it => <Chip label={it.name} />)}
                                </div>
                                <div>
                                    VMs: {res.virtualMachines.map(it => <Chip label={it.name} />)}
                                </div>
                            </>
                        }
                        return <span>Empty</span>
                    }
                }
            }
        },
        "Machines": {
            lister: api.listCoreOrdiriComV1alpha1MachineRaw.bind(api),
            columns: {}
        }
    })

    return <Page title={PageTitle} />
}


export default CoreResourcesPage