'use strict'
'use client'


import { SyntheticEvent, useEffect, useState } from 'react';
import '@/styles/globals.css';
import transLogo from '@/public/neuralfinLogo/transLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';



const styles = {
  container: " h-screen w-screen overflow-hidden bg-purple-100",
  shape1: "absolute top-0 -left-4 w-96 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob1 ",
  shape2: "absolute top-0 -right-4 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob2",
  shape3: "absolute bottom-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob3",
  shape4: "absolute bottom-0 -left-4 w-96 h-96 bg-green-700 rounded-3xl mix-blend-multiply filter blur-3xl animate-blob4",
  blobContainer: "flex flex-col items-center justify-center w-full z-0",
  loginContainer: "absolute inset-0 flex justify-center items-center z-5 bg-white bg-opacity-25",
  login: "w-2/3 h-5/6 rounded z-10 flex flex-col items-center",
  logo: "w-20 h-20 rounded-2xl mt-2",
  loginHeader: "text-2xl font-bold text-black pb-10 ",
  alreadyHaveAccount: "text-sm text-gray-500 mt-2 ",
  nameForm: "w-80 h-16 bg-opacity-60 backdrop-blur-md border border-gray-300 border-2 rounded-xl mt-3 items-center justify-center flex text-black  hover:bg-gray-200 duration-300",
  emailForm: "w-80 h-16 bg-opacity-60 backdrop-blur-md border border-gray-300 border-2 rounded-xl mt-10 items-center justify-center flex text-black  hover:bg-gray-200 duration-300",
  passwordForm: "w-80 h-16 border border-gray-300 border-2 rounded-xl mt-3 items-center justify-center flex text-black  hover:bg-gray-200 duration-300",
  loginButton: "w-40 h-10 rounded-md bg-red-700 mt-12 mx-auto items-center justify-center flex text-gray-400 hover:text-white font-bold hover:w-44 hover:h-12 duration-300 ",
  forgotPassword: "text-sm mt-4 text-blue-700  hover:font-bold duration-300",

}


const UserPage = () => {
  const { auth, updateAuth } = useContext(AuthContext);

  const router = useRouter();



  const logout = async () => {
    const apiUrl_deployed = `https://neuralfin-backend-production.up.railway.app/api/logout`;
    const apiUrl_local = `http://localhost:8000/api/logout`;
    await fetch(apiUrl_deployed, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
    

    updateAuth({ isAuthenticated: false, user: null });
    console.log('Logged out');
    console.log(auth.user?.name);
    router.push('/'); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.blobContainer}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
        <div className={styles.shape4}></div>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.login}>
          <div className={styles.logo}>
            <Link href={"/"}>
              <Image src={transLogo} alt="logo" width={250} height={250} />
            </Link>
          </div>
          <div className={styles.loginHeader}>Profile</div>
          <div className='w-full h-full bg-black bg-opacity-20 rounded-2xl px-10  '>
            <div className=' text-2xl font-bold py-5'>User Info</div>
            <div className='flex flex-row items-center px-5'>
              <div className=' text-xl font-bold py-5 px-5'>Name: </div>
              <div className=' text-xl font-bold py-5 w-auto h-5 flex items-center bg-black bg-opacity-25 rounded-2xl px-3'>testuser </div>
            </div>
            <div className='flex flex-row items-center px-5'>
              <div className=' text-xl font-bold py-5 px-5'>Email: </div>
              <div className=' text-xl font-bold py-5 w-auto h-5 flex items-center bg-black bg-opacity-25 rounded-2xl px-3'>testuser@testuser.com </div>
            </div>
            <div className=' text-2xl font-bold py-5'>User Metrics</div>

            <div className='flex flex-row items-center px-5'>
              <div className=' text-xl font-bold py-5 px-5'>Age: </div>
              <div className=' text-xl font-bold py-5 w-auto h-5 flex items-center bg-black bg-opacity-25 rounded-2xl px-3'>20 </div>
            </div>
            <div className='flex flex-row items-center px-5'>
              <div className=' text-xl font-bold py-5 px-5'>Financial Experience: </div>
              <div className=' text-xl font-bold py-5 w-auto h-5 flex items-center bg-black bg-opacity-25 rounded-2xl px-3'>Average </div>
            </div>
            <div className='flex flex-row items-center px-5'>
              <div className=' text-xl font-bold py-5 px-5'>Frequency of trades: </div>
              <div className=' text-xl font-bold py-5 w-auto h-5 flex items-center bg-black bg-opacity-25 rounded-2xl px-3'>Monthly </div>
            </div>
            <div className='flex flex-row items-center px-5'>
              <div className=' text-xl font-bold py-5 px-5'>Risk Averseness: </div>
              <div className=' text-xl font-bold py-5 w-auto h-5 flex items-center bg-black bg-opacity-25 rounded-2xl px-3'>7 / 10 </div>
            </div>

          </div>
          

          <button className={styles.loginButton} type='submit' onClick={logout}>
            Log out<span style={{ marginLeft: '10px' }}></span><FontAwesomeIcon icon={faArrowRight} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default UserPage;
