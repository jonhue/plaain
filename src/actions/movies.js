import FetchMovie from '../services/fetching/FetchMovie'

import { movieSelector } from '../selectors/movies'

export const ADD_MOVIE = 'ADD_MOVIE'
export const CLEAR_MOVIES = 'CLEAR_MOVIES'
export const FETCH_MOVIE = 'FETCH_MOVIE'

export const addMovie = movie => ({
  type: ADD_MOVIE,
  payload: movie
})

export const clearMovies = () => ({
  type: CLEAR_MOVIES
})

export const fetchMovie = movieId => {
  return (dispatch, getState) => {
    dispatch(fetchMovieBegin(movieId))

    const movie = movieSelector(movieId)(getState())
    new FetchMovie(movie).perform().then(newMovie => {
      newMovie.progress = movie.progress
      dispatch(addMovie(newMovie))
    }).catch(() => dispatch(fetchMovie(movieId)))
  }
}

const fetchMovieBegin = movieId => ({
  type: FETCH_MOVIE,
  payload: movieId
})
