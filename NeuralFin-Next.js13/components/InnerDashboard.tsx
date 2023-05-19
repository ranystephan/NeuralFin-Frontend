'use client'

import { useState, useEffect, useContext } from "react"



import { Metadata } from "next"

import { Activity, CreditCard, DollarSign, Download, Users, RefreshCw } from "lucide-react"
import AddStock from "./innerDashComponents/addstock"

import { Button } from "@/components/innerDashComponents/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/innerDashComponents/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/innerDashComponents/tabs"
import { CalendarDateRangePicker } from "@/components/innerDashComponents/date-range-picker"
import { MainNav } from "@/components/innerDashComponents/main-nav"
import { Overview } from "@/components/innerDashComponents/overview"
import { TransactionList } from "@/components/innerDashComponents/recent-sales"
import { Search } from "@/components/innerDashComponents/search"
import TeamSwitcher from "@/components/innerDashComponents/team-switcher"
import { UserNav } from "@/components/innerDashComponents/user-nav"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}

type PortfolioMetrics = {
  portfolio_value: number,
  pnl: number,
  beta: number,
  value_at_risk: number,
  expected_shortfall: number,

}



export default function InnerDashboard(props: PortfolioMetrics) {

  const [portfolioValue, setPortfolioValue] = useState(props.portfolio_value)
  const [pnl, setPnl] = useState(props.pnl)
  const [beta, setBeta] = useState(props.beta)
  const [valueAtRisk, setValueAtRisk] = useState(props.value_at_risk)
  const [expectedShortfall, setExpectedShortfall] = useState(props.expected_shortfall)

  const [refreshKey, setRefreshKey] = useState(0);



  const handleRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
  }

  async function getPortfolioMetrics(abortController: AbortController) {

    const apiUrl_deployed = `https://neuralfin-backend-production.up.railway.app/api/portfolio/portfolio-metrics/`;
    const apiUrl_local = `http://localhost:8000/api/portfolio-metrics/`;

    const res = await fetch(apiUrl_deployed, {
      credentials: 'include',
      signal: abortController.signal,

    })

    const data = await res.json()

    if (Object.keys(data).length === 0) {
      console.log('No portfolio metrics found')
      return
    } else {
      console.log('Portfolio metrics found')
      setPortfolioValue(data.portfolio_value)
      setPnl(data.pnl)
      setBeta(data.beta)
      setValueAtRisk(data.value_at_risk)
      setExpectedShortfall(data.expected_shortfall)
    }
  }




  useEffect(() => {
    const abortController = new AbortController();

    getPortfolioMetrics(abortController)

    return () => {
      abortController.abort();
    }
  }, [])





  return (
    <>
      <div className="md:hidden">
        image
        image
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Market Value
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${portfolioValue?.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2 })}</div>
                    <p className={`text-xs ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {pnl >= 0 ? `+${pnl?.toFixed(2)}` : pnl?.toFixed(2)} <span className="text-white">from last close</span>
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Portfolio Beta
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{beta?.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      This is the market risk of your portfolio
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Value at Risk (VaR)</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(valueAtRisk*100)?.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground">
                      The potential loss of your portfolio to 95% confidence
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Expected Shortfall
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400">{(expectedShortfall*100)?.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground">
                      This is the expected loss of your portfolio to 95% confidence
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>Recent Transactions</CardTitle>
                      <AddStock />
                    </div>
                    <CardDescription>
                      These are your last 5 transactions.
                      <button onClick={handleRefresh}>
                        <RefreshCw className="mr-2 h-4 w-4 ml-2 " />
                      </button>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionList refreshKey={refreshKey} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}