import FetchEpisode from '../services/fetching/FetchEpisode'

import { episodeSelector } from '../selectors/episodes'
import { seasonSelector } from '../selectors/seasons'
import { showSelector } from '../selectors/shows'

export const REMOVE_EPISODE = 'REMOVE_EPISODE'
export const UPDATE_EPISODE = 'UPDATE_EPISODE'

export const fetchEpisode = id => {
  return (dispatch, getState) => {
    const episode = episodeSelector(id)(getState())
    const season = seasonSelector(episode.seasonId)(getState())
    const show = showSelector(season.showId)(getState())
    new FetchEpisode(
      show.tmdbId,
      show.name,
      season.seasonNumber,
      season.name,
      episode.id,
      episode.episodeNumber
    ).perform().then(fetchedEpisode => {
      dispatch(updateEpisode(fetchedEpisode))
    }).catch(error => console.log(error))
  }
}

export const removeEpisode = id => ({
  type: REMOVE_EPISODE,
  payload: id
})

export const updateEpisode = episode => ({
  type: UPDATE_EPISODE,
  payload: episode
})
