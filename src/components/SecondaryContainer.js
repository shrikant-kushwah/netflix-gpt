import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className='bg-black'>
        {/*
       MovieList - Popular
            - MovieCard * n
       MovieList - Now Playing
            - MovieCard * n
       MovieList - Trending
            - MovieCard * n
       MovieList - Horror
            - MovieCard * n
       */}
        <div className='-mt-64 relative z-20 pl-12'>
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        </div>
      </div>)
  )
}

export default SecondaryContainer;
