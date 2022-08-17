import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Popover, TextField, Toolbar, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useWatch from '../hooks/use-watch';
import { ApiResponse } from '@ordiri/client-typescript';
import { Lister } from '../pages/generic-resource';
import GenericForm, { NodeForm } from './generic-form';

export type ResultTableHeader = {
    label: string
    selector: string
    formatter?: (arg0: any) => JSX.Element | undefined
}

export type ResultTableHeaders = Record<string, ResultTableHeader>

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
        data = header.formatter || typeof result == "string" ? result : JSON.stringify(result)
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
export const AddNewPopover = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create</DialogTitle>
                <NodeForm data={{}} />
            </Dialog>
        </>
    );
}

export function ResultTable<T>({ lister, title, columns }: ResultTableProps<T>) {
    const listerCb = useCallback(() => lister({ watch: true }), [lister])
    const watchData = useWatch(listerCb)

    const showLoadingBar = watchData.loading
    const showErrorBar = !showLoadingBar && watchData.error !== ""
    const showNoResultBar = !showLoadingBar && !showErrorBar && Object.keys(watchData.items).length === 0
    const showResults = !showLoadingBar && !showErrorBar && Object.keys(watchData.items).length > 0

    return <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Toolbar>{title}</Toolbar>
        {/* todo: add back this form */}
        {false && <AddNewPopover />}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.entries(columns).map(([key, val]) => <TableCell key={key}>{val.label}</TableCell>)}
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
                    {showResults && Object.entries(watchData.items).map(([uid, row]) => (
                        <TableRow
                            key={uid}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.entries(columns).map(([key, val]) => <ResultCell key={key} header={val} result={row} />)}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}
