import React from 'react'
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const MovieList = ({ title, movies }) => {
  return (
    <div className='px-6'>
      <h1 className='text-md md:text-3xl py-4 text-white'>{title}</h1>
      <div className='flex overflow-x-scroll'>
        <div className='flex'>
          {movies?.map((movie) => (
            <Link to={"/movie/" + movie.id} key={movie.id}>
          <MovieCard posterPath={movie.poster_path} />
          </Link>
          ))}
        </div>
      </div>
    </div>
  )
};

export default MovieList;
