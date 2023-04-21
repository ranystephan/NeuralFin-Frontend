'use client';


import { Navbar } from '@/components';
import { UserNavbar } from '@/components';
import { ThemeProvider } from 'next-themes';
import BallAnimation from '@/components/BallAnimation';
import React, { useEffect } from 'react';
import '../styles/globals.css'



const Page = () => {
  const [name, setName] = React.useState('');

  useEffect(() => {
    const abortController = new AbortController();
    (
      async () => {
        try {
          const response = await fetch('https://neuralfin-backend-production.up.railway.app/api/user', {
            credentials: 'include',
            signal: abortController.signal,
          });
        
          if (!response.ok) {
            throw new Error('Network response was not ok from user fetch');
          }

          const content = await response.json()
          setName(content.name);
          console.log(content.name);
        } catch (err) {
          if (err instanceof Error) {
            console.log(err.message);
          } else {
            console.log('Something went wrong', err);
          }
          setName('Not logged in');
          console.log('Not logged in');
        }

      }
    )();
    return () => {abortController.abort();};

  }, []);

  return (

    <ThemeProvider attribute="class">
      <div className="overflow-hidden">
        {/* set the navbar over BallAnimation */}
        <div className="overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full z-10">
            {name != 'Not logged in' ? (
              <UserNavbar name={name} /> 
            ) : (
            <Navbar />
            )}
          </div>
          <div className=" top-0 left-0 w-full h-full z-0">
            <BallAnimation />
          </div>
        </div>
      </div>
    </ThemeProvider>

  )
};

export default Page;
