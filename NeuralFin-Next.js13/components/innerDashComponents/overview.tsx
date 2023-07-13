
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

type portfolioMetrics = {
  sector_allocation?: any,
}

interface AssetAllocationProps {
  portfolioMetrics: portfolioMetrics;
}



export function Overview({portfolioMetrics}: AssetAllocationProps) {
  const [sectorAlloc, setSectorAlloc] = useState<SectorAllocation[]>([]);

  const transformedData = Object.keys(portfolioMetrics.sector_allocation || {}).map(key => {
    return {
      name: key,
      value: portfolioMetrics.sector_allocation[key]
    }
  })


  useEffect(() => {
    setSectorAlloc(transformedData)
    }, [portfolioMetrics])


  if (Array.isArray(sectorAlloc) && sectorAlloc.length === 0) {
    return     <ResponsiveContainer width="100%" height={350}>
      <BarChart data={skeletonData}>
        <XAxis
          dataKey="name"
          stroke=""
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
          tickFormatter={(value) => `${value.slice(0, 4)}`}

        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
        />
        <Bar dataKey="value" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
    )
}
