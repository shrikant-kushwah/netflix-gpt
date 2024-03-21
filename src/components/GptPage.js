import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMAGE } from '../utils/constants';

const GptPage = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img className='w-screen h-screen object-cover md:' src={BG_IMAGE} alt="bg_img" />
      </div>
      <div className=''>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  )
}

export default GptPage
