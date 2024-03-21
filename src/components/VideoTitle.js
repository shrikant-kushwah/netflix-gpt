import React from 'react'
import {useNavigate} from 'react-router-dom';

const VideoTitle = ({title, overview,id}) => {
  const navigate = useNavigate();
  return (
    <div className='w-screen aspect-video pt-[20%] md:pt-[15%] px-6 md:px-12 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-xl md:text-5xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block text-md py-4 w-1/3 font-thin'>{overview}</p>
      <div className='my-2 md:m-0'>
        <button onClick={()=>navigate("/movie/1011985")} className='bg-white text-black py-1 md:py-2 px-2 md:px-6 text-xl rounded-md hover:bg-opacity-80'>▶ Play</button>
        <button className='hidden md:inline-block mx-2 bg-gray-500 text-white p-2 px-8 text-xl bg-opacity-50 rounded-md hover:bg-opacity-70'>ℹ️ More Info</button>
      </div>
    </div>
  );
};

export default VideoTitle;
