'use client';


import { Footer, Navbar } from '../components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';
import { ThemeProvider } from 'next-themes';


const Page = () => (
  <ThemeProvider attribute="class">
    <div className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Explore />
      <GetStarted />
      <WhatsNew />
      <World />
      <Insights />
      <Feedback />
      <Footer />
    </div>
  </ThemeProvider>
)

export default Page
