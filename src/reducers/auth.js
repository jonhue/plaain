import { LOG_IN_BEGIN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../actions/auth'

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOG_IN_BEGIN:
    return {
      ...state,
      loading: true,
      error: null
    }
  case LOG_IN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
      loading: false
    }
  case LOG_IN_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  default:
    return state
  }
}
