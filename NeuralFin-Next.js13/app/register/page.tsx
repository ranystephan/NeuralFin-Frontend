'use client'

import { useEffect, useState } from 'react';
import '@/styles/globals.css';
import transLogo from '@/public/neuralfinLogo/transLogo.png';
import Image from 'next/image';


const styles = {
  container: " h-screen w-screen overflow-hidden bg-purple-100",
  shape1: "absolute top-0 -left-4 w-96 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob1 ",
  shape2: "absolute top-0 -right-4 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob2",
  shape3: "absolute bottom-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob3",
  shape4: "absolute bottom-0 -left-4 w-96 h-96 bg-green-700 rounded-3xl mix-blend-multiply filter blur-3xl animate-blob4",
  blobContainer: "flex flex-col items-center justify-center w-full z-0",
  loginContainer: "absolute inset-0 flex justify-center items-center z-5 bg-white bg-opacity-25",
  login: "w-96 h-2/3 rounded z-10 flex flex-col items-center",
  logo: "w-20 h-20 rounded-2xl mt-2",
  loginHeader: "text-2xl font-bold ",
  emailForm: "w-80 h-16 bg-white border border-gray-300 border-2 rounded-xl mt-10 items-center justify-center flex text-gray-400",
  passwordForm: "w-80 h-16 bg-white border border-gray-300 border-2 rounded-xl mt-3 items-center justify-center flex text-gray-400",
  loginButton: "w-40 h-10 bg-white rounded-xl mt-12 bg-gradient-to-r from-purple-400 to-blue-500 items-center justify-center flex text-gray-400 hover:text-white font-bold",
  forgotPassword: "text-sm mt-4 text-blue-700",

}


const RegisterPage = () => {
  

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
            <Image src={transLogo} alt="logo" width={250} height={250} />
          </div>
          <div className={styles.loginHeader}>Welcome</div>
          <div className={styles.emailForm}>EMAIL</div>
          <div className={styles.passwordForm}>PASSWORD</div>
          <div className={styles.loginButton}>Continue</div>
          <div className={styles.forgotPassword}>Forgot your password?</div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
