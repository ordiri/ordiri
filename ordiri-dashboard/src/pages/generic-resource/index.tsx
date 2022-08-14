import { Grid } from '@mui/material'
import { ApiResponse } from '@ordiri/client-typescript'
import { ResultTable, ResultTableHeaders } from '../../components/generic-table'

export type Lister<T> = (props: { watch: boolean }) => Promise<ApiResponse<T>>
export interface ResourceBox<T> {
    lister: Lister<T>
    columns: ResultTableHeaders
}
export type ResourceBoxes<T> = Record<string, ResourceBox<T>>


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
                columns
            }
        }
    }, {} as ResourceBoxes<T>)

    const Page = CreateResourcePage<T>(listerMethods)

    return <Page title={title} />
}