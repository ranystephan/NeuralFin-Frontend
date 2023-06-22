import React from 'react'
import Link from 'next/link'

import Image from 'next/image'

import transLogo from '@/public/neuralfinLogo/transLogo.png';

const styles = {
  container: 'flex w-screen h-14 py-2 pl-2 pr-4 lg:px-24 lg:py-3 lg:mb-5 fixed justify-between z-10 text-white bg-transparent backdrop-filter backdrop-blur',
  leftHeader: 'flex flex-1 text-black items-center text-2xl',
  logo: 'object-cover cursor-pointer',
  searchWrapper: 'flex flex-1',
  searchInputContainer:
    'text-white items-center flex flex-1 ml-10 border border-gray-400 mr-10 hover:bg-[#1E2123] duration-300 p-3 rounded-lg',
  searchIcon: 'text-gray-400 text-3xl mr-3',
  searchInputWrapper: 'text-gray-400 text-lg w-full',
  searchInput: 'bg-transparent outline-none w-full',
  rightHeader: 'flex items-center justify-end  gap-8',
  menuItem: 'cursor-pointer font-bold hover:text-purple-500 duration-300'
}

const DashboardHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftHeader}>
        {/* go to home page on click of neuralfin */}
          <h2 className="lg:w-20 w-14">
            <Link href={"/"}>
              <Image src={transLogo} alt="logo"/>
            </Link>
          </h2> 
      </div>
      {/* <div className={styles.searchWrapper}>
        <div className={styles.searchInputContainer}>
          <AiOutlineSearch className={styles.searchIcon} />
          <div className={styles.searchInputWrapper}>
            <input placeholder='Search...' className={styles.searchInput} />
          </div>
        </div>
      </div> */}
      <div className={styles.rightHeader}>
        <Link href={"/news"}>
          <div className={styles.menuItem}>News</div>
        </Link>
        <Link href={"/profile"}>
          <div className={styles.menuItem}>Profile</div>
        </Link>
        
      </div>
    </div>
  )
}

export default DashboardHeader