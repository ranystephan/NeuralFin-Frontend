'use client'

import StockForm from '@/components/StockForm'
import Header_News from '../../components/Header_News'
import Header_News_Phones from '../../components/Header_News_Phones'
import NewsBar from '@/components/NewsBar'
import { useState, useEffect } from 'react';

const styles = {
  wrapper: "w-screen h-screen flex flex-col",
  leftContainer: "absolute w-1/2 h-full flex",
  leftSidebar: "absolute w-72 h-full border-r flex flex-col mt-16 border-gray-200",
  rightContainer: "absolute w-1/2 left-1/2 h-full flex ",
  rightSidebar: "absolute w-72 h-full border-r flex flex-col mt-16 border-white-200",

}

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change the breakpoint to match your needs
    }
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
          <StockForm />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.rightSidebar}>
          <NewsBar symbol={'AAPL'} />
        </div>
      </div>
    </div>
  );
}

export default Page;