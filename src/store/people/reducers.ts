import {
  ADD_PERSON,
  PeopleActionTypes,
  PeopleState,
  RESET_PEOPLE,
} from './types'

const initialState: PeopleState = {
  ids: [],
}

export default (
  state = initialState,
  action: PeopleActionTypes,
): PeopleState => {
  switch (action.type) {
    case ADD_PERSON:
      return { ids: [...new Set([...state.ids, action.payload.id])] }
    case RESET_PEOPLE:
      return initialState
    default:
      return state
  }
}
