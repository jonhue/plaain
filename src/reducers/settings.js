import { SETTINGS_UPDATE } from '../actions/settings'

export const AUTOMATIC_INDEXING = {
  NEVER: 'NEVER',
  MONTHLY: 'MONTHLY',
  DAILY: 'DAILY',
  ALWAYS: 'ALWAYS'
}

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
