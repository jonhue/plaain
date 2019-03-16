import { INDEX_BEGIN, INDEX_SUCCESS, INDEX_FAILURE } from '../actions/indexing'

const initialState = {
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
  case INDEX_BEGIN:
    return {
      ...state,
      loading: true,
      error: null
    }
  case INDEX_SUCCESS:
    return {
      ...state,
      loading: false
    }
  case INDEX_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.payload
    }
  default:
    return state
  }
}
