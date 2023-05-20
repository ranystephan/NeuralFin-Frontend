
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export function Overview() {
  const [sectorAlloc, setSectorAlloc] = useState([])

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

/*

import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export function Overview() {
  const [sectorAlloc, setSectorAlloc] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    }, []);

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
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={sectorAlloc}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar
          name="Sector Allocation"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
    );
}
*/