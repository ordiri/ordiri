import { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3'
import data from './assets/test.json'



type endpointRelation = {
  sourceID: string
  sourceIp: string
  sourcePort: number
  targetID: string
  targetIp: string
  targetPort: number
}

type endpoint = {
  id: string
  name: string
  machine: string
  interface: string
  sources?: endpointRelation[] | null
  targets?: endpointRelation[] | null
}
type graphEndpoint = endpoint & d3.SimulationNodeDatum
type graphLink = d3.SimulationLinkDatum<graphEndpoint>
export type GraphProps = {
  endpoints: endpoint[]
}
export function Graph({ endpoints }: GraphProps) {
  const [simulation] = useState<d3.Simulation<graphEndpoint, graphLink>>(d3.forceSimulation())
  const [graphEndpoints, setGraphEndpoints] = useState<graphEndpoint[]>([]);
  const [, setTick] = useState(0)

  const setEndpoints = (eps: graphEndpoint[]) => {
    setGraphEndpoints(eps.filter(it => {
      // if (it.id === "ff:ff:ff:ff:ff:ff") {
      //   return false
      // }
      return true
    }))
  }

  useEffect(() => {
    const eps = JSON.parse(JSON.stringify(endpoints)) as graphEndpoint[]
    setEndpoints(eps)
  }, [endpoints, simulation])


  useEffect(() => {
    simulation
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(250, 100))
      .on('end', () => {
        setTick(0)
      })
      .on('tick', () => {
        setTick((tick) => tick + 1)
      })
      .stop()
  }, [simulation])


  const endpointById = useMemo(() => {
    return graphEndpoints.reduce((acc, cur) => {
      acc[cur.id] = cur
      return acc
    }, {} as Record<string, endpoint>)
  }, [graphEndpoints])

  const links = useMemo(() => {
    return graphEndpoints.reduce((acc, cur) => {
      if (cur.sources) {
        acc.push(...cur.sources.map(it => ({ source: endpointById[it.sourceID]!, target: endpointById[it.targetID]! })))
      }
      return acc
    }, [] as graphLink[])
  }, [graphEndpoints, endpointById])


  useEffect(() => {
    if (simulation.nodes().length === 0) {
      return
    }

    simulation
      .force('links', d3.forceLink(links).distance(10))

  }, [links, simulation, graphEndpoints])

  useEffect(() => {
    simulation.nodes(graphEndpoints).restart()
  }, [graphEndpoints, simulation])


  return (
    <svg viewBox={`-200 -400 1000 1000`} style={{ height: '100vh', width: '100vw' }}>
      <g>
        {links.map((link) => {
          const source = link.source as graphEndpoint
          const target = link.target as graphEndpoint
          if (!source || !target) {
            return null;
          }
          const line = d3.line()([[source.x || 0, source.y || 0], [target.x || 0, target.y || 0]])

          return <path stroke="red" d={line || ""} />
        })}
      </g>
      <g>
        {graphEndpoints.map((endpoint) => {
          return <g key={endpoint.id} transform={`translate(${endpoint.x || 0} ${endpoint.y || 0})`}>
            <text x="0" y="0" style={{ fontSize: '0.4rem' }}>
              {endpoint.id} - {endpoint.machine} - {endpoint.interface}
            </text>
            <circle r="3" stroke="green" strokeWidth="4" fill="yellow" />
          </g>
        })}
      </g>
    </svg>
  )

}
export default function Flow() {
  const [endpoints, setEndpoints] = useState<endpoint[]>(data);
  const [dirty, setDirty] = useState(!!data)
  const delay = 5000



  // Set up the interval.
  useEffect(() => {
    if (data) {
      return
    }
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => setDirty(true), delay)

    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!dirty) {
      return
    }
    const ac = new AbortController()

    fetch("https://localhost:8096/api", {
      signal: ac.signal,
      method: "GET",
    })
      .then(r => r.json())
      .then((r: endpoint[]) => {
        setEndpoints(r)

        return r
      })
      .then(r => console.log(r))
      .catch(e => console.error(e))
      .finally(() => setDirty(false))

    return () => ac.abort()
  }, [dirty])
  return <div style={{ height: 500, width: 500 }}>
    <Graph endpoints={endpoints} />
  </div>
}