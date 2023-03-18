'use client';


import { Footer, Navbar } from '@/components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';
import { ThemeProvider } from 'next-themes';
import BallAnimation from '@/components/BallAnimation';
import React from 'react';
import { relative } from 'path';

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

      {/*
      <Hero />
      <About />
      <Explore />
      <GetStarted />
      <WhatsNew />
      <World />
      <Insights />
      <Feedback />
      <Footer /> */}
    </div>
  </ThemeProvider>
)

export default Page;
