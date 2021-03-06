import {
  AuthActionTypes,
  EXPECT_LOGIN_REDIRECT,
  EXPECT_SETUP_REDIRECT,
  HANDLED_REDIRECT,
  REMOVE_PROVIDER,
  UPDATE_PROVIDER,
  UPDATE_VERSION,
} from './types'
import {
  Provider,
  ProviderKindWithRedirect,
} from '../../types/providers/Provider'

export const expectLoginRedirect = (provider: Provider): AuthActionTypes => ({
  type: EXPECT_LOGIN_REDIRECT,
  payload: {
    provider,
  },
})

export const expectSetupRedirect = (
  kind: ProviderKindWithRedirect,
): AuthActionTypes => ({
  type: EXPECT_SETUP_REDIRECT,
  payload: {
    kind,
  },
})

export const handledRedirect = (): AuthActionTypes => ({
  type: HANDLED_REDIRECT,
})

export const updateProvider = (provider: Provider): AuthActionTypes => ({
  type: UPDATE_PROVIDER,
  payload: {
    provider,
  },
})

export const updateVersion = (version: string): AuthActionTypes => ({
  type: UPDATE_VERSION,
  payload: { version },
})

export const removeProvider = (id: string): AuthActionTypes => ({
  type: REMOVE_PROVIDER,
  payload: { id },
})
