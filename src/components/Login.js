import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bg-img" />
      </div>
      <form className='absolute w-3/12 p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (<input
          type="text"
          placeholder='Full Name'
          className='p-4 my-4 w-full bg-gray-700' />)}
        <input
          type="text"
          placeholder='Email or phone number'
          className='p-4 my-4 w-full bg-gray-700' />
        <input
          type="password"
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700' />

        {isSignInForm && (<div className='flex justify-between items-center my-4 text-[13px] mb-[-10px]'>
          <label className='flex gap-2 items-center'><input className='w-4 h-4' type='checkbox' />Remember me</label>
          <a className='' href="/">Forgot password?</a>
        </div>)}

        <button className='p-2 my-6 bg-red-700 w-full rounded-lg bg-cover'>
          {isSignInForm ? <span className="font-semibold">Sign In</span> : <span className="font-semibold">Sign Up</span>}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignIn}>
          {isSignInForm ?
            <span className="text-gray-500">New to Netflix? <span className="text-blue-500 font-bold">Sign Up Now</span></span> :
            <span className="text-gray-500">Already registered? <span className="text-green-500 font-bold">Sign In Now</span></span>}
        </p>
      </form>
    </div>
  )
}

export default Login
