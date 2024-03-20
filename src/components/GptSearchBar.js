import React, { useRef } from 'react';
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import { useDispatch } from 'react-redux';


const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=' +
      movie +
      '&include_adult=false&language=en-US&page=1', API_OPTIONS);

    const json = await data.json();

    return json.results;
  };


  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API call to GPT API and get Movie Results

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholey, Don, Golmaal, Koi Mil Gya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    // console.log(gptResults.choices);

    if (!gptResults.choices) {
      // TODO: Write  Error Handling 
    }
    console.log(gptResults.choices?.[0]?.message?.content);

    // "Andaz Apna Apna, Chupke Chupke, Angoor, Khatta Meetha, Chhoti Si Baat"
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    // ['Andaz Apna Apna', ' Chupke Chupke', ' Angoor', ' Khatta Meetha', ' Chhoti Si Baat']

    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);

    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
  };

  return (
    <div className='pt-[10%] flex justify-center'>
      <form
        className='w-1/2 bg-sky-900 grid grid-cols-12 rounded-lg'
        onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          className='p-4 m-2 col-span-9 rounded-lg'
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className='py-2 px-4 m-4 bg-red-600 text-white rounded-lg col-span-3'
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar
