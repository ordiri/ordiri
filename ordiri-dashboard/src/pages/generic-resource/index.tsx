import { Grid, Paper, Toolbar } from '@mui/material'
import React, { useCallback, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useWatch from '../../hooks/watcher';
import { JSONApiResponse } from '@ordiri/client-typescript';

export type ResultTableHeader = {
    label: string
    selector: string
    formatter?: (arg0: any) => JSX.Element
}

export type ResultTableTableHeaders = Record<string, ResultTableHeader>

type listerItems<T = any> = Record<string, T>
type listerResult<T> = { items: listerItems<T> }



const ResultCell = ({ header, result }: { header: ResultTableHeader, result: any }) => {
    var data = ""
    if (header.selector) {
        const parts = header.selector.split('.')
        data = parts.reduce((it, stack) => {
            if (typeof it == "object" && it[stack] ){
                return it[stack]
            }
            return null
        }, result )
    }else{
        data = typeof result == "string" ? result : JSON.stringify(result)
    }
    
    return <TableCell>
        {header.formatter ? header.formatter(data) : data}
    </TableCell>
}



interface ResultTableProps<T> {
    lister: (props: { watch: boolean }) => Promise<JSONApiResponse<T>> // Observable<listerResult>
    title: string
    columns: ResultTableTableHeaders
}

function ResultTable<T>({ lister, title, columns }: ResultTableProps<T>) {
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState<listerItems>({})

    const listerCb = useCallback(() => lister({ watch: true }), [lister])
    const watchData = useWatch(listerCb)
    



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
                    {watchData.loading && <TableRow>
                        <TableCell colSpan={Math.max(Object.keys(columns).length, 1)}>Loading...</TableCell>    
                    </TableRow>}
                    {!watchData.loading && Object.keys(watchData.items).length > 0 && Object.entries(watchData.items).map((row, idx) => (
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

export interface GenericResourceProps {
    api: any
    title: string
    columns: ResultTableTableHeaders
}

function CreateResourcePage<T>() : (props: GenericResourceProps) => JSX.Element {
    return ({ api, title, columns: columns }: GenericResourceProps) => {
        const proto = Object.getPrototypeOf(api)
        const methods = Object.getOwnPropertyNames(proto)
        // debugger
        const listers = methods.filter(f => {
            return f.match("^list.*Raw$") //&& f.match(".*Raw$")
        })

        return <Grid container spacing={3}>
            {listers.map((lister, idx) => <Grid key={idx} item xs={12}>
                <ResultTable<T> columns={columns} title={`${title} - ${lister.match('V1alpha1(.*?)Raw$')?.[1]}`} lister={proto[lister].bind(api)} />
            </Grid>)}
        </Grid>
    }
}

export default CreateResourcePage()