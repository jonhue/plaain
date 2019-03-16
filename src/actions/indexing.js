import IndexItems from '../services/indexing/IndexItems'

import { addMovie, fetchMovie } from './movies'
import { addShow, fetchShow } from './shows'

export const INDEX_BEGIN = 'INDEX_BEGIN'
export const INDEX_SUCCESS = 'INDEX_SUCCESS'
export const INDEX_FAILURE = 'INDEX_FAILURE'

export const index = () => {
  return (dispatch, getState) => {
    dispatch(indexBegin())

    new IndexItems(getState().auth).perform().then(({ movies, shows }) => {
      movies.filter(movie => !Object.keys(getState().movies).include(movie.id)).forEach(movie => {
        dispatch(addMovie(movie))
        dispatch(fetchMovie(movie))
      })
      shows.filter(show => !Object.keys(getState().shows).include(show.id)).forEach(show => {
        dispatch(addShow(show))
        dispatch(fetchShow(show))
      })

      dispatch(indexSuccess())
    }, error => dispatch(indexFailure(error)))
  }
}

const indexBegin = () => ({
  type: INDEX_BEGIN
})

const indexSuccess = () => ({
  type: INDEX_SUCCESS
})

const indexFailure = error => ({
  type: INDEX_FAILURE,
  payload: error
})
