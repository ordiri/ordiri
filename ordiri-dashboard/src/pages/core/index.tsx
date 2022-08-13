import React from 'react'
import GenericResourcePage, { GenericResourceProps } from '../generic-resource';


interface CoreResourceProps extends GenericResourceProps {
}

const CoreResourcesPage = ({ api, title, headers }: CoreResourceProps) => {
    const proto = Object.getPrototypeOf(api)
    const methods = Object.getOwnPropertyNames(proto)
    // debugger
    const listers = methods.filter(f => {
        return f.match("^list.*Raw$") //&& f.match(".*Raw$")
    })

    return <GenericResourcePage headers={headers} title={title} api={api} />
}


export default CoreResourcesPage