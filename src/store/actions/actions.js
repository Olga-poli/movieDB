import * as constants from '../constants/constants';

export const setMoviesListAction = (movies) => ({
  type: constants.SET_MOVIES_LIST,
  payload: movies,
});

export const setFilteredMoviesByTitleAction = (inputValue) => ({
  type: constants.SET_FILTERED_MOVIES_BY_TITLE,
  payload: inputValue,
});

export const setMoviesOrderAction = (filterOrder) => ({
  type: constants.SET_MOVIES_ORDER,
  payload: filterOrder,
});

export const setActiveMovieIdAction = (activeMovieId) => ({
  type: constants.SET_ACTIVE_MOVIE_ID,
  payload: activeMovieId,
});

export const addLikeToMovieItemAction = (currentMovieId) => ({
  type: constants.ADD_LIKE_TO_MOVIE_ITEM,
  payload: currentMovieId,
});

export const removeLikeFromMovieItemAction = (currentMovieId) => ({
  type: constants.REMOVE_LIKE_FROM_MOVIE_ITEM,
  payload: currentMovieId,
});

export const setRatingToMovieItemAction = (movieId, currentIndex) => ({
  type: constants.SET_RATING_TO_MOVIE_ITEM,
  payload: { movieId, currentIndex },
});

export const removeMovieItemAction = (movieId) => ({
  type: constants.REMOVE_MOVIE_ITEM,
  payload: { movieId },
});

export const toggleActiveUserAction = (userName, activity) => ({
  type: constants.TOGGLE_ACTIVE_USER,
  payload: { userName, activity },
});
