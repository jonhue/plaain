import { ITEM_STATES } from '../../constants'

import { ADD_MOVIE, FETCH_MOVIE } from '../actions/movies'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_MOVIE:
    return {
      ...state,
      [action.payload.id]: action.payload
    }
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
