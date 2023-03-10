'use client';

import { motion } from 'framer-motion'
import styles from '../styles'
import { navVariants } from '../utils/motion'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'



const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
    }, []);


  const renderThemeChanger = () => {
    if (!mounted) return null;


      const currentTheme = theme === 'system' ? systemTheme : theme;


      if (currentTheme === 'dark') {
        return (
          <button onClick={() => setTheme('light')}>
            <h2 className="text-[24px] leading-[30]px">
              {'🌜'}
            </h2>
          </button>
        );
        } else {
          return (
            <button onClick={() => setTheme('dark')}>
              <h2 className="text-[24px] leading-[30]px">
                {'🌞'}
              </h2>
            </button>
          );
        }

  }


  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01 bg-blend-overlay" />
      <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
        <div className="text-2xl cursor-pointer hover:text-purple-700 duration-300">search</div>
        <h2 className="font-extrabold text-[24px] leading-[30]px cursor-pointer hover:text-purple-700 duration-300">
          neuralfin
        </h2>
        {renderThemeChanger()}


      </div>
    </motion.nav>
  )
};

export default Navbar;
