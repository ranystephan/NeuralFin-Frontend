'use client';

import { motion } from 'framer-motion'
import styles from '../styles'
import { navVariants } from '../utils/motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import Image from 'next/image'

import transLogo from '@/public/neuralfinLogo/transLogo.png';




const Navbar = () => {
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
      className={`${styles.xPaddings} pt-2 pb-4 relative`}
    >
      <div className="relative w-[50%] inset-0"/> {/* dark:gradient-01 gradient-01-light */}
      <div className={`mx-auto flex items-center justify-between `}>
        <div className="relative group">
          <Link href={"/"}>
            <h2 className="lg:w-[70px] w-14 ">
              <Image src={transLogo} alt="logo" />
            </h2>
          </Link>
          <motion.div
            className="hidden absolute group-hover:block"
            variants={dropdownVariants}
            initial="hidden"
            whileInView="show"

          >
            <Link href={"/news"}>
              <div className="font-extrabold text-2xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
                news
              </div>
            </Link>
            <Link href={"/info"}>
              <div className="font-extrabold text-2xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
                info
              </div>
            </Link>
          </motion.div>
        </div>
        <div className="font-extrabold text-2xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
          <Link href={"/register"}>
            <div className="font-extrabold text-2xl leading-8 cursor-pointer hover:text-purple-700 duration-300">
              register
            </div>
          </Link>
        </div> 
      </div>
    </motion.nav>
  )
};

export default Navbar;
