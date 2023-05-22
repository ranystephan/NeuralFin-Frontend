
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Skeleton } from "./skeleton";


interface SectorAllocation {
  name: string;
  value: number;
}

const skeletonData = [
  { name: 'Technology', value: 0.6 },
  { name: 'Healthcare', value: 0.3 },
  { name: 'Financials', value: 0.1 },
]

const XAxisSkeleton = () => {
  return <div className="h-2 w-10 bg-gray-400 animate-pulse"></div>;
};

export function Overview() {
  const [sectorAlloc, setSectorAlloc] = useState<SectorAllocation[]>([])

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    }, [])

  const fetchData = async (abortController: AbortController) => {
    try {
      const response = await fetch("https://neuralfin-backend-production.up.railway.app/api/portfolio/portfolio-metrics/", {
        credentials: 'include',
        signal: abortController.signal,
      })
      const data = await response.json()

      if (Object.keys(data).length === 0) {
        console.log('No portfolio metrics found')
        return
      } else {
        console.log('Portfolio metrics found')

        // Transform data.sector_allocation into an array of objects
        const transformedData = Object.keys(data.sector_allocation).map(key => {
          return {
            name: key,
            value: data.sector_allocation[key]
          }
        })
        setSectorAlloc(transformedData)
        console.log(transformedData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (Array.isArray(sectorAlloc) && sectorAlloc.length === 0) {
    return     <ResponsiveContainer width="100%" height={350}>
      <BarChart data={skeletonData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={0} // show all ticks
          tick={<XAxisSkeleton />} // use custom skeleton component for x-axis

        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value * 100).toFixed(2)}%`}
        />
        <Bar className="animate-pulse" dataKey="value" fill="#CBD5E0" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  }


  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={sectorAlloc}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={0} // show all ticks
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value * 100).toFixed(2)}%`}
        />
        <Bar dataKey="value" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
    )
}
