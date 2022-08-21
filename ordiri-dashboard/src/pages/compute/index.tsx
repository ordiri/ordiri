import { ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine, ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterface, ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolume, ComputeOrdiriComV1alpha1Api } from '@ordiri/client-typescript';
import ordiriConfig from '../../ordiri-config';
import { CreateResourcePage } from '../generic-resource';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { VncScreen } from 'react-vnc';
import { useState } from 'react';

const PageTitle = "Compute Services"

interface ComputeResourceProps { }

export const VncDialogLauncher = ({ host, port, name }: { host: string, name: string, port:number}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button onClick={handleClickOpen}>
                Launch
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xl'}>
                <DialogTitle>Console for {name}</DialogTitle>
                <DialogContent>
                    <VncScreen
                        url={`ws://${host}:${port}`}
                        scaleViewport
                        background="#000000"
                        rfbOptions={{
                            credentials: {
                                password: "password"
                            }
                        }}
                        style={{
                            width: '100%',
                            height: '70vh',
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

declare global {
    interface Window {
        api: ComputeOrdiriComV1alpha1Api;
    }
}
const ComputeResourcesPage = (props: ComputeResourceProps) => {
    const api = new ComputeOrdiriComV1alpha1Api(ordiriConfig)

    window.api = api

    // todo the type here is clearly done at 4am, it should be inferred from the listers return values
    const Page = CreateResourcePage({
        "Virtual Machines": {
            lister: api.listComputeOrdiriComV1alpha1VirtualMachineRaw.bind(api),
            columns: {
                name: {
                    label: "Name",
                    selector: "metadata.name",
                }, node: {
                    label: "Node",
                    selector: "spec.node",
                }, nws: {
                    label: "Networks",
                    selector: "spec.networkInterfaces",
                    formatter: (res: Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineNetworkInterface>) => {
                        if (!Array.isArray(res)) {
                            return
                        }

                        return <>
                            {res.map(it => {
                                return <div>{it.network}/{it.subnet}@{it.mac} - {it.ip?.join(", ")}</div>
                            })}
                        </>
                    }
                }, vols: {
                    label: "Volumes",
                    selector: "spec.volumes",
                    formatter: (res: Array<ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachineVolume>) => {
                        if (!Array.isArray(res)) {
                            return
                        }

                        return <>
                        {res.map(it => {
                            return <div>{it.name}/{it.device}/{it.hostLocal?.size}</div>
                        })}
                        </>
                    }
                }, vnc: {
                    label: "Console",
                    formatter: (obj: ComGithubOrdiriOrdiriPkgApisComputeV1alpha1VirtualMachine) => {
                        if (obj.spec == null || obj.status == null) {
                            return "Pending"
                        }

                        const host = obj.spec.node
                        const port = (obj.status as { vncPort: number | undefined }).vncPort
                        if (!port || port <= 0) {
                            return "Pending"
                        }
                        var url = ""
                        if (host === "debian") {
                            url = "10.0.1.110"
                        } else if (host === "mothership") {
                            url = "10.0.2.118"
                        }

                        return <>
                            <VncDialogLauncher name={obj.metadata?.name || "N/A"} host={url} port={port!} />
                        </>
                    }
                }
            }
        }
    })

    return <Page title={PageTitle} />
}


export default ComputeResourcesPage