import { Chip, Grid, Paper, Toolbar } from '@mui/material'
import React, { useCallback, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useWatch from '../../hooks/watcher';
import { ComGithubOrdiriOrdiriPkgApisCoreV1alpha1NodeStatus, ApiResponse } from '@ordiri/client-typescript';

export type ResultTableHeader = {
    label: string
    selector: string
    formatter?: (arg0: any) => JSX.Element
}

export type ResultTableHeaders = Record<string, ResultTableHeader>

type listerItems<T = any> = Record<string, T>
type listerResult<T> = { items: listerItems<T> }
export type Lister<T> = (props: { watch: boolean }) => Promise<ApiResponse<T>>
export interface ResourceBox<T> {
    lister: Lister<T>
    columns: ResultTableHeaders
}
export type ResourceBoxes<T> = Record<string, ResourceBox<T>>


const ResultCell = ({ header, result }: { header: ResultTableHeader, result: any }) => {
    var data = ""
    if (header.selector) {
        const parts = header.selector.split('.')
        data = parts.reduce((it, stack) => {
            if (typeof it == "object" && it[stack]) {
                return it[stack]
            }
            return null
        }, result)
    } else {
        data = typeof result == "string" ? result : JSON.stringify(result)
    }

    return <TableCell>
        {header.formatter ? header.formatter(data) : data}
    </TableCell>
}



interface ResultTableProps<T> {
    lister: Lister<T> // Observable<listerResult>
    title: string
    columns: ResultTableHeaders
}

function ResultTable<T>({ lister, title, columns }: ResultTableProps<T>) {
    const listerCb = useCallback(() => lister({ watch: true }), [lister])
    const watchData = useWatch(listerCb)

    const showLoadingBar = watchData.loading
    const showErrorBar = !showLoadingBar && watchData.error !== ""
    const showNoResultBar = !showLoadingBar && !showErrorBar && Object.keys(watchData.items).length === 0
    const showResults = !showLoadingBar && !showErrorBar && Object.keys(watchData.items).length > 0

    return <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Toolbar>{title}</Toolbar>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.entries(columns).map((a) => <TableCell key={a[1].label}>{a[1].label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showLoadingBar && <TableRow>
                        <TableCell colSpan={Math.max(Object.keys(columns).length, 1)}>Loading...</TableCell>
                    </TableRow>}
                    {showNoResultBar && <TableRow>
                        <TableCell colSpan={Math.max(Object.keys(columns).length, 1)}>No data</TableCell>
                    </TableRow>}
                    {showErrorBar && <TableRow>
                        <TableCell colSpan={Math.max(Object.keys(columns).length, 1)}>Error fetching objects - {watchData.error}</TableCell>
                    </TableRow>}
                    {showResults && Object.entries(watchData.items).map((row, idx) => (
                        <TableRow
                            key={row[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.entries(columns).map((it, idx) => <ResultCell header={it[1]} result={row[1]} />)}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}

export interface ResourcePageProps {
    title: string
}

export function CreateResourcePage<T>(listers: ResourceBoxes<T>) {
    return ({ title }: ResourcePageProps) => {
        return <Grid container spacing={3}>
            {Object.entries(listers).map(([name, lister]) => <Grid key={name} item xs={12}>
                <ResultTable<T> columns={lister.columns} title={`${title} - ${name}`} lister={lister.lister} />
            </Grid>)}
        </Grid>
    }
}

export interface GenericResourceProps {
    api: any
    title: string
    columns: ResultTableHeaders
}

export default function GenericResourcePage<T>({ api, title, columns }: GenericResourceProps) {
    const proto = Object.getPrototypeOf(api)
    const methods = Object.getOwnPropertyNames(proto)
    // debugger
    const listerMethods = methods.reduce((listers, it) => {
        if (!it.match("^list.*Raw$")) {
            return listers
        }

        return {
            ...listers,
            [it]: {
                lister: proto[it].bind(api),
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
            }
        }
    }, {} as ResourceBoxes<T>)

    const Page = CreateResourcePage<T>(listerMethods)

    return <Page title={title} />
}