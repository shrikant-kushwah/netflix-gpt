import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_IMAGE, USER_AVATAR } from '../utils/constants';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    const message = checkValidData(
      email.current?.value,
      password.current?.value,
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          }).then(() => {
            // Profile updated!
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL
            })
            );
          })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img className='w-screen h-screen object-cover' src={BG_IMAGE} alt='BG_IMAGE' />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='absolute w-10/12 md:w-4/12 p-4 md:p-12  md:py-1 bg-black my-20 md:my-24 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-2xl md:text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder='Full Name'
            className='p-4 my-2 md:my-4 w-full bg-gray-900 bg-opacity-70 rounded-lg' />)}
        <input
          ref={email}
          type="text"
          placeholder='Email or phone number'
          className='p-4 my-2 md:my-4 w-full bg-gray-900 bg-opacity-70 rounded-lg' />
        <input
          ref={password}
          type="password"
          placeholder='Password'
          className='p-4 my-2 md:my-4 w-full bg-gray-900 bg-opacity-70 rounded-lg' />

        <p className='text-red-600 font-light'>{errorMessage}</p>

        {isSignInForm && (<div className='flex justify-between items-center my-2 text-[12px] mb-[-10px]'>
          <label className='flex gap-2 items-center text-sm md:text-lg'><input className='w-6 h-6 cursor-pointer' type='checkbox' />Remember me</label>
          <a className='text-sm md:text-lg' href="/">Forgot password?</a>
        </div>)}

        <button type='button' className='p-2 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
          {isSignInForm ? <span className="font-semibold">Sign In</span> : <span className="font-semibold">Sign Up</span>}
        </button>

        <p className='py-2 md:py-4 cursor-pointer' onClick={toggleSignIn}>
          {isSignInForm ?
            <span className="text-gray-500">New to Netflix? <span className="text-blue-500 font-bold">Sign Up Now</span></span> :
            <span className="text-gray-500">Already registered? <span className="text-green-500 font-bold">Sign In Now</span></span>}
        </p>
      </form>
    </div>
  )
}

export default Login;
