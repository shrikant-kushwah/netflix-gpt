import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMAGE } from '../utils/constants';

const GptPage = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img src={BG_IMAGE} alt="bg_img" />
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptPage
