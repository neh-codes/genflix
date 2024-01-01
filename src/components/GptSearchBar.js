import React from 'react'
import lang from '../utils/languageConstants';
import {useDispatch, useSelector} from "react-redux";
import { useRef  } from 'react'
import openai from "../utils/openai";
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';


const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) =>{
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query'+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS)

    const json = await data.json();

    return json.results;
  }

  const handleGptSearchClick = async() => {

      const gptQuery = "Act as a Movie Recommendation system and suggest some movies for query: "+searchText.current.value+"only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if(!gptResults.choices){

      }
      console.log(gptResults.choices?.[0]?.message?.content);

      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
  
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);
    
      dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
    }

  

  return (
    <div className='pt-[50%] md:pt-[10%] flex justify-center bg-gradient-to-b from-black'>
        
        <form className='bg-[#000000d0] w-[96%] md:w-1/2 grid grid-cols-12 rounded' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-2 md:m-4 col-span-9 rounded' placeholder={lang[langKey].gptSearchPlaceholder} />
            <button className='m-2 md:m-4 bg-[#d9232e] col-span-3 rounded text-white' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar;