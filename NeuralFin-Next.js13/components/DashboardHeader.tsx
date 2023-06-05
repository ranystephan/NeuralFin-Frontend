import React from 'react'
import Link from 'next/link'

const styles = {
  container: 'flex w-screen h-14 px-24 py-3 mb-5 fixed justify-between z-10 text-white bg-transparent backdrop-filter backdrop-blur',
  leftHeader: 'flex flex-1text-black items-center gap-8 text-2xl',
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
        <Link href={"/"}>
          <div className={styles.menuItem}>neuralfin</div>
        </Link>
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
        <Link href={"/user"}>
          <div className={styles.menuItem}>Profile</div>
        </Link>
        
      </div>
    </div>
  )
}

export default DashboardHeader