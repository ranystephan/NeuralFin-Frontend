
'use client'

import DashboardHeader from '../../components/DashboardHeader'
import './styles/globals.css'

import { useState } from 'react'


import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import PortfolioChart from '@/components/PortfolioChart';

//Icons
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";


import chartImage from '@/public/chartImage.png'
import Link from 'next/link'


const stylesL = {
  wrapper: "w-screen h-screen flex flex-col bg-black z-10",
  mainContainer: ' w-5/6 h-full m-auto flex mt-16 rounded-3xl bg-[#252522] z-100',
  leftMain: 'flex flex-col w-3/4 h-full p-6 overflow-y-scroll z-100',
  portfolioAmountContainer: 'flex flex-col',
  portfolioAmount: 'text-white text-4xl',
  portfolioPercent: 'text-white font-bold text-sm',
  pastHour: 'text-gray-400',
  chartContainer: 'text-md   w-full h-auto text-white mt-11 mb-11',
  buyingPowerContainer: 'w-full border-t mb-12 border-b h-16 border-[#30363b] flex justify-between item items-center rounded-2xl bg-orange-500 bg-opacity-10',
  buyingPowerTitle: 'text-white font-bolder text-lg items-center p-5 hover:font-bold',
  buyingPowerAmount: 'flex text-white font-bolder text-xl h-20 items-center p-5 ',
  notice: 'flex border border-[#303636] mx-11 my-4 p-5 flex-col rounded-3xl',
  noticeContainer: 'flex-1',
  noticeTitle: 'text-gray-500',
  noticeMessage: 'text-white font-bold',
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

export default function Dashboard() {
  const [popularTopics, setTopics] = useState([
    "Technology",
    "Top Movies",
    "Upcoming Earnings",
    "Crypto",
    "Cannabis",
    "Healthcare Supplies",
    "Index ETFs",
    "Technology",
    "China",
    "Pharma",
  ]);


  return (
    <div>
      <div className={stylesL.blobContainer}>
        <div className={stylesL.shape2}></div>
        <div className={stylesL.shape3}></div>
        <div className={stylesL.shape1}></div>
        <div className={stylesL.shape4}></div>
      </div>
      <div className={stylesL.wrapper}>
        <DashboardHeader />
        <div className={stylesL.mainContainer}>
          <div className={stylesL.leftMain}>
            <div className={stylesL.portfolioAmountContainer}>
              <div className={stylesL.portfolioAmount}>$107,486.21</div>
              <div className={stylesL.portfolioPercent}>
                +12.420(+1.69%)
                <span className={stylesL.pastHour}>Past Hour</span>
              </div>
            </div>
            <div>
              <div className={stylesL.chartContainer}>
                {/* <PortfolioChart */}
                {/* <img className='rounded-2xl' src={chartImage.src} alt="charrt" width='700' height='300' /> */}
                <PortfolioChart />
              </div>
            </div>
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
            <div className={stylesL.notice}>
              <div className="newsfeed__popularlists__section">
                <div className="newsfeed__popularlists__intro flex justify-between text-white mb-3">
                  <div className='font-bold text-white text-xl'>Popular lists</div>
                  <p>Show More</p>
                </div>
                <div className="newsfeed_popularlists_badges">
                  {popularTopics.map((topic) => (
                    <Chip 
                      className="topic__badge text-white"
                      variant="outlined"
                      label={topic}
                      avatar={<Avatar
                        src={`https://avatars.dicebear.com/api/human/${topic}.svg`}
                      />} 
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* <Notice/> */}
          </div>
          <div className={stylesL.rightMain}>
            <div className={stylesL.rightMainItem}>
              <div className={stylesL.ItemTitle}> Performing </div>

              <BiDotsHorizontalRounded className={stylesL.moreOptions} />
              
            </div>
            {/* Map through stocks and for every stock make an Asset component */}
            {/* <Asset /> */}

            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-orange-500 items-center rounded-lg h-7 px-5 justify-between w-44 bg-opacity-30 hover:bg-opacity-60'>
                  <div>AAPL</div>
                  <div>4.76%</div>
                </div>
              </div>
            </div>
            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-orange-500 items-center rounded-lg h-7 px-5 justify-between w-40 bg-opacity-30 hover:bg-opacity-60'>
                  <div>TSLA</div>
                  <div>7.69%</div>
                </div>
              </div>
            </div>
            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-orange-500 items-center rounded-lg h-7 px-5 justify-between w-52 bg-opacity-30 hover:bg-opacity-60'>
                  <div>NYSE</div>
                  <div>11.7%</div>
                </div>
              </div>
            </div>
            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-orange-500 items-center rounded-lg h-7 px-5 justify-between w-48 bg-opacity-30 hover:bg-opacity-60'>
                  <div>BABA</div>
                  <div>30.5%</div>
                </div>
              </div>
            </div>
            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-orange-500 items-center rounded-lg h-7 px-5 justify-between w-56 bg-opacity-30 hover:bg-opacity-60'>
                  <div>MSFT</div>
                  <div>43.4%</div>
                </div>
              </div>
            </div>
            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-purple-500 items-center rounded-lg h-7 px-5 justify-between w-44 bg-opacity-30 hover:bg-opacity-60'>
                  <div>TWTR</div>
                  <div>69%</div>
                </div>
              </div>
            </div>
            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-orange-500 items-center rounded-lg h-7 px-5 justify-between w-40 bg-opacity-30 hover:bg-opacity-60'>
                  <div>NIO</div>
                  <div>21.1%</div>
                </div>
              </div>
            </div>
            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-orange-500 items-center rounded-lg h-7 px-5 justify-between w-36 bg-opacity-30 hover:bg-opacity-60'>
                  <div>ADA</div>
                  <div>11.1%</div>
                </div>
              </div>
            </div>
            <div className={stylesL.rightMainItemStocks}>
              <div className={stylesL.ItemTitle}>
                <div className='flex flex-row flex-1 bg-orange-500 items-center rounded-lg h-7 px-5 justify-between w-48 bg-opacity-30 hover:bg-opacity-60'>
                  <div>NDAQ</div>
                  <div>28.1%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
  
}




