import { REMOVE_SHOW, UPDATE_SHOW } from '../actions/shows'

export default (state = {}, action) => {
  switch (action.type) {
  case REMOVE_SHOW: {
    const { [action.payload]: show, ...newState } = state
    return newState
  }
  case UPDATE_SHOW:
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
