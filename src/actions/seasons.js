import FetchSeason from '../services/fetching/FetchSeason'

import { seasonSelector } from '../selectors/seasons'
import { showSelector } from '../selectors/shows'

export const REMOVE_SEASON = 'REMOVE_SEASON'
export const UPDATE_SEASON = 'UPDATE_SEASON'

export const fetchSeason = id => {
  return (dispatch, getState) => {
    const season = seasonSelector(id)(getState())
    const show = showSelector(season.showId)(getState())
    console.log(show)
    new FetchSeason(show.tmdbId, show.name, season.id, season.seasonNumber).perform().then(fetchedSeason => {
      dispatch(updateSeason(fetchedSeason))
    }).catch(() => dispatch(fetchSeason(id)))
  }
}

export const removeSeason = id => ({
  type: REMOVE_SEASON,
  payload: id
})

export const updateSeason = season => ({
  type: UPDATE_SEASON,
  payload: season
})
