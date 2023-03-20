'use client';


import { Navbar } from '@/components';
import { ThemeProvider } from 'next-themes';
import BallAnimation from '@/components/BallAnimation';
import React from 'react';
import '../styles/globals.css'



const Page = () => (
  <ThemeProvider attribute="class">
    <div className="overflow-hidden">
      {/* set the navbar over BallAnimation */}
      <div className="overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full z-10">
          <Navbar />
        </div>
        <div className=" top-0 left-0 w-full h-full z-0">
          <BallAnimation />
        </div>
      </div>
    </div>
  </ThemeProvider>
)

export default Page;
