import {
  EpisodesActionTypes,
  EpisodesState,
  UPDATE_EPISODE,
  REMOVE_EPISODE,
} from './types'

const initialState: EpisodesState = {}

export default (
  state = initialState,
  action: EpisodesActionTypes,
): EpisodesState => {
  switch (action.type) {
    case UPDATE_EPISODE:
      return { ...state, [action.payload.episode.id]: action.payload.episode }
    case REMOVE_EPISODE:
      const { [action.payload.id]: episode, ...episodes } = state

      return episodes
    default:
      return state
  }
}
