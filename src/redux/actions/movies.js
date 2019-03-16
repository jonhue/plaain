import { ADD_MOVIE } from './actionTypes'

export const addMovie = movie => ({
  type: ADD_MOVIE,
  payload: movie
})
