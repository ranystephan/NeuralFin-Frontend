'use client'


// Grainy.tsx
import React from 'react';
import 'tailwindcss/tailwind.css';
import styles from '@/styles/Grainy.module.css';
import Link from 'next/link';
//import { Forum } from '@next/font/google'

/* const forum = Forum({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
 */

const stylescss = {
  grainyh1: "lg:text-[80px] text-[50px]",
  grainyp: "lg:text-[30px] text-[20px]",
  button: "lg:px-11 lg:py-5 px-7 py-3 border border-black border-text text-base",
  primary: "bg-[#01010C] bg-opacity-90 text-white hover:bg-black",
  secondary: " text-black hover:bg-[#D0D0D1]",
}


const Grainy: React.FC = () => {
  return (

    <div>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={stylescss.grainyh1}>Finance, simplified.</h1>
          <p className={stylescss.grainyp}>Democratizing the access to relevant financial data.</p>
          <div className={styles.buttons}>
            <Link className={[stylescss.button, stylescss.primary].join(" ")} href={"/info"} target="_blank">View Info</Link>
            <Link className={[stylescss.button, stylescss.secondary].join(" ")} href={"/news"} target="_blank">Get News</Link>
          </div>
        </div>
        <div className={styles.blobCont}>
          <div className={[styles.yellow, styles.blob].join(" ")}></div>
          <div className={[styles.red, styles.blob].join(" ")}></div>
          <div className={[styles.green, styles.blob].join(" ")}></div>
        </div>
      </div>

      {/* SVG */}
      <svg>
        <filter id="noiseFilter">
          <feTurbulence 
            type='fractalNoise' 
            baseFrequency='0.9' 
            stitchTiles='stitch'
            result='colorNoise' />
          <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
              <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
              <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>

      {/* Github */}
      {/* <a href="https://www.github.com/ranystephan" target="_blank" className={styles.youtube}>Check us out on Github</a> */}
    </div>

  );
}; 

export default Grainy;
