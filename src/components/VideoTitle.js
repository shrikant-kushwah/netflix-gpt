import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-36 px-12'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='text-lg py-6 w-1/4'>{overview}</p>
      <div>
        <button className='bg-gray-500 text-white p-2 px-12 text-xl bg-opacity-60 rounded-lg'>▶ play</button>
        <button className='mx-2 bg-gray-500 text-white p-2 px-12 text-xl bg-opacity-60 rounded-lg'>ℹ️ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
