import { ITEM_STATES } from '../constants'

import { ADD_MOVIE, CLEAR_MOVIES, FETCH_MOVIE } from '../actions/movies'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_MOVIE:
    return {
      ...state,
      [action.payload.id]: action.payload
    }
  case CLEAR_MOVIES:
    return {}
  case FETCH_MOVIE:
    return {
      ...state,
      [action.payload]: {
        ...state[action.payload],
        state: ITEM_STATES.INDEXED
      }
    }
  default:
    return state
  }
}
