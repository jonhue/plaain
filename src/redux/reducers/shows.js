import { ADD_SHOW } from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_SHOW:
    return state[action.payload.id] = action.payload
  default:
    return state
  }
}
