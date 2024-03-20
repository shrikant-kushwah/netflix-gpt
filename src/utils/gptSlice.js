import {createSlice} from '@reduxjs/toolkit';

const gptSlice = createSlice({
  name:'gpt',
  initialState:{
    showGptPage:false,
    movieResults:null,
    movieNames:null,
  },
  reducers:{
    toggleGptPageView:(state)=>{
      state.showGptPage = !state.showGptPage;
    },
    addGptMovieResult:(state, action)=>{
      const {movieNames, movieResults} = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const {toggleGptPageView, addGptMovieResult} = gptSlice.actions;

export default gptSlice.reducer;