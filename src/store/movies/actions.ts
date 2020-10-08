import { MoviesActionTypes, REMOVE_MOVIE, UPDATE_MOVIE } from './types'
import { Movie } from '../../types/items/Movie'

export const updateMovie = (movie: Movie): MoviesActionTypes => ({
  type: UPDATE_MOVIE,
  payload: { movie },
})

export const removeMovie = (id: string): MoviesActionTypes => ({
  type: REMOVE_MOVIE,
  payload: { id },
})
