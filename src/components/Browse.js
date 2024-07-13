import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptPage from './GptPage';
import { useSelector } from 'react-redux';

const Browse = () => {

  const showGptPage = useSelector((store) => store.gpt.showGptPage);

  
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {
        showGptPage ? (
          <GptPage />
        ) : (
          <>
            <MainContainer />
            <SecondaryContainer />
          </>
        )
      }


      {/*
       mainContainer
           - VideoBackground
           - VudeoTitle
       SecondaryContainer
           - MovieList * n
           - cards * n
       */}
    </div>
  )
}

export default Browse
