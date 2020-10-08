import {
  AuthActionTypes,
  AuthState,
  REMOVE_PROVIDER,
  UPDATE_PROVIDER,
  UPDATE_VERSION,
} from './types'
import { VERSION } from '../../constants'

const initialState: AuthState = {
  providers: {},
  version: VERSION,
}

export default (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case UPDATE_PROVIDER:
      return {
        ...state,
        providers: {
          ...state.providers,
          [action.payload.provider.id]: action.payload.provider,
        },
      }
    case UPDATE_VERSION:
      return {
        ...state,
        version: action.payload.version,
      }
    case REMOVE_PROVIDER:
      const { [action.payload.id]: provider, ...providers } = state.providers

      return {
        ...state,
        providers,
      }
    default:
      return state
  }
}
