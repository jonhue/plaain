import { Season } from '../../types/media_items/Season'
import { REMOVE_SEASON, SeasonsActionTypes, UPDATE_SEASON } from './types'

export const updateSeason = (season: Season): SeasonsActionTypes => ({
  type: UPDATE_SEASON,
  payload: { season },
})

export const removeSeason = (id: number): SeasonsActionTypes => ({
  type: REMOVE_SEASON,
  payload: { id },
})
