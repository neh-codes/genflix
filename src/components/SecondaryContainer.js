import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';




const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div>
            <div className='bg-[#000000] pb-10'>
                  <div className='mt-0 md:-mt-56 relative z-20'>
                  <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
                  <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
                  <MovieList title={"Popular"} movies={movies.popularMovies} />
                  <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
                </div>
             </div>
             <div className='bg-[#d9232e] p-1'>
              
             </div>
    </div>
    )
  );
};

export default SecondaryContainer;