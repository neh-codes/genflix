import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants';

const GPTSearch = () => {
  return (
    <div className='h-screen' style={{backgroundSize: 'cover', backgroundImage: `url(${BG_URL})`}}>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GPTSearch