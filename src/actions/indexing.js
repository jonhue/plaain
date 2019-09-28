import { VERSION, PROVIDERS } from '../constants'

import IndexMovies from '../services/indexing/IndexMovies'
import IndexShows from '../services/indexing/IndexShows'
import IndexSeasons from '../services/indexing/IndexSeasons'
import IndexEpisodes from '../services/indexing/IndexEpisodes'

import { updateVersion } from './version'
import { logInExpired } from './auth'
import { loadingBegin, loadingStop } from './loading'
import { fetchMovie, removeMovie, updateMovie } from './movies'
import { fetchShow, removeShow, updateShow } from './shows'
import { fetchSeason, removeSeason, updateSeason } from './seasons'
import { fetchEpisode, removeEpisode, updateEpisode } from './episodes'

export const INDEX_BEGIN = 'INDEX_BEGIN'
export const INDEX_SUCCESS = 'INDEX_SUCCESS'
export const INDEX_FAILURE = 'INDEX_FAILURE'

export const index = () => {
  return (dispatch, getState) => {
    dispatch(loadingBegin('Indexing...'))
    dispatch(indexBegin())

    new IndexMovies(getState().auth[PROVIDERS.MICROSOFT].token).perform()
      .then(movies => {
        return awaitFetching(dispatch, movies, updateMovie, fetchMovie)
      }).then(movies => {
        const ids = movies.map(movie => movie.id)
        Object.keys(getState().movies).forEach(id => {
          if (!ids.includes(id)) {
            dispatch(removeMovie(id))
          }
        })
      }).then(() => {
        return new IndexShows(
          getState().auth[PROVIDERS.MICROSOFT].token
        ).perform()
      }).then(shows => {
        return awaitFetching(dispatch, shows, updateShow, fetchShow)
      }).then(shows => {
        const ids = shows.map(show => show.id)
        Object.keys(getState().shows).forEach(id => {
          if (!ids.includes(id)) {
            dispatch(removeShow(id))
          }
        })
      }).then(() => {
        return new IndexSeasons(
          getState().auth[PROVIDERS.MICROSOFT].token,
          Object.keys(getState().shows)
        ).perform()
      }).then(seasons => {
        return awaitFetching(dispatch, seasons, updateSeason, fetchSeason)
      }).then(seasons => {
        const ids = seasons.map(season => season.id)
        Object.keys(getState().seasons).forEach(id => {
          if (!ids.includes(id)) {
            dispatch(removeSeason(id))
          }
        })
      }).then(() => {
        return new IndexEpisodes(
          getState().auth[PROVIDERS.MICROSOFT].token,
          Object.keys(getState().seasons)
        ).perform()
      }).then(episodes => {
        return awaitFetching(dispatch, episodes, updateEpisode, fetchEpisode)
      }).then(episodes => {
        const ids = episodes.map(episode => episode.id)
        Object.keys(getState().episodes).forEach(id => {
          if (!ids.includes(id)) {
            dispatch(removeEpisode(id))
          }
        })
      }).then(() => {
        dispatch(updateVersion(VERSION))
        dispatch(indexSuccess())
        dispatch(loadingStop())
      }).catch(error => {
        dispatch(indexFailure(error))
        dispatch(loadingStop())

        if (error.statusCode === 401) {
          dispatch(logInExpired(PROVIDERS.MICROSOFT))
        }
      })
  }
}

async function awaitFetching(dispatch, items, update, fetch) {
  await Promise.all(items.map(item => {
    dispatch(update(item))
    return dispatch(fetch(item.id))
  }))
  return items
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
