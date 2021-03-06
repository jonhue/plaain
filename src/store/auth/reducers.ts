import {
  AuthActionTypes,
  AuthState,
  EXPECT_LOGIN_REDIRECT,
  EXPECT_SETUP_REDIRECT,
  HANDLED_REDIRECT,
  REMOVE_PROVIDER,
  RedirectCacheOrigin,
  UPDATE_PROVIDER,
  UPDATE_VERSION,
} from './types'
import { VERSION } from '../../constants'

const initialState: AuthState = {
  providers: {},
  redirectCache: undefined,
  version: VERSION,
}

export default (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case EXPECT_LOGIN_REDIRECT:
      return {
        ...state,
        redirectCache: {
          origin: RedirectCacheOrigin.Login,
          provider: action.payload.provider,
        },
      }
    case EXPECT_SETUP_REDIRECT:
      return {
        ...state,
        redirectCache: {
          origin: RedirectCacheOrigin.Setup,
          kind: action.payload.kind,
        },
      }
    case HANDLED_REDIRECT:
      return {
        ...state,
        redirectCache: undefined,
      }
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
