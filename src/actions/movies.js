import FetchMovie from '../services/fetching/FetchMovie'

import { movieSelector } from '../selectors/movies'

export const REMOVE_MOVIE = 'REMOVE_MOVIE'
export const UPDATE_MOVIE = 'UPDATE_MOVIE'

export const fetchMovie = id => {
  return (dispatch, getState) => {
    const movie = movieSelector(id)(getState())
    return new FetchMovie(movie.id, movie.name).perform().then(fetchedMovie => {
      dispatch(updateMovie(fetchedMovie))
    }).catch(error => console.log(error))
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
