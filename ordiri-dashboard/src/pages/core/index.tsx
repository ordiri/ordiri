import { Chip } from '@mui/material';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus, CoreOrdiriComV1alpha1Api } from '@ordiri/client-typescript';
import ordiriConfig from '../../ordiri-config';
import GenericResourcePage, { ResultTableTableHeaders } from '../generic-resource';

const PageTitle = "Core Services"

interface CoreResourceProps {}

const CoreResourcesPage = ({  }: CoreResourceProps) => {
    const api = new CoreOrdiriComV1alpha1Api(ordiriConfig)
    const proto = Object.getPrototypeOf(api)
    const methods = Object.getOwnPropertyNames(proto)
    // debugger
    const listers = methods.filter(f => {
        return f.match("^list.*Raw$") //&& f.match(".*Raw$")
    })
    console.log("did get called on the custom page")
    const headers: ResultTableTableHeaders = {
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

    return <GenericResourcePage columns={headers} title={PageTitle} api={api} />
}


export default CoreResourcesPage