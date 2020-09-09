import { Show } from '../../types/items/Show'
import { REMOVE_SHOW, ShowsActionTypes, UPDATE_SHOW } from './types'

export const updateShow = (show: Show): ShowsActionTypes => ({
  type: UPDATE_SHOW,
  payload: { show },
})

export const removeShow = (id: string): ShowsActionTypes => ({
  type: REMOVE_SHOW,
  payload: { id },
})
