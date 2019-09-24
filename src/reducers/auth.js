import { LOG_IN_BEGIN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../actions/auth'

const initialState = {
  token: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOG_IN_BEGIN:
    return {
      ...state,
      error: null
    }
  case LOG_IN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
      error: null
    }
  case LOG_IN_FAILURE:
    return {
      ...state,
      error: action.payload
    }
  default:
    return state
  }
}
