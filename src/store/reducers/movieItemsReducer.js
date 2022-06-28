import * as constants from '../constants/constants';

const initialState = {
  moviesItemsList: [],
  visibleMoviesItemsIDs: [],
  activeMovieId: null,
};

// eslint-disable-next-line default-param-last
const movieItemsReducer = (state = initialState, action) => {
  const { moviesItemsList } = state;
  switch (action.type) {
    case constants.SET_MOVIES_LIST: {
      return { ...state, moviesItemsList: action.payload, visibleMoviesItemsList: action.payload };
    }

    case constants.SET_FILTERED_MOVIES_BY_TITLE: {
      if (action.payload.length === 0) {
        return { ...state, moviesItemsList };
      }
      const sortedMovies = [...moviesItemsList]
        .filter(({ title }) => title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1);
      return { ...state, visibleMoviesItemsList: sortedMovies };
    }

    case constants.SET_MOVIES_ORDER: {
      if (!action.payload) {
        return { ...state };
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
      const sortedMovies = [...moviesItemsList].sort(map[action.payload.name]);
      return { ...state, moviesItemsList: sortedMovies };
    }

    case constants.SET_ACTIVE_MOVIE_ID: {
      return { ...state, activeMovieId: action.payload };
    }

    case constants.ADD_LIKE_TO_MOVIE_ITEM: {
      const currentMovieIndex = moviesItemsList.findIndex(({ id }) => id === action.payload);
      const currentLikesCount = moviesItemsList[currentMovieIndex].currentLikesCount + 1;
      const updatedMovie = { ...moviesItemsList[currentMovieIndex], currentLikesCount };
      const updatedMoviesItemsList = [
        ...moviesItemsList.slice(0, currentMovieIndex),
        updatedMovie,
        ...moviesItemsList.slice(currentMovieIndex + 1),
      ];
      return { ...state, moviesItemsList: updatedMoviesItemsList };
    }

    case constants.REMOVE_LIKE_FROM_MOVIE_ITEM: {
      const currentMovieIndex = moviesItemsList.findIndex(({ id }) => id === action.payload);
      const currentLikesCount = moviesItemsList[currentMovieIndex].currentLikesCount - 1;
      const updatedMovie = { ...moviesItemsList[currentMovieIndex], currentLikesCount };
      const updatedMoviesItemsList = [
        ...moviesItemsList.slice(0, currentMovieIndex),
        updatedMovie,
        ...moviesItemsList.slice(currentMovieIndex + 1),
      ];
      return { ...state, moviesItemsList: updatedMoviesItemsList };
    }

    case constants.SET_RATING_TO_MOVIE_ITEM: {
      const { movieId, currentIndex } = action.payload;
      const currentMovieIndex = moviesItemsList.findIndex(({ id }) => id === movieId);
      const updatedMovie = { ...moviesItemsList[currentMovieIndex], rating: currentIndex };
      const updatedMoviesItemsList = [
        ...moviesItemsList.slice(0, currentMovieIndex),
        updatedMovie,
        ...moviesItemsList.slice(currentMovieIndex + 1),
      ];
      return { ...state, moviesItemsList: updatedMoviesItemsList };
    }

    default: {
      return state;
    }
  }
};

export default movieItemsReducer;
