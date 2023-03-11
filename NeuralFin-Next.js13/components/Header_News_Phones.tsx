import React, { useContext, useEffect } from 'react'
import Link from 'next/link'

const styles = {
  leftHeader: 'flex flex-1 text-white items-center gap-8 ml-5 mt-3 text-2xl ',
  logo: 'object-cover cursor-pointer',
  rightHeader: 'flex items-center justify-end text-white gap-8 mr-5 mt-3 text-2xl',
  logoname: 'cursor-pointer font-bold hover:text-purple-700 duration-300 text-black',
  menuItem: 'cursor-pointer font-bold hover:text-purple-700 duration-300',
  searchForm: 'relative',
  searchInput: ' h-8 px-3 pr-8 text-sm w-28 focus:outline-none border-none placeholder-white placeholder:text-2xl',
  searchButton: 'absolute bg-green-500 hover:bg-green-700 h-8 right-0 rounded-full text-white w-8'
}

const Header_News_Phones = () => {
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // handle search submit here
  }

  return (
    <div className='page-container'>
      <div className='left-half'>
        <div className={styles.leftHeader}>
          {/* go to home page on click of neuralfin */}
          <Link href={"/"}>
            <div className={styles.logoname}>neuralfin</div>
          </Link>
        </div>
      </div>

      <div className='right-half'>
        <div className={styles.rightHeader}>
          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <input type="text" placeholder="search" className={styles.searchInput} style={{ backgroundColor: 'transparent'}} />
  {/*           <button type="submit" className={styles.searchButton}>🔍</button>*/}        
          </form>
        </div>

      </div>
    </div>
  )
}

export default Header_News_Phones;
