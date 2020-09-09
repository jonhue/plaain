import { Season } from '../../types/items/Season'
import { REMOVE_SEASON, SeasonsActionTypes, UPDATE_SEASON } from './types'

export const updateSeason = (season: Season): SeasonsActionTypes => ({
  type: UPDATE_SEASON,
  payload: { season },
})

export const removeSeason = (id: string): SeasonsActionTypes => ({
  type: REMOVE_SEASON,
  payload: { id },
})
