import { ShowsActionTypes, ShowsState, UPDATE_SHOW, REMOVE_SHOW } from './types'

const initialState: ShowsState = {}

export default (state = initialState, action: ShowsActionTypes): ShowsState => {
  switch (action.type) {
    case UPDATE_SHOW:
      return { ...state, [action.payload.show.id]: action.payload.show }
    case REMOVE_SHOW:
      const { [action.payload.id]: show, ...shows } = state

      return shows
    default:
      return state
  }
}
