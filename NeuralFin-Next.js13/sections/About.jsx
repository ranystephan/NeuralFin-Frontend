'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';

import styles from '../styles';
import { fadeIn, staggerContainer} from '../utils/motion';
import '../utils/motion';



const About = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <div className=' z-0' /> {/* This div is for the background gradient (and image) */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="" textStyles="text-center" />

      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 0.3)}
        className='mt-[8px] font-normal sm:text-[32px] text-[20px] text-center dark:text-secondary-white text-green-900'
      >
        <span className='font-extrabold dark:text-white'>NeuralFin</span> is a financial technology company that combines cutting-edge artificial intelligence 
        and <span className='font-extrabold dark:text-white'>machine learning</span> with human expertise to provide powerful investment solutions to its clients.
        Our mission is to empower 
        individuals and businesses to make smarter investment decisions, regardless of their level of experience or expertise.
        We believe that technology has the power to revolutionize the financial industry, and our team of experienced data scientists 
        and finance professionals are dedicated to harnessing that power to drive innovation and create value for our clients. 
        Whether you're an individual investor looking to grow your wealth or a business seeking to optimize your financial strategy, 
        NeuralFin has the expertise and resources to help you achieve your goals.

      </motion.p>

    </motion.div>
  </section>
);

export default About;


