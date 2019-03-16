import { ADD_MOVIE } from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_MOVIE:
    return state[action.payload.id] = action.payload
  default:
    return state
  }
}
