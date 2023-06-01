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
const Grainy: React.FC = () => {
  return (

    <div>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.grainyh1}>Finance, simplified.</h1>
          <p className={styles.grainyp}>Democratizing the access to relevant financial data.</p>
          <div className={styles.buttons}>
            <Link className={[styles.button, styles.primary].join(" ")} href={"/info"} target="_blank">View Info</Link>
            <Link className={[styles.button, styles.secondary].join(" ")} href={"/news"} target="_blank">Get News</Link>
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
