import { Grid, Paper, Toolbar } from '@mui/material'
import React, { FunctionComponent } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { JSONApiResponse } from '../../gen/src';

type ResultTableHeader = {
    label: string
    selector: string
    formatter?: (arg0: any) => string
}

type ResultTableTableHeaders = Record<string, ResultTableHeader>

interface GenericResourceProps {
    api: any
    title: string
    headers: ResultTableTableHeaders
}

type listerItems = Record<string, any>
type listerResult = { items: listerItems }

interface ResultTableProps {
    lister: (props: {watch: boolean}) => any // Observable<listerResult>
    title: string
    headers: ResultTableTableHeaders
}

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

async function* makeReaderIterator(reader: ReadableStreamDefaultReader<Uint8Array>) {
    const utf8Decoder = new TextDecoder('utf-8');
    let { value: chunk, done: readerDone } = await reader.read();
    var decodedChunk = chunk ? utf8Decoder.decode(chunk) : '';

    const re = /\n|\r|\r\n/gm;
    let startIndex = 0;
    let result;

    for (; ;) {
        let result = re.exec(decodedChunk);
        if (!result) {
            if (readerDone) {
                console.log("done")
                debugger
                break;
            }
            let remainder = decodedChunk.substr(startIndex);
            ({ value: chunk, done: readerDone } = await reader.read());
            decodedChunk = remainder + (decodedChunk ? utf8Decoder.decode(chunk) : '');
            startIndex = re.lastIndex = 0;
            continue;
        }
        yield decodedChunk.substring(startIndex, result.index);
        startIndex = re.lastIndex;
    }
    if (startIndex < decodedChunk.length) {
        // last line didn't end in a newline char
        yield decodedChunk.substr(startIndex);
    }
}



const ResultTable = ({ lister, title, headers }: ResultTableProps) => {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState<listerItems>({});

    React.useEffect(() => {
        async function loadDataAsync() {
            setLoading(true)
            try {
                var res = lister({watch: true})
                console.log("creating lister")
                res.then(async (response: JSONApiResponse<any>) => {
                    for await (let line of makeReaderIterator(response.raw.body!.getReader())) {
                        const obj: { type: "ADDED" | "MODIFIED" | "DELETED", object: any}= JSON.parse(line)
                        console.log(obj);
                        if (obj.type === 'ADDED' || obj.type === 'MODIFIED') {
                            setData((data) => {
                                return { ...data, [obj.object.metadata.uid]: obj.object }
                            })
                        }else if (obj.type === "DELETED") {
                            setData((data) => {
                                delete(data[obj.object.metadata.uid])
                                return { ...data }
                            })
                        }else{
                            console.log(obj)
                            debugger;
                        }
                    }
                })

            } catch (e) {
                console.warn(e);
            } finally {
                setLoading(false)
            }
        }

        loadDataAsync();
    }, [lister]);



    return <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Toolbar>{title}</Toolbar>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Object.entries(headers).map((a) => <TableCell key={a[1].label}>{a[1].label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading && <TableRow>
                        <TableCell colSpan={Math.max(Object.keys(headers).length, 1)}>Loading...</TableCell>    
                    </TableRow>}
                    {!isLoading && Object.keys(data).length > 0 && Object.entries(data).map((row, idx) => (
                        <TableRow
                            key={row[0]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.entries(headers).map((it, idx) => <ResultCell header={it[1]} result={row[1]} />)}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
}


const GenericResourcePage = ({ api, title, headers }: GenericResourceProps) => {
    const proto = Object.getPrototypeOf(api)
    const methods = Object.getOwnPropertyNames(proto)
    // debugger
    const listers = methods.filter(f => {
        return f.match("^list.*Raw$") //&& f.match(".*Raw$")
    })

    return <Grid container spacing={3}>
        {listers.map((lister, idx) => <Grid key={idx} item xs={12}>
            <ResultTable headers={headers} title={`${title} - ${lister.match('V1alpha1(.*?)Raw$')?.[1]}`} lister={proto[lister].bind(api)} />
        </Grid>)}
    </Grid>
}


export default GenericResourcePage