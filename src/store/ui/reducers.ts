import {
  ADD_NOTIFICATION,
  ASYNC_BEGIN,
  ASYNC_END,
  REMOVE_NOTIFICATION,
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
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification !== action.payload.notification,
        ),
      }
    default:
      return state
  }
}
