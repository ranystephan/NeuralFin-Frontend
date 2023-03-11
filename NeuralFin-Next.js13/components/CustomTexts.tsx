'use client';

import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../utils/motion';

interface TypingTextProps {
  title: string;
  textStyles?: string;
}


export const TypingText = ({ title, textStyles } : TypingTextProps) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-sm dark:text-secondary-white text-green-900 ${textStyles}`} 
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles } : TypingTextProps) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] ${textStyles}`}
  >
    {title}
  </motion.h2>
);
