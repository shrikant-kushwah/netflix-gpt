import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    // console.log(name);
    // console.log(email);
    // console.log(password);

    // name => name.current.value, 
    const message = checkValidData(
      email.current?.value,
      password.current?.value,
    );
    // console.log(message);
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
            photoURL: "https://avatars.githubusercontent.com/u/96473205?v=4"
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
          // console.log(user);
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
      <div className='absolute h-screen w-screen object-cover'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bg-img" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='absolute w-4/12 p-12 bg-black my-32 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-900 bg-opacity-70 rounded-lg' />)}
        <input
          ref={email}
          type="text"
          placeholder='Email or phone number'
          className='p-4 my-4 w-full bg-gray-900 bg-opacity-70 rounded-lg' />
        <input
          ref={password}
          type="password"
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-900 bg-opacity-70 rounded-lg' />

        <p className='text-red-600 font-light'>{errorMessage}</p>

        {isSignInForm && (<div className='flex justify-between items-center my-4 text-[12px] mb-[-10px]'>
          <label className='flex gap-2 items-center text-lg'><input className='w-6 h-6 cursor-pointer' type='checkbox' />Remember me</label>
          <a className='text-lg' href="/">Forgot password?</a>
        </div>)}

        <button type='button' className='p-2 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
          {isSignInForm ? <span className="font-semibold">Sign In</span> : <span className="font-semibold">Sign Up</span>}
        </button>

        <p className='py-4 cursor-pointer' onClick={toggleSignIn}>
          {isSignInForm ?
            <span className="text-gray-500">New to Netflix? <span className="text-blue-500 font-bold">Sign Up Now</span></span> :
            <span className="text-gray-500">Already registered? <span className="text-green-500 font-bold">Sign In Now</span></span>}
        </p>
      </form>
    </div>
  )
}

export default Login;
