'use client'

import { useState, useEffect } from "react"




import { Metadata } from "next"

import { Activity, CreditCard, DollarSign, Download, Users, RefreshCw } from "lucide-react"
import AddStock from "./innerDashComponents/addstock"
import { Skeleton } from "./innerDashComponents/skeleton"

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
import TeamSwitcher from "@/components/innerDashComponents/team-switcher"
import  DiversificationChart from "@/components/DiversificationChart"
import BenchmarkChart from "@/components/BenchmarkChart"
import Link from "next/link"


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Different portfolio metrics",
}


const CardSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Market Value
        </CardTitle>
        <Skeleton className="h-4 w-4 text-muted-foreground  bg-gray-400 " />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold"><Skeleton className="h-8 w-20 bg-gray-400 mb-2"/></div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span className="mr-2">+/-</span>
          <span className="mr-2"><Skeleton className="h-3 w-6 my-2 bg-gray-400"/></span>
          <span className="text-white">from last close</span>
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Portrfolio Beta
        </CardTitle>
        <Skeleton className="h-4 w-4 text-muted-foreground bg-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold"><Skeleton className="h-8 w-20 bg-gray-400 mb-2"/></div>
        <p className="text-xs text-muted-foreground flex items-center">
          This is the market risk of your portfolio
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Value at Risk (VaR)
        </CardTitle>
        <Skeleton className="h-4 w-4 text-muted-foreground bg-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold"><Skeleton className="h-8 w-20 bg-gray-400 mb-2"/></div>
        <p className="text-xs text-muted-foreground flex items-center">
          The potential loss of your portfolio to 95% confidence
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Expected Shortfall
        </CardTitle>
        <Skeleton className="h-4 w-4 text-muted-foreground bg-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold"><Skeleton className="h-8 w-20 bg-gray-400 mb-2"/></div>
        <p className="text-xs text-muted-foreground flex items-center">
          This is the expected loss of your portfolio to 95% confidence
        </p>
      </CardContent>
    </Card>
  </div>

);

type portfolioMetrics = {
  portfolio_value?: number,
  pnl?: number,
  beta?: number,
  value_at_risk?: number,
  expected_shortfall?: number,
  alpha?: number,
  sharpe_ratio?: number,
  sortino_ratio?: number,
  information_ratio?: number,
  information_coefficient?: number,
  jensen_alpha?: number,
  portfolio_performance?: any,
  diversification?: any,
}

interface InnerDashboardProps {
  portfolioMetrics: portfolioMetrics;
}



export default function InnerDashboard({portfolioMetrics}: InnerDashboardProps) {
  const [metrics, setMetrics] = useState<portfolioMetrics>(portfolioMetrics);


  const [refreshKey, setRefreshKey] = useState(0);



  const handleRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
  }



  useEffect(() => {
    setMetrics(portfolioMetrics);
  }, [portfolioMetrics]);



  return (
    <div className="">
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              {/* <UserNav /> */}
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
              <TabsTrigger value="analytics">
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
              {!metrics.portfolio_value ? <CardSkeleton /> : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Current Market Value
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">${metrics.portfolio_value?.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2 })}</div>
                        <p className={`text-xs ${metrics.pnl !== undefined && metrics.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {metrics.pnl !== undefined && metrics.pnl >= 0 ? `+${metrics.pnl?.toFixed(2)}` : metrics.pnl?.toFixed(2)} <span className="text-white">from last close</span>
                        </p>
                        <p className={`text-xs ${metrics.portfolio_performance[1] !== undefined && metrics.portfolio_performance[1] >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {metrics.pnl !== undefined && metrics.portfolio_performance[1] >= 0 ? `+${metrics.portfolio_performance[1]?.toFixed(2)}` : metrics.portfolio_performance[1]?.toFixed(2)} <span className="text-white">from initial investments</span>
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
                        <div className="text-2xl font-bold">{metrics.beta?.toFixed(2)}</div>
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
                        <div className="text-2xl font-bold">{(metrics.value_at_risk !== undefined ? (metrics.value_at_risk * 100)?.toFixed(2): 'N/A')}%</div>
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
                        <div className="text-2xl font-bold text-red-400">{(metrics.expected_shortfall !== undefined ? (metrics.expected_shortfall * 100)?.toFixed(2): 'N/A')}%</div>
                        <p className="text-xs text-muted-foreground">
                          This is the expected loss of your portfolio to 95% confidence
                        </p>
                      </CardContent>
                    </Card>
                    </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>Asset Allocation</CardTitle>
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
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium hover:underline">
                      <Link href="/docs">
                        Portfolio Alpha
                      </Link>
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.alpha?.toFixed(4)}</div>
                    <p className="text-xs text-muted-foreground">
                      This is the excess return of your portfolio
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sharpe Ratio
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.sharpe_ratio?.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      This is the risk-adjusted return of your portfolio
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Information Ratio</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{(metrics.information_ratio !== undefined ? (metrics.information_ratio*100)?.toFixed(2) : 'N/A')}%</div>
                    <p className="text-xs text-muted-foreground">
                      This is the excess return of your portfolio over the benchmark (S&P500)
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Information Coefficien (IC)
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-400">{(metrics.information_coefficient !== undefined ? (metrics.information_coefficient * 100)?.toFixed(2): 'N/A')}%</div>
                    <p className="text-xs text-muted-foreground">
                      This is the correlation between your portfolio and the benchmark (S&P500)
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Diversification Matrix</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <DiversificationChart diversification={metrics.diversification} />
                  </CardContent>
                </Card>
                <div className="col-span-4 grid grid-ros-2 gap-4 ">
                  <div className="flex gap-4">
                    <Card >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Sortino Ratio
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{metrics.sortino_ratio?.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                          This is the risk-adjusted return of your portfolio
                        </p>
                      </CardContent>
                    </Card>
                    <Card >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Jensen's Alpha
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{metrics.jensen_alpha?.toFixed(4)}</div>
                        <p className="text-xs text-muted-foreground">
                          This is the excess return of your portfolio over the benchmark (S&P500)
                        </p>
                      </CardContent>
                    </Card>
                  </div>
            
                  <Card >
                  <CardHeader>
                    <CardTitle>
                      <div className="flex items-center justify-between">
                        <div className="text-md font-bold">Benchmark Chart</div>
                        <div className="text-sm font-medium text-gray-400">S&P 500</div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="ml-2">
                      <BenchmarkChart />
                    </div>
                  </CardContent>
                </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}