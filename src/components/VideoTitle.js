import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute w-full aspect-video bg-gradient-to-r from-black text-white pt-[20%] px-16'>
      <h1 className='text-5xl font-extrabold w-[45%]'>{title}</h1>
      <p className='w-[37%] mt-2 mb-4'>{overview}</p>
      <button className='bg-white text-black rounded px-6 py-2 hover:bg-opacity-80'>Play &#x25B6;</button>
      <button className='bg-gray-500 rounded px-6 py-2 mx-2'>🛈 More Info</button>
    </div>
  )
}

export default VideoTitle