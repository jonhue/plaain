import {
  ADD_NOTIFICATION,
  ASYNC_BEGIN,
  ASYNC_END,
  CLEAR_NOTIFICATIONS,
  UIActionTypes,
  UIState,
} from './types'

const initialState: UIState = {
  isLoading: false,
  notifications: [],
}

export default (state = initialState, action: UIActionTypes): UIState => {
  switch (action.type) {
    case ASYNC_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case ASYNC_END:
      return {
        ...state,
        isLoading: false,
      }
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload.notification],
      }
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      }
    default:
      return state
  }
}
