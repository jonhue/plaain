import { Show } from '../../types/items/Show'

export const UPDATE_SHOW = 'UPDATE_SHOW'
export const REMOVE_SHOW = 'REMOVE_SHOW'

export interface ShowsState {
  [id: string]: Show | undefined
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
    id: string
  }
}

export type ShowsActionTypes = UpdateShowAction | RemoveShowAction
