'use client'

import { useEffect, useState } from 'react';
import StockForm from '@/components/StockForm';
import Header_News from '../../components/Header_News';
import Header_News_Phones from '../../components/Header_News_Phones';
import NewsBar from '@/components/NewsBar';
import StockChart from '@/components/StockChart';


import { Link } from 'react-scroll';


import './styles/news.module.css';

const styles = {
  wrapper: "flex-col page-container h-screen w-screen overflow-hidden",
  mainContainer: "h-screen w-screen flex",
  leftContainer: "w-2/3 flex ",
  leftSidebar: "w-72 mt-4 border-r flex flex-col border-gray-200",
  leftChart: "m-4 flex-1 ",
  rightContainer: "w-1/3 flex",
  rightSidebar: "w-full border-r-2 flex flex-col border-gray-600",
  rightDataContainer: "flex flex-col flex-1 ",
  rightDataBottom: "flex bg-blue-800 flex-1",
  rightDataTop: "flex flex-1",

  //for Phones
  mainContainerPhones: "h-screen w-screen flex flex-col ",
  firstPagePhones: "w-full flex flex-col",
  stockFormPhones: "w-full flex flex-col p-2",
  stockChartPhones: "w-full flex flex-col p-2 bg-gray-400",
  newsBarPhones: "w-full flex flex-col p-2 bg-black",

  scrollSnapContainer: "h-screen w-screen overflow-y-scroll snap-y",
  scrollSnapChild: "snap-start h-screen w-full",
  scrollSnapChildLast: "snap-start w-full",

}


const Page = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [symbol, setSymbol] = useState('');


  const handleSymbolChange = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); // Change the breakpoint to match your needs
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className={styles.wrapper}>
        <Header_News />
        <div className={`${styles.mainContainerPhones} ${styles.scrollSnapContainer}`}>
          <div className={` ${styles.firstPagePhones} ${styles.scrollSnapChild}`}>
            <div className={styles.stockFormPhones}>
              <Link to="stockForm" spy={true} smooth={true} offset={-70} duration={500}>
                <StockForm onSymbolChange={handleSymbolChange} />
              </Link>
            </div>
          </div>
          <div className={`${styles.stockChartPhones} ${styles.scrollSnapChild}`}>
            <Link to="stockChart" spy={true} smooth={true} offset={-70} duration={500}>
              <StockChart symbol={symbol ? symbol : "SPY"} />
            </Link>
          </div>
          <div className={`${styles.newsBarPhones} ${styles.scrollSnapChildLast}`}>
            <Link to="newsBar" spy={true} smooth={true} offset={-70} duration={500}>
              <NewsBar symbol={symbol} />
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.wrapper}>
      <Header_News />
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftSidebar}>
            <StockForm onSymbolChange={handleSymbolChange} />
          </div>
          <div className={styles.leftChart}>
            <StockChart symbol={symbol? symbol: 'SPY'} />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightSidebar}>
            <NewsBar symbol={symbol} />
          </div> 
{/*           <div className={styles.rightDataContainer}>
            <div className={styles.rightDataTop}>
            </div>
            <div className={styles.rightDataBottom}>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
