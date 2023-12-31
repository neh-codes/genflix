import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:'movies',
    initialState: {
        nowPlayingMovies: null,
        trailerVideo : null,
    },
    reducers:{
        addNowPlayingMovies: (state, action) =>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) =>{
            state.popularMovies = action.payload;
        },
        topRatedMovies: (state, action) =>{
            state.topRatedMovies = action.payload;
        },
        upcomingMovies: (state, action) =>{
            state.upcomingMovies = action.payload;
        },
        addTrailerVideo: (state,action) => {
            state.trailerVideo = action.payload;
        }
        
    }
})

export const {addNowPlayingMovies, addTrailerVideo, addPopularMovies, topRatedMovies, upcomingMovies} = movieSlice.actions;

export default movieSlice.reducer;