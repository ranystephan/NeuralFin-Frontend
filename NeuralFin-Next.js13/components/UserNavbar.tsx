'use client';
import { useState, useEffect } from 'react';

import { motion } from 'framer-motion'
import styles from '../styles'
import { navVariants } from '../utils/motion'
import Link from 'next/link'

type UserProps = {
  name: string
};


const UserNavbar = ( props: UserProps ) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
    }, []);


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
      <div className="relative w-[50%] inset-0"/> {/* dark:gradient-01 gradient-01-light */}
      <div className={`mx-auto flex items-center justify-between `}>
        <div className="relative group">
          <h2 className="font-extrabold sm:text-2xl text-4xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
            neuralfin
          </h2> 
          <motion.div
            className="hidden absolute group-hover:block"
            variants={dropdownVariants}
            initial="hidden"
            whileInView="show"

          >
            <Link href={"/news"}>
              <div className="font-extrabold sm:text-2xl text-3xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
                news
              </div>
            </Link>
            <Link href={"/dashboard"}>
              <div className="font-extrabold sm:text-2xl text-3xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
                dashboard
              </div>
            </Link>
          </motion.div>
    </div>
        <div className="font-extrabold text-4xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
          <Link href={"/user"}>
            <div className="font-extrabold sm:text-2xl text-3xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
              {props.name}
            </div>
          </Link>
        </div> 
      </div>
    </motion.nav>
  )
};

export default UserNavbar;