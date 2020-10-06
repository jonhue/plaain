import {
  ADD_NOTIFICATION,
  ASYNC_BEGIN,
  ASYNC_END,
  REMOVE_NOTIFICATION,
  UIActionTypes,
} from './types'
import { Notification } from '../../types/Notification'

export const asyncBegin = (): UIActionTypes => ({
  type: ASYNC_BEGIN,
})

export const asyncEnd = (): UIActionTypes => ({
  type: ASYNC_END,
})

export const addNotification = (notification: Notification): UIActionTypes => ({
  type: ADD_NOTIFICATION,
  payload: { notification },
})

export const removeNotification = (
  notification: Notification,
): UIActionTypes => ({
  type: REMOVE_NOTIFICATION,
  payload: { notification },
})
