import {
  ASYNC_BEGIN,
  ASYNC_END,
  UIActionTypes,
  UIState,
  UPDATE_ERROR,
} from './types'

const initialState: UIState = {
  error: undefined,
  isLoading: false,
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
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}
