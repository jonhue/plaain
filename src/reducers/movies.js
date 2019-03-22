import { REMOVE_MOVIE, UPDATE_MOVIE } from '../actions/movies'

export default (state = {}, action) => {
  switch (action.type) {
  case REMOVE_MOVIE: {
    const { [action.payload]: movie, ...newState } = state // eslint-disable-line no-unused-vars
    return newState
  }
  case UPDATE_MOVIE:
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
