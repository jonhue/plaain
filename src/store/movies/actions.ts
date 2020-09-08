import { Movie } from '../../types/media_items/Movie'
import { MoviesActionTypes, REMOVE_MOVIE, UPDATE_MOVIE } from './types'

export const updateMovie = (movie: Movie): MoviesActionTypes => ({
  type: UPDATE_MOVIE,
  payload: { movie },
})

export const removeMovie = (id: number): MoviesActionTypes => ({
  type: REMOVE_MOVIE,
  payload: { id },
})
