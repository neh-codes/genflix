import React from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  return (
    <div className='bg-gradient-to-b from-black p-2 flex justify-between'>
      <img alt='logo' className='w-32 md:w-44' src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'/>
      {user && (<div className='flex p-2 align-middle'>
        <img alt='user-icon' className='w-10 h-10 mx-2' src={user?.photoURL}/>
      <button className='flex text-white mt-2 font-bold' onClick={handleSignOut}>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header