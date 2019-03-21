import { REMOVE_SEASON, UPDATE_SEASON } from '../actions/seasons'

export default (state = {}, action) => {
  switch (action.type) {
  case REMOVE_SEASON: {
    const { [action.payload]: season, ...newState } = state
    return newState
  }
  case UPDATE_SEASON:
    return {
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        ...action.payload
      }
    }
  default:
    return state
  }
}
