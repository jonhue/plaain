import { REMOVE_EPISODE, UPDATE_EPISODE } from '../actions/episodes'

export default (state = {}, action) => {
  switch (action.type) {
  case REMOVE_EPISODE: {
    /* eslint-disable no-unused-vars */
    const { [action.payload]: episode, ...newState } = state
    /* eslint-enable no-unused-vars */
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
