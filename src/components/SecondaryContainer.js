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
        <div className='mt-0 md:-mt-64 relative z-20 pl-4 md:pl-12'>
          <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
          <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
        </div>
      </div>)
  )
}

export default SecondaryContainer;
