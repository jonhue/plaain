import IndexMovies from '../services/indexing/IndexMovies'
import IndexShows from '../services/indexing/IndexShows'
import IndexSeasons from '../services/indexing/IndexSeasons'
import IndexEpisodes from '../services/indexing/IndexEpisodes'

import { logIn } from './auth'
import { fetchMovie, removeMovie, updateMovie } from './movies'
import { fetchShow, removeShow, updateShow } from './shows'
import { fetchSeason, removeSeason, updateSeason } from './seasons'
import { fetchEpisode, removeEpisode, updateEpisode } from './episodes'

export const INDEX_BEGIN = 'INDEX_BEGIN'
export const INDEX_SUCCESS = 'INDEX_SUCCESS'
export const INDEX_FAILURE = 'INDEX_FAILURE'

export const index = () => {
  return (dispatch, getState) => {
    dispatch(indexBegin())

    new IndexMovies(getState().auth.token).perform().then(movies => {
      movies.forEach(movie => {
        dispatch(updateMovie(movie))
        // dispatch(fetchMovie(movie.id))
      })
      const ids = movies.map(movie => movie.id)
      Object.keys(getState().movies).forEach(id => {
        if (!ids.includes(id)) {
          dispatch(removeMovie(id))
        }
      })
    }).then(() => {
      return new IndexShows(getState().auth.token).perform()
    }).then(shows => {
      shows.forEach(show => {
        dispatch(updateShow(show))
        // dispatch(fetchShow(show.id))
      })
      const ids = shows.map(show => show.id)
      Object.keys(getState().shows).forEach(id => {
        if (!ids.includes(id)) {
          dispatch(removeShow(id))
        }
      })
    }).then(() => {
      return new IndexSeasons(getState().auth.token, Object.keys(getState().shows)).perform()
    }).then(seasons => {
      seasons.forEach(season => {
        dispatch(updateSeason(season))
        // dispatch(fetchSeason(season.id))
      })
      const ids = seasons.map(season => season.id)
      Object.keys(getState().seasons).forEach(id => {
        if (!ids.includes(id)) {
          dispatch(removeSeason(id))
        }
      })
    }).then(() => {
      return new IndexEpisodes(getState().auth.token, Object.keys(getState().seasons)).perform()
    }).then(episodes => {
      episodes.forEach(episode => {
        dispatch(updateEpisode(episode))
        // dispatch(fetchEpisode(episode.id))
      })
      const ids = episodes.map(episode => episode.id)
      Object.keys(getState().episodes).forEach(id => {
        if (!ids.includes(id)) {
          dispatch(removeEpisode(id))
        }
      })
    }).then(() => {
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
