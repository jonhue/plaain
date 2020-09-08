import { Show } from '../../types/media_items/Show'

export const UPDATE_SHOW = 'UPDATE_SHOW'
export const REMOVE_SHOW = 'REMOVE_SHOW'

export interface ShowsState {
  [id: number]: Show | undefined
}

interface UpdateShowAction {
  type: typeof UPDATE_SHOW
  payload: {
    show: Show
  }
}

interface RemoveShowAction {
  type: typeof REMOVE_SHOW
  payload: {
    id: number
  }
}

export type ShowsActionTypes = UpdateShowAction | RemoveShowAction
