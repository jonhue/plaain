import {
  SeasonsActionTypes,
  SeasonsState,
  UPDATE_SEASON,
  REMOVE_SEASON,
} from './types'

const initialState: SeasonsState = {}

export default (
  state = initialState,
  action: SeasonsActionTypes,
): SeasonsState => {
  switch (action.type) {
    case UPDATE_SEASON:
      return { ...state, [action.payload.season.id]: action.payload.season }
    case REMOVE_SEASON:
      const { [action.payload.id]: season, ...seasons } = state

      return seasons
    default:
      return state
  }
}
