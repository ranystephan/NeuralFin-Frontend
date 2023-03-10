'use client';


import { motion } from 'framer-motion'
import styles from '../styles'
import { slideIn, staggerContainer, staggetContainer, textVariant } from '../utils/motion'


const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <div className='flex justify-center items-center flex-col relative z-10'>
        <motion.h1 variants={textVariant(1.1)} className={`${styles.heroHeading} hero-font`}>
          Smart finance,
        </motion.h1>
        <motion.div
        variants={textVariant(1.2)}
        className='flex flex-row justify-center items-center'
        >
          <h1 className={`${styles.heroHeading} italic hero-font`}>simplified.</h1>
        </motion.div>
      </div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 2)}
        className="relative w-full md:-mt-[20px] -mt-[12px]"
      >
        <div className="absolute  z-[0] -top-[180px]" >
        <img
          src="/neuralfin-logo/neuralfin-logo-beta-transpb.png"
          alt="NeuralFin Logo"
          className="w-[600px] h-[600px] object-contain z-10 relative"
        />
        </div>
      </motion.div>

    </motion.div>
  </section>
);

export default Hero;
