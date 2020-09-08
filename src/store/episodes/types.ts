import { Episode } from '../../types/media_items/Episode'

export const UPDATE_EPISODE = 'UPDATE_EPISODE'
export const REMOVE_EPISODE = 'REMOVE_EPISODE'

export interface EpisodesState {
  [id: number]: Episode | undefined
}

interface UpdateEpisodeAction {
  type: typeof UPDATE_EPISODE
  payload: {
    episode: Episode
  }
}

interface RemoveEpisodeAction {
  type: typeof REMOVE_EPISODE
  payload: {
    id: number
  }
}

export type EpisodesActionTypes = UpdateEpisodeAction | RemoveEpisodeAction
