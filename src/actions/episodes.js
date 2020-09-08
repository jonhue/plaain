import FetchEpisode from '../services/fetching/FetchEpisode'

import { seasonSelector } from '../selectors/seasons'
import { showSelector } from '../selectors/shows'

export const REMOVE_EPISODE = 'REMOVE_EPISODE'
export const UPDATE_EPISODE = 'UPDATE_EPISODE'

export const fetchEpisode = (episode) => {
  return (dispatch, getState) => {
    const season = seasonSelector(episode.seasonId)(getState())
    const show = showSelector(season.showId)(getState())
    return new FetchEpisode(
      show.id,
      show.name,
      season.seasonNumber,
      season.name,
      episode,
    )
      .perform()
      .then((fetchedEpisode) => {
        dispatch(updateEpisode(fetchedEpisode))
      })
      .catch(() => dispatch(fetchEpisode(episode)))
  }
}

export const removeEpisode = (id) => ({
  type: REMOVE_EPISODE,
  payload: id,
})

export const updateEpisode = (episode) => ({
  type: UPDATE_EPISODE,
  payload: episode,
})
