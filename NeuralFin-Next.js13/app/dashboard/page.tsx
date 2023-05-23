
'use client'

import DashboardHeader from '../../components/DashboardHeader'

import { useEffect, useState } from 'react'


import PortfolioChart from '@/components/PortfolioChart';
import InnerDashboard from '@/components/InnerDashboard';


//Icons idk
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Skeleton } from '@/components/innerDashComponents/skeleton';


const stylesL = {
  bgWrapper: "w-screen bg-white overflow-hidden scrollbar-hide",
  wrapper: "w-screen flex flex-col z-10 text-gray-100 bg-black bg-opacity-90 overflow-hidden scrollbar-hide",
  mainContainer: ' w-11/12 h-full m-auto flex mt-16 rounded-3xl overflow-hidden scrollbar-hide',
  leftMain: 'flex flex-col h-full p-6 z-100',
  portfolioAmountContainer: 'flex flex-col',
  portfolioAmount: 'text-4xl font-bold',
  portfolioPercent: 'font-bold text-sm font-mono',
  pastHour: 'text-gray-400',
  chartContainer: 'text-md border border-white rounded-2xl p-4  w-full h-auto mt-11 mb-11',
  buyingPowerContainer: 'w-full border-t mb-12 border-b h-16 border-[#30363b] flex justify-between item items-center rounded-2xl bg-orange-500 bg-opacity-10',
  buyingPowerTitle: 'font-bolder text-lg items-center p-5 hover:font-bold',
  buyingPowerAmount: 'flex font-bolder text-xl h-20 items-center p-5 ',


  innerDashboard: 'flex border border-black p-5 flex-col rounded-xl',
  noticeContainer: 'flex-1',
  noticeTitle: 'text-gray-500',
  noticeMessage: 'font-bold',
  noticeCTS: 'font-bold text-green-500 cursor-pointer mt-5',


  rightMain: 'flex flex-col flex-1 h-4/5 bg-[#1E2123] mt-6 rounded-lg overflow-y-scroll noScroll',
  rightMainItem: 'flex items-center text-white px-5 py-3',
  rightMainItemStocks: 'flex items-center justify-left text-white px-5 py-3 ',
  stocksContainer: 'flex flex-row flex-1 bg-purple-500 rounded-lg px-5 justify-between',
  ItemTitle: 'flex-1 font-bold',
  moreOptions: 'cursor-pointer text-xl',
  container: " h-screen w-screen overflow-hidden bg-purple-100 z[-10]",
  shape1: "absolute top-0 -left-4 w-96 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob1 z[-100] ",
  shape2: "absolute top-0 -right-4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob2 z[-100]",
  shape3: "absolute bottom-0 -right-4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob3 z[-100]",
  shape4: "absolute bottom-0 -left-4 w-96 h-96 bg-green-200 rounded-3xl mix-blend-multiply filter blur-3xl animate-blob4 z[-100]",
  blobContainer: "flex flex-col items-center justify-center max-w-full z-[-10]",

}

const PortfolioValueSkeleton = () => {
  return (
    <div className={stylesL.portfolioAmountContainer}>
      <div className={`${stylesL.portfolioAmount} flex items-center`}>
        $ <Skeleton className="h-10 w-40 bg-gray-400 m-2" />
      </div>
      <div className={stylesL.portfolioPercent}>
        <p className="text-xs">
          +0.00 <span className={stylesL.pastHour}> Since Last Close</span>
        </p>
      </div>
    </div>
  );
};



const Dashboard = () => {
  const [portfolioValue, setPortfolioValue] = useState(0)
  const [pnl, setPnl] = useState(0)

  const [portfolioMetrics, setPortfolioMetrics] = useState({})


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
      setPortfolioMetrics(data)
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
    <div>

      <div className={stylesL.bgWrapper}>
        <div className={stylesL.wrapper}>
          <DashboardHeader />
          <div className={stylesL.mainContainer}>
            <div className={stylesL.leftMain}>
              {!portfolioValue ? <PortfolioValueSkeleton /> : (
                <div className={stylesL.portfolioAmountContainer}>
                  <div className={stylesL.portfolioAmount}> $ { portfolioValue?.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2 }) } </div>
                  <div className={stylesL.portfolioPercent}>
                    <p className={`text-xs ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {pnl >= 0 ? `+${pnl?.toFixed(2)}` : pnl?.toFixed(2)} <span className={stylesL.pastHour}>Since Last Close</span>
                    </p>
                  </div>
                </div>
              )}
              <div>
                <div className={stylesL.chartContainer}>
                  <PortfolioChart />
                </div>
              </div>
              <div className={stylesL.innerDashboard}>
                <InnerDashboard portfolioMetrics={portfolioMetrics} />

              </div>


            </div>
            {/*}
            <div className={stylesL.rightMain}>
              <div className={stylesL.rightMainItem}>
                <div className={stylesL.ItemTitle}> Performing </div>

                <BiDotsHorizontalRounded className={stylesL.moreOptions} />

              </div>


              <div className={stylesL.rightMainItemStocks}>
                <PortfolioItems />
              </div>

            </div> */}
          </div>
        </div>
      </div>
    </div>

  )
  
}




export default Dashboard;