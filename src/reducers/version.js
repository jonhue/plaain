import VERSION from '../version'

import { UPDATE_VERSION } from '../actions/version'

const initialState = VERSION

export default (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_VERSION:
    return action.payload
  default:
    return state
  }
}
