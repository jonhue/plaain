import { AUTOMATIC_INDEXING } from '../constants'

import { SETTINGS_UPDATE } from '../actions/settings'

const initialState = {
  automaticIndexing: AUTOMATIC_INDEXING.NEVER
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SETTINGS_UPDATE:
    return {
      ...state,
      ...action.payload
    }
  default:
    return state
  }
}
