import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute w-full aspect-video bg-gradient-to-r from-black text-white pt-[17%] px-8 md:px-16'>
      <h1 className='text-2xl md:text-5xl font-extrabold md:w-[45%]'>{title}</h1>
      <p className='hidden md:block w-[37%] mt-2 mb-6'>{overview}</p>
      <button className='bg-white text-black rounded px-4 md:px-6 py-2 hover:bg-opacity-80 mt-4 md:mt-0'>Play &#x25B6;</button>
      <button className='hidden md:inline-block bg-gray-500 rounded px-6 py-2 mx-2'>🛈 More Info</button>
    </div>
  )
}

export default VideoTitle