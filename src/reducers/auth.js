import { PROVIDERS } from '../constants'

import { LOG_IN_BEGIN, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../actions/auth'

const initialState = Object.values(PROVIDERS).reduce((o, provider) => ({
  ...o,
  [provider]: {
    token: null,
    error: null
  }
}), {})

export default (state = initialState, action) => {
  switch (action.type) {
  case LOG_IN_BEGIN:
    return {
      ...state,
      [action.payload]: {
        ...state[action.payload],
        error: null
      }
    }
  case LOG_IN_SUCCESS:
    return {
      ...state,
      [action.payload.provider]: {
        ...state[action.payload.provider],
        token: action.payload.token,
        error: null
      }
    }
  case LOG_IN_FAILURE:
    return {
      ...state,
      [action.payload.provider]: {
        ...state[action.payload.provider],
        error: action.payload.error
      }
    }
  default:
    return state
  }
}
