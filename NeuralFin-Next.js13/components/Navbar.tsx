'use client';

import { motion } from 'framer-motion'
import styles from '../styles'
import { navVariants } from '../utils/motion'




const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01 bg-blend-overlay" />
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
      <div className="text-2xl text-white">search</div>
      <h2 className="font-extrabold text-[24px] leading-[30]px text-white cursor-pointer hover:text-purple-700 duration-300">
        neuralfin
      </h2>
      <h2 className="font-extrabold text-[24px] leading-[30]px text-white cursor-pointer hover:text-purple-700 duration-300">
        ~
      </h2>

    </div>
  </motion.nav>
);

export default Navbar;
