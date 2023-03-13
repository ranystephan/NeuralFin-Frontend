'use client';

import { motion } from 'framer-motion'
import styles from '../styles'
import { navVariants } from '../utils/motion'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Link from 'next/link'



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
            <h2 className="text-2xl leading-8">
              {'🌜'}
            </h2>
          </button>
        );
        } else {
          return (
            <button onClick={() => setTheme('dark')}>
              <h2 className="text-2xl leading-8">
                {'🌞'}
              </h2>
            </button>
          );
        }

  }

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: {
      type: 'ease',
      stiffness: 100,
      damping: 100,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'ease',
      stiffness: 20,
      delay: 0,
    },
  },
};


  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="absolute w-[50%] inset-0 dark:gradient-01 gradient-01-light " />
      <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8 items-center`}>
        <div className="relative group">
          <h2 className="font-extrabold text-2xl leading-8 cursor-pointer hover:text-green-700 duration-300">
            neuralfin
          </h2> 
          <motion.div
            className="hidden absolute group-hover:block"
            variants={dropdownVariants}
            initial="hidden"
            whileInView="show"

          >
            <Link href={"/news"}>
              <div className="font-extrabold text-2xl leading-8 cursor-pointer hover:text-green-700 duration-300">
                news
              </div>
            </Link>
            <Link href={"/dashboard"}>
              <div className="font-extrabold text-2xl leading-8 cursor-pointer hover:text-green-700 duration-300">
                dashboard
              </div>
            </Link>
          </motion.div>
        </div>

        {renderThemeChanger()}


      </div>
    </motion.nav>
  )
};

export default Navbar;
