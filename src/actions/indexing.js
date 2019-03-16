import IndexItems from '../services/indexing/IndexItems'

import { addMovie, clearMovies, fetchMovie } from './movies'
import { addShow, clearShows, fetchShow } from './shows'

export const INDEX_BEGIN = 'INDEX_BEGIN'
export const INDEX_SUCCESS = 'INDEX_SUCCESS'
export const INDEX_FAILURE = 'INDEX_FAILURE'

export const index = () => {
  return (dispatch, getState) => {
    dispatch(indexBegin())

    new IndexItems(getState().auth.token).perform().then(({ movies, shows }) => {
      dispatch(clearMovies())
      console.log(movies)
      movies.forEach(movie => {
        console.log(movie)

        dispatch(addMovie(movie))
        dispatch(fetchMovie(movie))
      })
      dispatch(clearShows())
      console.log(shows)
      shows.forEach(show => {
        console.log(show)

        dispatch(addShow(show))
        dispatch(fetchShow(show))
      })

      dispatch(indexSuccess())
    }).catch(error => dispatch(indexFailure(error)))
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
