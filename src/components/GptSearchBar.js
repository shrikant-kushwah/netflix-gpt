import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux';

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 bg-sky-900 grid grid-cols-12 rounded-lg'>
        <input
          type="text"
          className='p-4 m-2 col-span-9 rounded-lg'
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className='py-2 px-4 m-4 bg-red-600 text-white rounded-lg col-span-3'>
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
