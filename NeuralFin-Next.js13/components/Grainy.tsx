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
  grainyh1: "lg:text-[80px] text-[50px] ",
  grainyp: "lg:text-[30px] text-[20px]  hover:text-white",
  button: "lg:px-11 lg:py-5 px-7 py-3 border border-black border-text text-base",
  primary: "bg-[#01010C] bg-opacity-90 text-white hover:bg-black",
  secondary: " text-black hover:bg-[#D0D0D1]",
}

const Grainy: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 15 }}>
      {/* Updated blob container with better positioning */}
      <div className="absolute h-full w-full flex items-center justify-center">
        {/* Animated blob container */}
        <div className="relative h-[500px] w-[500px]">
          {/* Yellow blob */}
          <div 
            className="absolute rounded-full opacity-80 bg-[#F9DB4A]" 
            style={{
              top: '200px',
              left: '100px',
              height: '200px',
              width: '200px',
              filter: 'blur(40px)',
              animation: 'yellowBlob 8s infinite ease'
            }}
          />
          
          {/* Green blob */}
          <div 
            className="absolute rounded-full opacity-80 bg-[#6ED47C]" 
            style={{
              top: '80px',
              right: '-20px',
              height: '200px',
              width: '250px',
              filter: 'blur(40px)',
              animation: 'greenBlob 8s infinite ease'
            }}
          />
          
          {/* Red blob */}
          <div 
            className="absolute rounded-full opacity-80 bg-[#FF4D4D]" 
            style={{
              right: '0',
              top: '250px',
              height: '250px',
              width: '200px',
              filter: 'blur(40px)',
              animation: 'redBlob 8s infinite linear'
            }}
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes yellowBlob {
          0% {
            top: 200px;
            left: 100px;
            transform: scale(1);
          }
          30% {
            top: 300px;
            left: 150px;
            transform: scale(1.2);
          }
          60% {
            top: 100px;
            left: 200px;
            transform: scale(1.3);
          }
          100% {
            top: 200px;
            left: 100px;
            transform: scale(1);
          }
        }
        
        @keyframes greenBlob {
          0% {
            top: 80px;
            right: -20px;
            transform: scale(1.2);
          }
          30% {
            top: 300px;
            right: -20px;
            transform: scale(1);
          }
          60% {
            top: 200px;
            right: 100px;
            transform: scale(1);
          }
          100% {
            top: 80px;
            right: -20px;
            transform: scale(1.2);
          }
        }
        
        @keyframes redBlob {
          0% {
            top: 250px;
            right: 0px;
            transform: scale(1);
          }
          30% {
            top: 150px;
            right: 150px;
            transform: scale(1.4);
          }
          60% {
            top: 250px;
            right: 100px;
            transform: scale(1);
          }
          100% {
            top: 250px;
            right: 0px;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}; 

export default Grainy;
