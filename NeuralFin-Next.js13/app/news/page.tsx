'use client'

import StockForm from '@/components/StockForm'
import Header_News from '../../components/Header_News'
import Header_News_Phones from '../../components/Header_News_Phones'
/* import MobileMenu from '@/components/MobileMenu' */
import { useState, useEffect } from 'react';

const styles = {
  wrapper: "static w-screen h-screen flex flex-col",
}

export default function Home() {
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
        {/* <MobileMenu /> */}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Header_News />
      <div className="absolute left-0 top-20 bottom-0 w-72 border-r border-gray-200">
        <StockForm />
      </div>
    </div>
  );
}
