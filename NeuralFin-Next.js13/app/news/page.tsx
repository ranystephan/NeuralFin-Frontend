'use client'

import { useEffect, useState } from 'react';
import StockForm from '@/components/StockForm';
import Header_News from '../../components/Header_News';
import Header_News_Phones from '../../components/Header_News_Phones';
import NewsBar from '@/components/NewsBar';
import '@/styles/globals.css';

const styles = {
  wrapper: "relative w-full h-full flex flex-col",
  leftContainer: "absolute w-1/2 top-12 bottom-0 flex",
  leftSidebar: "absolute w-72 top-0 mt-4 bottom-0 border-r flex flex-col border-gray-200",
  rightContainer: "absolute w-1/2 left-1/2 h-full flex ",
  rightSidebar: "absolute w-72 bottom-4 border-r-2 flex flex-col top-4 border-gray-600",
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
        <Header_News_Phones />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Header_News />
      <div className={styles.leftContainer}>
        <div className={styles.leftSidebar}>
          <StockForm onSymbolChange={handleSymbolChange} />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.rightSidebar}>
          <NewsBar symbol={symbol} />
        </div>
      </div>
    </div>
  );
};

export default Page;
