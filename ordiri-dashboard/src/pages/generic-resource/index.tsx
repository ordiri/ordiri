import { Grid, Paper, Toolbar } from '@mui/material'
import React, { FunctionComponent } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { json } from 'stream/consumers';

interface GenericResourceProps {
    api: any
    title: string
}

type listerItems = [any]
type listerResult = { items: listerItems }

interface ResultTableProps {
    lister: () => Promise<listerResult>
    title: string
}

const ResultCell = ({header, result}: {header: string, result: any}) => {
    if (header == "metadata") {
        return result['name']
    }
    return <TableCell>
        {header} - {JSON.stringify(result)}
    </TableCell>
}

const ResultTable = ({ lister, title }: ResultTableProps) => {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<listerItems | null>(null);

    React.useEffect(() => {
        async function loadDataAsync() {
            setLoading(true)
            try {
                const res = await lister()
                setData(res.items);
            } catch (e) {
                console.warn(e);
            } finally {
                setLoading(false)
            }
        }

        loadDataAsync();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (data == null){
        return <div>error loading data...</div>
    }

    var headers: Array<string> = []
    if (data.length > 0) {
        headers = Object.entries(data[0]).reduce((prev, cur) => {
            prev.push(cur[0])

            return prev
        }, headers)
    }
    
return <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <Toolbar>{title}</Toolbar>
<TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                    {headers.map(it => <TableCell>{it}</TableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
                {data.map((row, idx) => (
                <TableRow
                    key={idx}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                        {headers.map((it, idx) => <ResultCell header={headers[idx]}  result={row[it]} />)}
                    
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
</Paper>}


export default ({api, title }: GenericResourceProps) => {
    const proto = Object.getPrototypeOf(api)
    const methods = Object.getOwnPropertyNames(proto)
    // debugger
    const listers = methods.filter(f => {
        return f.match("^list.*$")
    })

    return <Grid container spacing={3}>
        {listers.map((lister, idx) => <Grid key={idx} item xs={12}>
            <ResultTable title={`${title} - ${lister.match('V1alpha1(.*?)$')?.[0]}`} lister={proto[lister].bind(api)} />
        </Grid>)}
    </Grid>
}

