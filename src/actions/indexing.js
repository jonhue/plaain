import { VERSION, PROVIDERS } from '../constants'

import IndexMovies from '../services/indexing/IndexMovies'
import IndexShows from '../services/indexing/IndexShows'
import IndexSeasons from '../services/indexing/IndexSeasons'
import IndexEpisodes from '../services/indexing/IndexEpisodes'
import FetchAllSeasons from '../services/fetching/FetchAllSeasons'
import FetchAllEpisodes from '../services/fetching/FetchAllEpisodes'

import { updateVersion } from './version'
import { logInExpired } from './auth'
import { loadingBegin, loadingStop } from './loading'
import { fetchMovie, removeMovie } from './movies'
import { fetchShow, removeShow } from './shows'
import { fetchSeason, removeSeason } from './seasons'
import { fetchEpisode, removeEpisode } from './episodes'

export const INDEX_BEGIN = 'INDEX_BEGIN'
export const INDEX_SUCCESS = 'INDEX_SUCCESS'
export const INDEX_FAILURE = 'INDEX_FAILURE'

export const index = () => {
  return (dispatch, getState) => {
    dispatch(loadingBegin('Indexing...'))
    dispatch(indexBegin())

    new IndexMovies(getState().auth[PROVIDERS.MICROSOFT].token)
      .perform()
      .then((movies) => {
        cleanupOldItems(
          dispatch,
          movies.map((movie) => movie.id),
          Object.keys(getState().movies),
          removeMovie,
        )
        return awaitFetching(dispatch, movies, fetchMovie)
      })
      .then(() => {
        return new IndexShows(
          getState().auth[PROVIDERS.MICROSOFT].token,
        ).perform()
      })
      .then((shows) => {
        cleanupOldItems(
          dispatch,
          shows.map((show) => show.id),
          Object.keys(getState().shows),
          removeShow,
        )
        return awaitFetching(dispatch, shows, fetchShow)
      })
      .then(() => {
        return new FetchAllSeasons(Object.values(getState().shows)).perform()
      })
      .then((seasons) => {
        return new IndexSeasons(
          getState().auth[PROVIDERS.MICROSOFT].token,
          Object.values(getState().shows),
          seasons,
        ).perform()
      })
      .then((seasons) => {
        cleanupOldItems(
          dispatch,
          seasons.map((season) => season.id),
          Object.keys(getState().seasons),
          removeSeason,
        )
        return awaitFetching(dispatch, seasons, fetchSeason)
      })
      .then(() => {
        return new FetchAllEpisodes(Object.values(getState().seasons)).perform()
      })
      .then((episodes) => {
        return new IndexEpisodes(
          getState().auth[PROVIDERS.MICROSOFT].token,
          Object.values(getState().seasons),
          episodes,
        ).perform()
      })
      .then((episodes) => {
        cleanupOldItems(
          dispatch,
          episodes.map((episode) => episode.id),
          Object.keys(getState().episodes),
          removeEpisode,
        )
        return awaitFetching(dispatch, episodes, fetchEpisode)
      })
      .then(() => {
        dispatch(updateVersion(VERSION))
        dispatch(indexSuccess())
        dispatch(loadingStop())
      })
      .catch((error) => {
        console.log(error)
        dispatch(indexFailure(error))
        dispatch(loadingStop())

        if (error.statusCode === 401) {
          dispatch(logInExpired(PROVIDERS.MICROSOFT))
        }
      })
  }
}

function cleanupOldItems(dispatch, newIds, oldIds, removeAction) {
  oldIds.forEach((id) => {
    if (!newIds.includes(id)) {
      dispatch(removeAction(id))
    }
  })
}

async function awaitFetching(dispatch, items, fetchAction) {
  await Promise.all(
    items.map((item) => {
      return dispatch(fetchAction(item))
    }),
  )
  return items
}

const indexBegin = () => ({
  type: INDEX_BEGIN,
})

const indexSuccess = () => ({
  type: INDEX_SUCCESS,
})

const indexFailure = (error) => ({
  type: INDEX_FAILURE,
  payload: error,
})
