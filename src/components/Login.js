import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  

  const handleButtonClick = () =>{
    const message= checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);

    if(message) return;

    if(!isSignInForm){
          createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current.value, 
              photoURL: USER_AVATAR
            }).then(() => {
              const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(
                addUser({uid: uid, 
                          email: email, 
                          displayName: displayName, 
                          photoURL: photoURL,
                        })
                        );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
            console.log(user);
            
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode +"-"+ errorMessage);
          });

    }else{
      signInWithEmailAndPassword(auth,  email.current.value,password.current.value)
      .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode +"-"+ errorMessage);
  });

    }

  }

  const toggleSignInFrom = () =>{
    setIsSignInForm(!isSignInForm);
  }

  
  return (
    <div className='h-screen bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg)]' style={{backgroundSize: 'cover'}}>
      <div className='bg-[rgba(0,0,0,.45)] h-full'>
      <Header/>
      <div className='flex justify-center align-middle mt-4'>
        
      <form onSubmit={(e)=>e.preventDefault()} className='flex flex-col mt-2 w-3/4 md:w-1/4 px-5 py-10 md:py-20 rounded bg-[rgba(0,0,0,.70)] text-white'>
      <h1 className=' m-2 font-medium text-3xl'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
      {!isSignInForm && (
        <input ref={name} type='text' placeholder='Full Name' className='p-2 m-2 rounded bg-slate-800'/>
      )}
      <input ref={email} type='text' placeholder='Email' className='p-2 m-2 rounded bg-slate-800'/>   
        <input ref={password} type='password' placeholder='Password' className='p-2 m-2 rounded bg-slate-800'/>
        <button className='px-4 py-2 rounded m-2 bg-[#D9232E]' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='text-[#D9232E] m-2 font-bold'>{errorMessage}</p>
        <p className='mx-2 my-8 cursor-pointer' onClick={toggleSignInFrom}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
      </form>
      </div>
      </div>
    </div>
  )
}

export default Login;