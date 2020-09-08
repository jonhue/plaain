export const ASYNC_BEGIN = 'ASYNC_BEGIN'
export const ASYNC_END = 'ASYNC_END'
export const UPDATE_ERROR = 'UPDATE_ERROR'

export interface UIState {
  error?: Error
  isLoading: boolean
}

interface AsyncBeginAction {
  type: typeof ASYNC_BEGIN
}

interface AsyncEndAction {
  type: typeof ASYNC_END
}

interface UpdateErrorAction {
  type: typeof UPDATE_ERROR
  payload: {
    error: Error | undefined
  }
}

export type UIActionTypes =
  | AsyncBeginAction
  | AsyncEndAction
  | UpdateErrorAction
