import { ADD_SHOW, CLEAR_SHOWS } from '../actions/shows'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_SHOW:
    return {
      ...state,
      [action.payload.id]: action.payload
    }
  case CLEAR_SHOWS:
    return {}
  default:
    return state
  }
}
