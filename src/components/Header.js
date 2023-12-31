import React from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import {onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import {changeLanguage} from '../utils/configSlice';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch ();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);


  const handleSignOut = () =>{
    signOut(auth).then(() => {
    
    }).catch((error) => {
      navigate("/error");
    });
  }

  useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (user) => {
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

    return () => unsubscribe();
  }, []);


  const handleGptSearchClick = () =>{
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className='absolute z-10 w-full bg-gradient-to-b from-black p-2 flex justify-between'>
      <img alt='logo' className='w-32 md:w-44' src={LOGO}/>
      {user && (<div className='flex flex-row p-2'>
        {showGptSearch && (<select onChange={handleLanguageChange} className='h-10 mr-2 rounded text-white bg-gray-700 p-2'>
          {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>)}
        <button className='bg-[#d9232e] text-white rounded h-10 px-4 mr-2' onClick={handleGptSearchClick}>{showGptSearch ? "HomePage" : "GPT Search"}</button>
        <img alt='user-icon' className='w-10 h-10 mx-2' src={user?.photoURL}/>
      <button className='flex text-white mt-2 font-bold' onClick={handleSignOut}>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header