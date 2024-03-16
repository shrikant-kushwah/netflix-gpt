import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

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

  return (
    <div className='absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
      <img className='w-48' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />

      {user && (<div className='flex p-4 gap-2'>
        <img className='w-12 h-12'
          src={user?.photoURL}
          alt="usericon" />
        <button onClick={handleSignOut} className='font-bold text-white cursor-pointer'>(Sign Out)</button>
        {/* {
<button
            className="ml-2 md:ml-4 cursor-pointer text-white px-2 py-2 h-10 mt-2 rounded bg-[#AA0101] md:bg-purple-600 md:hover:bg-purple-800 text-sm md:text-md"
            onClick={handleSignOut}>
            Sign Out
          </button>
        } */}
      </div>
      )}
    </div>
  )
}

export default Header
