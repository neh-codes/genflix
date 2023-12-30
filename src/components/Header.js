import React from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch ();
  const user = useSelector(store => store.user);

  const handleSignOut = () =>{
    signOut(auth).then(() => {
    
    }).catch((error) => {
      navigate("/error");
    });
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid:uid, 
          email:email, 
          displayName: displayName, 
          photoURL:photoURL
        })
        );
        navigate("/browse");


      } else {
       dispatch(removeUser());
       navigate("/");
      }
    });
  }, []);


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