import FetchMovie from '../services/fetching/FetchMovie'

export const REMOVE_MOVIE = 'REMOVE_MOVIE'
export const UPDATE_MOVIE = 'UPDATE_MOVIE'

export const fetchMovie = movie => {
  return dispatch => {
    return new FetchMovie(movie).perform().then(fetchedMovie => {
      dispatch(updateMovie(fetchedMovie))
    }).catch(() => dispatch(fetchMovie(movie)))
  }
}

export const removeMovie = id => ({
  type: REMOVE_MOVIE,
  payload: id
})

export const updateMovie = movie => ({
  type: UPDATE_MOVIE,
  payload: movie
})
