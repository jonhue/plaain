import { LOADING_BEGIN, LOADING_STOP } from '../actions/loading'

const initialState = false

export default (state = initialState, action) => {
  switch (action.type) {
  case LOADING_BEGIN:
    return action.payload
  case LOADING_STOP:
    return false
  default:
    return state
  }
}
