import { ADD_MOVIE, CLEAR_MOVIES } from '../actions/movies'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_MOVIE:
    return {
      ...state,
      [action.payload.id]: action.payload
    }
  case CLEAR_MOVIES:
    return {}
  default:
    return state
  }
}
