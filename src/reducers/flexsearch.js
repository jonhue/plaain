import FlexSearch from 'flexsearch'

import { FLEXSEARCH_UPDATE } from '../actions/flexsearch'

const initialState = {
  indexed: false,
  movies: new FlexSearch(),
  shows: new FlexSearch(),
  people: new FlexSearch()
}

export default (state = initialState, action) => {
  switch (action.type) {
  case FLEXSEARCH_UPDATE:
    return {
      ...state,
      ...action.payload,
      indexed: true
    }
  default:
    return state
  }
}
