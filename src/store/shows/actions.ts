import { REMOVE_SHOW, ShowsActionTypes, UPDATE_SHOW } from './types'
import { Show } from '../../types/items/Show'

export const updateShow = (show: Show): ShowsActionTypes => ({
  type: UPDATE_SHOW,
  payload: { show },
})

export const removeShow = (id: string): ShowsActionTypes => ({
  type: REMOVE_SHOW,
  payload: { id },
})
