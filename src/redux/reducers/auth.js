import { LOG_IN } from '../actionTypes'

const initialState = {
  token: null,
  client: null,
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
  case LOG_IN:
    return {
      token: action.payload.token,
      client: action.payload.client,
      user: action.payload.user
    }
  default:
    return state
  }
}
