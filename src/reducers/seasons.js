import { REMOVE_SEASON, UPDATE_SEASON } from '../actions/seasons'

export default (state = {}, action) => {
  switch (action.type) {
  case REMOVE_SEASON: {
    /* eslint-disable no-unused-vars */
    const { [action.payload]: season, ...newState } = state
    /* eslint-enable no-unused-vars */
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
