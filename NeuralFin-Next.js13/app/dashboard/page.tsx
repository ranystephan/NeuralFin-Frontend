
'use client'

import DashboardHeader from '../../components/DashboardHeader'

import { useEffect, useState } from 'react'


import PortfolioChart from '@/components/PortfolioChart';
import InnerDashboard from '@/components/InnerDashboard';


//Icons
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Link from 'next/link'


const stylesL = {
  wrapper: "w-screen flex flex-col z-10 text-gray-100 ",
  mainContainer: ' w-5/6 h-full m-auto flex mt-16 rounded-3xl bg-black z-100',
  leftMain: 'flex flex-col h-full p-6 z-100',
  portfolioAmountContainer: 'flex flex-col',
  portfolioAmount: 'text-4xl font-bold',
  portfolioPercent: 'font-bold text-sm font-mono',
  pastHour: 'text-gray-400',
  chartContainer: 'text-md border border-black rounded-2xl p-4  w-full h-auto mt-11 mb-11',
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
  moreOptions: 'curesor-pointer text-xl',
  container: " h-screen w-screen overflow-hidden bg-purple-100 z[-10]",
  shape1: "absolute top-0 -left-4 w-96 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob1 z[-100] ",
  shape2: "absolute top-0 -right-4 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob2 z[-100]",
  shape3: "absolute bottom-0 -right-4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob3 z[-100]",
  shape4: "absolute bottom-0 -left-4 w-96 h-96 bg-green-200 rounded-3xl mix-blend-multiply filter blur-3xl animate-blob4 z[-100]",
  blobContainer: "flex flex-col items-center justify-center w-full z-[-10]",

}

type PortfolioMetrics = {
  portfolio_value: number,
  pnl: number,
  beta: number,
}



export default function Dashboard( props: PortfolioMetrics ) {
  const [portfolioValue, setPortfolioValue] = useState(props.portfolio_value)
  const [pnl, setPnl] = useState(props.pnl)
  const [beta, setBeta] = useState(props.beta)


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
      {/* <div className={stylesL.blobContainer}>
        <div className={stylesL.shape2}></div>
        <div className={stylesL.shape3}></div>
        <div className={stylesL.shape1}></div>
        <div className={stylesL.shape4}></div>
      </div> */}
      <div className={stylesL.wrapper}>
        <DashboardHeader />
        <div className={stylesL.mainContainer}>
          <div className={stylesL.leftMain}>
            <div className={stylesL.portfolioAmountContainer}>
              <div className={stylesL.portfolioAmount}> $ { portfolioValue?.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2 }) } </div>
              <div className={stylesL.portfolioPercent}>
                  <p className={`text-xs ${pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {pnl >= 0 ? `+${pnl?.toFixed(2)}` : pnl?.toFixed(2)} <span className={stylesL.pastHour}>        Since Last Close</span>
                  </p>
              </div>
            </div>
            <div>
              <div className={stylesL.chartContainer}>
                <PortfolioChart />
              </div>
            </div>
            <div className={stylesL.innerDashboard}>
              <InnerDashboard portfolio_value={0} pnl={0} beta={0} value_at_risk={0} expected_shortfall={0} />

            </div>



            {/* 
            <div className={stylesL.buyingPowerContainer}>
              <div className={stylesL.buyingPowerTitle}>Diversification Score</div>
              <div className={stylesL.buyingPowerAmount}>5.77/10</div>
            </div>
            <div className={stylesL.buyingPowerContainer}>
              <Link href={"/info"}>
                <div className={stylesL.buyingPowerTitle}>Value at Risk</div>
              </Link>
              <div className={stylesL.buyingPowerAmount}>2.06%</div>
            </div>
            <div className={stylesL.buyingPowerContainer}>
              <div className={stylesL.buyingPowerTitle}>Buying Power</div>
              <div className={stylesL.buyingPowerAmount}>$12,534.21</div>
            </div>
            <div className={stylesL.buyingPowerContainer}>
              <div className={stylesL.buyingPowerTitle}>Portfolio Beta</div>
              <div className={stylesL.buyingPowerAmount}>{beta?.toFixed(2)}</div>
            </div>
             */}
            {/* <Notice/> */}
          </div>
          <div className={stylesL.rightMain}>
            <div className={stylesL.rightMainItem}>
              <div className={stylesL.ItemTitle}> Performing </div>

              <BiDotsHorizontalRounded className={stylesL.moreOptions} />
              
            </div>


            {/* <div className={stylesL.rightMainItemStocks}>
              <PortfolioItems />
            </div> */}
            
          </div>
        </div>
      </div>
    </div>

  )
  
}




