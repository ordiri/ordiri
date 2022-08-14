import { Chip } from '@mui/material';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1Node, ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus, CoreOrdiriComV1alpha1Api } from '@ordiri/client-typescript';
import ordiriConfig from '../../ordiri-config';
import { CreateResourcePage } from '../generic-resource';
import IconApproved from "@mui/icons-material/Check"
import IconRejected from "@mui/icons-material/Cancel"

const PageTitle = "Core Services"

interface CoreResourceProps { }

const CoreResourcesPage = () => {
    const api = new CoreOrdiriComV1alpha1Api(ordiriConfig)

    const Page = CreateResourcePage({
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
                                    networks: {res.networks.map(it => <Chip size='small' key={it.name} label={it.name} />)}
                                </div>
                                <div>
                                    VMs: {res.virtualMachines.map(it => <Chip size='small' key={it.name} label={it.name} />)}
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
            columns: {
                name: {
                    selector: "metadata.name",
                    label: "Name"
                },
                role: {
                    selector: "spec.role",
                    label: "Role"
                },
                approved: {
                    selector: "spec.approved",
                    label: "Approved",
                    formatter: (approved: boolean) => {
                        if (approved == true) {
                            return <IconApproved />
                        }else{
                            return <IconRejected />
                        }
                    }
                },
                properties: {
                    selector: "spec.properties",
                    label: "Properties",
                    formatter: (arg: any) => {
                        return arg.map((property: {name: string, value: any}) => {
                            return <span key={property.value}>{property.name}: {JSON.stringify(property.value)}</span>
                        })
                    }
                }
            }
        }
    })

    return <Page title={PageTitle} />
}


export default CoreResourcesPage