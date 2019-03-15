import { ADD_MOVIE } from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_MOVIE:
    return state[action.payload.id] = action.payload.movie
  default:
    return state
  }
}
