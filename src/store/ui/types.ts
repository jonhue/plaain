import { Notification } from '../../types/Notification'

export const ASYNC_BEGIN = 'ASYNC_BEGIN'
export const ASYNC_END = 'ASYNC_END'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS'

export interface UIState {
  isLoading: boolean
  notifications: Notification[]
}

interface AsyncBeginAction {
  type: typeof ASYNC_BEGIN
}

interface AsyncEndAction {
  type: typeof ASYNC_END
}

interface AddNotificationAction {
  type: typeof ADD_NOTIFICATION
  payload: {
    notification: Notification
  }
}

interface ClearNotificationsAction {
  type: typeof CLEAR_NOTIFICATIONS
}

export type UIActionTypes =
  | AsyncBeginAction
  | AsyncEndAction
  | AddNotificationAction
  | ClearNotificationsAction
