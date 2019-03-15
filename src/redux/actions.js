import { ADD_MOVIE, ADD_SHOW, LOG_IN } from './actionTypes'

export const addMovie = (id, movie) => ({
  type: ADD_MOVIE,
  payload: {
    id: id,
    movie: movie
  }
})

export const addShow = (id, show) => ({
  type: ADD_SHOW,
  payload: {
    id: id,
    show: show
  }
})

export const logIn = auth => ({
  type: LOG_IN,
  payload: auth
})
