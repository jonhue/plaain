import { Season } from '../../types/items/Season'

export const UPDATE_SEASON = 'UPDATE_SEASON'
export const REMOVE_SEASON = 'REMOVE_SEASON'

export interface SeasonsState {
  [id: string]: Season | undefined
}

interface UpdateSeasonAction {
  type: typeof UPDATE_SEASON
  payload: {
    season: Season
  }
}

interface RemoveSeasonAction {
  type: typeof REMOVE_SEASON
  payload: {
    id: string
  }
}

export type SeasonsActionTypes = UpdateSeasonAction | RemoveSeasonAction
