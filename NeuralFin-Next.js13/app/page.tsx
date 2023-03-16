'use client';


import { Footer, Navbar } from '../components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';
import { ThemeProvider } from 'next-themes';
import WaveGrid from '@/components/WaveGrid';

const Page = () => (
  <ThemeProvider attribute="class">
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      {/*<WaveGrid />
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

export default Page
