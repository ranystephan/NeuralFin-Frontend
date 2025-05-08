'use client'

import { SyntheticEvent, useState } from 'react';
import '@/styles/globals.css';
import transLogo from '@/public/neuralfinLogo/transLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


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
  loginHeader: "text-2xl font-bold text-black ",
  alreadyHaveAccount: "text-sm text-gray-500 mt-2 font-mono",
  nameForm: "w-80 h-16 bg-opacity-60 backdrop-blur-md border border-gray-300 border-2 rounded-xl mt-3 items-center justify-center flex text-black font-mono hover:bg-gray-200 duration-300",
  emailForm: "w-80 h-16 bg-opacity-60 backdrop-blur-md border border-gray-300 border-2 rounded-xl mt-10 items-center justify-center flex text-black font-mono hover:bg-gray-200 duration-300",
  passwordForm: "w-80 h-16 border border-gray-300 border-2 rounded-xl mt-3 items-center justify-center flex text-black font-mono hover:bg-gray-200 duration-300",
  loginButton: "w-40 h-10 rounded-md bg-blue-700 mt-12 mx-auto items-center justify-center flex text-gray-400 hover:text-white font-bold hover:w-44 hover:h-12 duration-300 font-mono",
  forgotPassword: "text-sm mt-4 text-blue-700 font-mono hover:font-bold duration-300",
}


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
  
    try {
      const apiUrl_deployed = `https://api.neuralfin.xyz/api/register`;
      const apiUrl_local = `http://localhost:8000/api/register`;

      const response = await fetch(apiUrl_deployed, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Redirect to login page after successful registration
      window.location.href = '/login';
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error appropriately
    }
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
          <div className={styles.loginHeader}>Welcome!</div>
          <div className={styles.alreadyHaveAccount}>
            <Link href={"/login"}>
              <span className="cursor-pointer hover:text-purple-700 duration-300">
                Already have an account?
              </span>
            </Link>
          </div>
          <form onSubmit={submit}>
            <input type='text' placeholder='name' className={styles.emailForm} required
              onChange={e => setName(e.target.value)}
            />
            <input type='email' placeholder='email' className={styles.emailForm} required
              onChange={e => setEmail(e.target.value)}
            />
            <input type='password' placeholder='password' className={styles.passwordForm} required
              onChange={e => setPassword(e.target.value)}
            />
            <button className={styles.loginButton} type='submit'>
              continue<span style={{ marginLeft: '10px' }}></span><FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
