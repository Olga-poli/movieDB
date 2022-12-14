import { createSlice } from '@reduxjs/toolkit';
import { fetchMoviesList, fetchMovieDetails } from '../actions/actions';

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    moviesItemsList: [],
    language: 'en',
    isError: false,
    isLoading: false,
    isAuthorized: false,
  },
  reducers: {
    setFilteredMoviesByTitle: (store, action) => {
      if (action.payload.length === 0) {
        store.moviesItemsList = store.moviesItemsList.map((item) => ({ ...item, toShow: true }));
      }
      store.moviesItemsList = store.moviesItemsList.map((item) => (
        item.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1
          ? { ...item, toShow: true }
          : { ...item, toShow: false }
      ));
    },
    setMoviesOrder: (store, action) => {
      if (!action.payload) {
        return;
      }
      const map = {
        likes: (a, b) => (
          action.payload.descending
            ? b.currentLikesCount - a.currentLikesCount
            : a.currentLikesCount - b.currentLikesCount
        ),
        rating: (a, b) => (
          action.payload.descending
            ? b.rating - a.rating
            : a.rating - b.rating
        ),
      };
      store.moviesItemsList = store.moviesItemsList.sort(map[action.payload.name]);
    },
    addLikeToMovieItem: (store, action) => {
      store.moviesItemsList = store.moviesItemsList.map((item) => (
        item.id === action.payload
          ? { ...item, currentLikesCount: item.currentLikesCount + 1 }
          : item
      ));
    },
    removeLikeFromMovieItem: (store, action) => {
      store.moviesItemsList = store.moviesItemsList.map((item) => (
        item.id === action.payload
          ? { ...item, currentLikesCount: item.currentLikesCount - 1 }
          : item
      ));
    },
    setRatingToMovieItem: (store, action) => {
      store.moviesItemsList = store.moviesItemsList.map((item) => (
        item.id === action.payload.movieId
          ? { ...item, rating: action.payload.index }
          : item
      ));
    },
    removeMovieItem: (store, action) => {
      store.moviesItemsList = store.moviesItemsList.filter(({ id }) => id !== action.payload);
    },
    updateMovieItem: (store, action) => {
      store.moviesItemsList = store.moviesItemsList.map((item) => (
        item.id === action.payload.id
          ? { ...item, ...action.payload.newMovieData }
          : item
      ));
    },
    setAppLanguage: (store, action) => {
      store.language = action.payload;
    },
    setUserAuthorization: (store, action) => {
      store.isAuthorized = action.payload;
    },
  },
  extraReducers: {
    [fetchMoviesList.pending]: (store) => {
      store.isLoading = true;
      store.isLoaded = false;
    },
    [fetchMoviesList.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.isLoaded = true;
      store.moviesItemsList = action.payload;
    },
    [fetchMoviesList.rejected]: (store) => {
      store.isLoading = false;
      store.isLoaded = false;
      store.isError = true;
    },
    [fetchMovieDetails.pending]: (store) => {
      store.isLoading = true;
    },
    [fetchMovieDetails.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.moviesItemsList = store.moviesItemsList.map((item) => (
        item.id === action.payload.id
          ? { ...action.payload, ...item, isLoaded: true }
          : item
      ));
    },
    [fetchMovieDetails.rejected]: (store) => {
      store.isLoading = false;
      store.isError = true;
    },
  },
});

export const {
  setFilteredMoviesByTitle,
  setMoviesOrder,
  addLikeToMovieItem,
  removeLikeFromMovieItem,
  setRatingToMovieItem,
  removeMovieItem,
  updateMovieItem,
  setAppLanguage,
  setUserAuthorization,
} = catalogSlice.actions;

export default catalogSlice.reducer;
