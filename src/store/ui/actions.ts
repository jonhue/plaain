import { ASYNC_BEGIN, ASYNC_END, UIActionTypes, UPDATE_ERROR } from './types'

export const asyncBegin = (): UIActionTypes => ({
  type: ASYNC_BEGIN,
})

export const asyncEnd = (): UIActionTypes => ({
  type: ASYNC_END,
})

export const updateError = (error: Error | undefined): UIActionTypes => ({
  type: UPDATE_ERROR,
  payload: { error },
})
