'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

const styles = {


}


const UserPage: React.FC = () => {
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
    <div>
      <div className=' font-extrabold text-2xl'>User Page</div>

      <div>
        <a href="#" className="nav-link active" onClick={logout}>Logout</a>
      </div>

    </div>


  );
};

export default UserPage;
