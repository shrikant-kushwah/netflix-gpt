import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[17%] px-12 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='text-md py-4 w-1/4 font-thin'>{overview}</p>
      <div>
        <button className='bg-white text-black p-2 px-6 text-xl rounded-md hover:bg-opacity-80'>▶ Play</button>
        <button className='mx-2 bg-gray-500 text-white p-2 px-8 text-xl bg-opacity-50 rounded-md hover:bg-opacity-70'>ℹ️ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
