import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
 if(!posterPath) return null; 
  return (
    <div className='md:w-40 w-36 px-2 py-1 cursor-pointer'>
      <img alt='Movie Card' className='rounded-lg shadow' src={IMG_CDN_URL + posterPath}/>
    </div>
  )
}

export default MovieCard