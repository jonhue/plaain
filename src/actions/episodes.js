import FetchEpisode from '../services/fetching/FetchEpisode'

import { episodeSelector } from '../selectors/episodes'

export const REMOVE_EPISODE = 'REMOVE_EPISODE'
export const UPDATE_EPISODE = 'UPDATE_EPISODE'

export const fetchEpisode = id => {
  return (dispatch, getState) => {
    const episode = episodeSelector(id)(getState())
    new FetchEpisode(episode).perform().then(fetchedEpisode => {
      dispatch(updateEpisode(fetchedEpisode))
    }).catch(() => dispatch(fetchEpisode(id)))
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
