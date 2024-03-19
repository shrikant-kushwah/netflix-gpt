import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptPageView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice'


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptPage = useSelector((store) =>store.gpt.showGptPage);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      }).catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsbscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptPageClick = () => {
    // Toggle my Gpt Page
    dispatch(toggleGptPageView());
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className='absolute flex justify-between w-screen px-4 py-1 bg-gradient-to-b from-black z-10'>
      <img className='w-48' src={LOGO} alt="logo" />

      {user && (<div className='flex p-4 gap-2'>
       {showGptPage && ( <select
          onChange={handleLanguageChange}
          className='bg-gray-800 text-white p-2 m-2 rounded-md'>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option
              className='bg-white text-black rounded-lg'
              key={lang.identifier}
              value={lang.identifier}>
              {lang.name}
            </option>))};
        </select>)};
        <button 
        onClick={handleGptPageClick} 
        className='py-2 px-2 mx-4 my-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold'
        >
          {showGptPage ? "Home" : "GPT Search"}
          </button>
        <img className='w-10 h-10 mt-2 rounded-lg flex justify-center'
          src={user?.photoURL}
          alt="usericon" />
        <button onClick={handleSignOut} className='py-2 px-2 mx-4 my-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold'>Sign Out</button>
      </div>
      )}
    </div>
  )
}

export default Header
