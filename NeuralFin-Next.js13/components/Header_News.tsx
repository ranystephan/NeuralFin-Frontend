import React, { useContext, useEffect } from 'react'
import Link from 'next/link'

const styles = {
  headerContainer: 'w-screen flex',
  leftHeader: 'flex w-1/2 gap-8 ml-5 mt-3 lg:text-2xl text-xl',
  logo: 'object-cover cursor-pointer',
  rightHeader: 'flex w-1/2 gap-8 mr-5 mt-3 text-2xl',
  logoname: 'cursor-pointer font-bold hover:text-purple-700 duration-300 text-black',
  menuItem: 'cursor-pointer font-bold hover:text-purple-700 duration-300',
}

const Header_News = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftHeader}>
        {/* go to home page on click of neuralfin */}
        <Link href={"/"}>
          <div className={styles.logoname}>neuralfin</div>
        </Link>
      </div>
      <div className={styles.rightHeader}>

      </div>
    </div>
  )
}

export default Header_News