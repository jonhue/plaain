import {
  Provider,
  ProviderKindWithRedirect,
} from '../../types/providers/Provider'

export const EXPECT_LOGIN_REDIRECT = 'EXPECT_LOGIN_REDIRECT'
export const EXPECT_SETUP_REDIRECT = 'EXPECT_SETUP_REDIRECT'
export const HANDLED_REDIRECT = 'HANDLED_REDIRECT'
export const UPDATE_PROVIDER = 'UPDATE_PROVIDER'
export const UPDATE_VERSION = 'UPDATE_VERSION'
export const REMOVE_PROVIDER = 'REMOVE_PROVIDER'

export enum RedirectCacheOrigin {
  Login,
  Setup,
}

export type LoginRedirectCache = {
  origin: typeof RedirectCacheOrigin.Login
  provider: Provider
}

export type SetupRedirectCache = {
  origin: typeof RedirectCacheOrigin.Setup
  kind: ProviderKindWithRedirect
}

export type RedirectCache = LoginRedirectCache | SetupRedirectCache

export interface AuthState {
  providers: {
    [id: string]: Provider | undefined
  }
  redirectCache: RedirectCache | undefined
  version: string
}

interface ExpectLoginRedirectAction {
  type: typeof EXPECT_LOGIN_REDIRECT
  payload: {
    provider: Provider
  }
}

interface ExpectSetupRedirectAction {
  type: typeof EXPECT_SETUP_REDIRECT
  payload: {
    kind: ProviderKindWithRedirect
  }
}

interface HandledRedirectAction {
  type: typeof HANDLED_REDIRECT
}

interface UpdateProviderAction {
  type: typeof UPDATE_PROVIDER
  payload: {
    provider: Provider
  }
}

interface UpdateVersionAction {
  type: typeof UPDATE_VERSION
  payload: {
    version: string
  }
}

interface RemoveProviderAction {
  type: typeof REMOVE_PROVIDER
  payload: {
    id: string
  }
}

export type AuthActionTypes =
  | ExpectLoginRedirectAction
  | ExpectSetupRedirectAction
  | HandledRedirectAction
  | UpdateProviderAction
  | UpdateVersionAction
  | RemoveProviderAction
