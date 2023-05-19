'use client';


import { Navbar, UserNavbar } from '@/components';
import { ThemeProvider } from 'next-themes';
import React, { useEffect, useContext } from 'react';
import '@/styles/globals.css'
import { AuthContext } from '@/contexts/AuthContext';
import Grainy from '@/components/Grainy';
import LineAnimation from '@/components/LineAnimation';



const Page: React.FC = () => {
  const { auth, updateAuth } = useContext(AuthContext);


  useEffect(() => {
    const abortController = new AbortController();
    (
      async () => {
        try {
          const apiUrl_deployed = `https://neuralfin-backend-production.up.railway.app/api/user`;
          const apiUrl_local = `http://localhost:8000/api/user`;
          const response = await fetch(apiUrl_deployed, {
            credentials: 'include',
            signal: abortController.signal,
          });
        
          if (!response.ok) {
            throw new Error('Network response was not ok from user fetch');
          }

          const content = await response.json()

          updateAuth({ isAuthenticated: true, user: {id: content.id, name: content.name, email: content.email} });
          console.log('Logged in');
          console.log(auth.user?.name);
        } catch (err) {
          if (err instanceof Error) {
            console.log(err.message);
          } else {
            console.log('Something went wrong', err);
          }

          updateAuth({ isAuthenticated: false, user: null });

          console.log('Not logged in!!');
        }

      }
    )();
    return () => {abortController.abort();};

  }, []);


  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (

    <ThemeProvider attribute="class">
      <div ref={scrollContainerRef} className=" overflow-y-scroll scrollbar-hide">
        {/* set the navbar over BallAnimation */}
        <div className="flex-col page-container h-screen w-screen relative">
          <div className="">
            {auth.isAuthenticated == true ? (
              <UserNavbar  name={auth.user?.name !== undefined ? auth.user.name : ''}  /> 
            ) : (
            <Navbar />
            )}
          </div>
          <div className="m-16" >
            {/* <BallAnimation /> */}
            <Grainy />
          </div>
          <div>
            <LineAnimation scrollContainer={scrollContainerRef.current}/>
          </div>
        </div>
      </div>
    </ThemeProvider>

  )
};

export default Page;
