import { LoginRedirectCache, SetupRedirectCache } from './types'
import {
  Provider,
  ProviderKind,
  ProviderKindWithRedirect,
} from '../../types/providers/Provider'
import {
  expectLoginRedirect,
  expectSetupRedirect,
  updateProvider,
} from './actions'
import {
  auth as oneDriveAuthCall,
  authHandleRedirect as oneDriveAuthHandleRedirectCall,
} from '../../services/auth/OneDrive'
import { AppThunk } from '../index'
import { AuthResponse } from '../../services/auth/types'
import { ProviderAlreadyExists } from '../../errors/ProviderAlreadyExists'
import { providersSelector } from './selectors'

const authHandleProvider = (
  provider: Provider,
  onRedirect: () => void,
): Promise<AuthResponse | void> => {
  switch (provider.kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(provider, onRedirect)
  }
}

const setupAuthHandleProvider = (
  kind: ProviderKind,
  onRedirect: () => void,
): Promise<AuthResponse | void> => {
  switch (kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(undefined, onRedirect)
  }
}

const authHandleRedirectHandleProvider = (
  kind: ProviderKindWithRedirect,
): Promise<AuthResponse> => {
  switch (kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthHandleRedirectCall()
  }
}

const authHandleResponse = (
  provider: Provider,
  response: AuthResponse,
): AppThunk<Promise<Provider>> => async (dispatch) => {
  const updatedProvider = {
    ...response,
    moviesPath: provider.moviesPath,
    showsPath: provider.showsPath,
  }
  dispatch(updateProvider(updatedProvider))
  return updatedProvider
}

export const auth = (
  provider: Provider,
): AppThunk<Promise<Provider | undefined>> => async (dispatch) => {
  const response = await authHandleProvider(provider, () =>
    dispatch(expectLoginRedirect(provider)),
  )
  if (response === undefined) return
  return dispatch(authHandleResponse(provider, response))
}

const setupAuthHandleResponse = (
  kind: ProviderKind,
  response: AuthResponse,
): AppThunk<Promise<AuthResponse>> => async (_, getState) => {
  const { auth } = getState()
  const provider = providersSelector(auth).find(
    (provider) => provider.kind === kind && provider.name === response.name,
  )
  if (provider !== undefined) throw new ProviderAlreadyExists(provider)
  return response
}

export const setupAuth = (
  kind: ProviderKind,
): AppThunk<Promise<AuthResponse | undefined>> => async (dispatch) => {
  const response = await setupAuthHandleProvider(kind, () =>
    dispatch(expectSetupRedirect(kind)),
  )
  if (response === undefined) return
  return dispatch(setupAuthHandleResponse(kind, response))
}

export const authHandleRedirect = (
  cache: LoginRedirectCache,
): AppThunk<Promise<Provider>> => async (dispatch) => {
  const response = await authHandleRedirectHandleProvider(cache.provider.kind)
  return dispatch(authHandleResponse(cache.provider, response))
}

export const setupAuthHandleRedirect = (
  cache: SetupRedirectCache,
): AppThunk<Promise<AuthResponse>> => async (dispatch) => {
  const response = await authHandleRedirectHandleProvider(cache.kind)
  return dispatch(setupAuthHandleResponse(cache.kind, response))
}
