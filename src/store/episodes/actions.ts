import { EpisodesActionTypes, REMOVE_EPISODE, UPDATE_EPISODE } from './types'
import { Episode } from '../../types/items/Episode'

export const updateEpisode = (episode: Episode): EpisodesActionTypes => ({
  type: UPDATE_EPISODE,
  payload: { episode },
})

export const removeEpisode = (id: string): EpisodesActionTypes => ({
  type: REMOVE_EPISODE,
  payload: { id },
})
