import {
  MoviesActionTypes,
  MoviesState,
  REMOVE_MOVIE,
  UPDATE_MOVIE,
} from './types'

const initialState: MoviesState = {}

export default (
  state = initialState,
  action: MoviesActionTypes,
): MoviesState => {
  switch (action.type) {
    case UPDATE_MOVIE:
      return { ...state, [action.payload.movie.id]: action.payload.movie }
    case REMOVE_MOVIE:
      const { [action.payload.id]: movie, ...movies } = state

      return movies
    default:
      return state
  }
}
