import { REMOVE_EPISODE, UPDATE_EPISODE } from '../actions/episodes'

export default (state = {}, action) => {
  switch (action.type) {
  case REMOVE_EPISODE: {
    const { [action.payload]: episode, ...newState } = state
    return newState
  }
  case UPDATE_EPISODE:
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
