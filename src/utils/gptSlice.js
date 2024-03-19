import {createSlice} from '@reduxjs/toolkit';

const gptSlice = createSlice({
  name:'gpt',
  initialState:{
    showGptPage:false,
  },
  reducers:{
    toggleGptPageView:(state)=>{
      state.showGptPage = !state.showGptPage;
    },
  },
});

export const {toggleGptPageView} = gptSlice.actions;

export default gptSlice.reducer;