import FetchSeason from '../services/fetching/FetchSeason'

import { showSelector } from '../selectors/shows'

export const REMOVE_SEASON = 'REMOVE_SEASON'
export const UPDATE_SEASON = 'UPDATE_SEASON'

export const fetchSeason = (season) => {
  return (dispatch, getState) => {
    const show = showSelector(season.showId)(getState())
    return new FetchSeason(show.id, show.name, season)
      .perform()
      .then((fetchedSeason) => {
        dispatch(updateSeason(fetchedSeason))
      })
      .catch(() => dispatch(fetchSeason(season)))
  }
}

export const removeSeason = (id) => ({
  type: REMOVE_SEASON,
  payload: id,
})

export const updateSeason = (season) => ({
  type: UPDATE_SEASON,
  payload: season,
})
