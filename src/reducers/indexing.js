import { INDEX_BEGIN, INDEX_SUCCESS, INDEX_FAILURE } from '../actions/indexing'

const initialState = {
  lastIndexed: 0,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
  case INDEX_BEGIN:
    return {
      ...state,
      error: null
    }
  case INDEX_SUCCESS:
    return {
      ...state,
      lastIndexed: new Date().getTime()
    }
  case INDEX_FAILURE:
    return {
      ...state,
      error: action.payload
    }
  default:
    return state
  }
}
