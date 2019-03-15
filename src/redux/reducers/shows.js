import { ADD_SHOW } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_SHOW:
    return state[action.payload.id] = action.payload.show
  default:
    return state
  }
}
