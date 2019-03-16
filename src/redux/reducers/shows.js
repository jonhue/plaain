import { ITEM_STATES } from '../../constants'

import { ADD_SHOW, FETCH_SHOW } from '../actions/shows'

export default (state = {}, action) => {
  switch (action.type) {
  case ADD_SHOW:
    return {
      ...state,
      [action.payload.id]: action.payload
    }
  case FETCH_SHOW:
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
