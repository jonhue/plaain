import {
  ASYNC_BEGIN,
  ASYNC_END,
  UIActionTypes,
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
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

export const clearNotifications = (): UIActionTypes => ({
  type: CLEAR_NOTIFICATIONS,
})
