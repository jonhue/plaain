import IndexItems from '../services/indexing/IndexItems'

import { logIn } from './auth'
import { addMovie, clearMovies, fetchMovie } from './movies'
import { addShow, clearShows, fetchShow } from './shows'

export const INDEX_BEGIN = 'INDEX_BEGIN'
export const INDEX_SUCCESS = 'INDEX_SUCCESS'
export const INDEX_FAILURE = 'INDEX_FAILURE'

export const index = () => {
  return (dispatch, getState) => {
    dispatch(indexBegin())

    new IndexItems(getState().auth.token).perform().then(({ movies, shows }) => {
      const movieProgress = {}
      Object.values(getState().movies).forEach(movie => movieProgress[movie.id] = movie.progress)
      dispatch(clearMovies())
      movies.then(moviesArr => {
        moviesArr.forEach(movie => {
          movie.progress = movieProgress[movie.id]
          dispatch(addMovie(movie))
          dispatch(fetchMovie(movie))
        })
      })

      const episodeProgress = {}
      Object.values(getState().shows).forEach(show => {
        show.seasons.forEach(season => {
          season.episodes.forEach(episode => episodeProgress[episode.id] = episode.progress)
        })
      })
      dispatch(clearShows())
      shows.then(showsArr => {
        showsArr.forEach(show => {
          show.seasons.forEach(season => {
            season.episodes.forEach(episode => episode.progress = episodeProgress[episode.id])
          })
          dispatch(addShow(show))
          dispatch(fetchShow(show))
        })
      })

      dispatch(indexSuccess())
    }).catch(error => {
      dispatch(indexFailure(error))

      if (error.statusCode === 401) {
        dispatch(logIn())
      }
    })
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
