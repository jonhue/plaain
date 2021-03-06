import { LoginRedirectCache, SetupRedirectCache } from './types'
import {
  Provider,
  ProviderKind,
  ProviderKindWithRedirect,
} from '../../types/providers/Provider'
import {
  expectLoginRedirect,
  expectSetupRedirect,
  handledRedirect,
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
): Promise<AuthResponse | void> => {
  switch (provider.kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(provider)
  }
}

const setupAuthHandleProvider = (
  kind: ProviderKind,
): Promise<AuthResponse | void> => {
  switch (kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(undefined)
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
  const response = await authHandleProvider(provider)
  if (response === undefined) {
    dispatch(expectLoginRedirect(provider))
    return
  }
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
  const response = await setupAuthHandleProvider(kind)
  if (response === undefined) {
    dispatch(expectSetupRedirect(kind))
    return
  }
  return dispatch(setupAuthHandleResponse(kind, response))
}

export const authHandleRedirect = (
  cache: LoginRedirectCache,
): AppThunk<Promise<Provider>> => async (dispatch) => {
  const response = await authHandleRedirectHandleProvider(cache.provider.kind)
  dispatch(handledRedirect())
  return dispatch(authHandleResponse(cache.provider, response))
}

export const setupAuthHandleRedirect = (
  cache: SetupRedirectCache,
): AppThunk<Promise<AuthResponse>> => async (dispatch) => {
  const response = await authHandleRedirectHandleProvider(cache.kind)
  dispatch(handledRedirect())
  return dispatch(setupAuthHandleResponse(cache.kind, response))
}
