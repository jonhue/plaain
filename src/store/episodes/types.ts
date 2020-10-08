import { Episode } from '../../types/items/Episode'

export const UPDATE_EPISODE = 'UPDATE_EPISODE'
export const REMOVE_EPISODE = 'REMOVE_EPISODE'

export interface EpisodesState {
  [id: string]: Episode | undefined
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
    id: string
  }
}

export type EpisodesActionTypes = UpdateEpisodeAction | RemoveEpisodeAction
