import { AuthResponse, AuthSetup } from '../../services/auth/types'
import { LoginRedirectCache, SetupRedirectCache } from './types'
import {
  Provider,
  ProviderKind,
  ProviderKindWithRedirect,
  ProviderWithRedirect,
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
import { ProviderAlreadyExists } from '../../errors/ProviderAlreadyExists'
import { auth as ftpAuthCall } from '../../services/auth/FTP'
import { providersSelector } from './selectors'

const authHandleProvider = (
  provider: Provider,
  onRedirect: (provider: ProviderWithRedirect) => () => void,
): Promise<AuthResponse | void> => {
  switch (provider.kind) {
    case ProviderKind.FTP:
      return ftpAuthCall(provider)
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(provider, onRedirect(provider))
  }
}

const setupAuthHandleProvider = (
  config: AuthSetup,
  onRedirect: (kind: ProviderKindWithRedirect) => () => void,
): Promise<AuthResponse | void> => {
  switch (config.kind) {
    case ProviderKind.FTP:
      return ftpAuthCall(config)
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(undefined, onRedirect(ProviderKind.OneDrive))
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

const authHandleResponse =
  (provider: Provider, response: AuthResponse): AppThunk<Promise<Provider>> =>
  async (dispatch) => {
    const updatedProvider = {
      ...response,
      moviesPath: provider.moviesPath,
      showsPath: provider.showsPath,
    }
    dispatch(updateProvider(updatedProvider))
    return updatedProvider
  }

export const auth =
  (provider: Provider): AppThunk<Promise<Provider | undefined>> =>
  async (dispatch) => {
    const response = await authHandleProvider(
      provider,
      (provider) => () => dispatch(expectLoginRedirect(provider)),
    )
    if (response === undefined) return
    return dispatch(authHandleResponse(provider, response))
  }

const setupAuthHandleResponse =
  (
    kind: ProviderKind,
    response: AuthResponse,
  ): AppThunk<Promise<AuthResponse>> =>
  async (_, getState) => {
    const { auth } = getState()
    const provider = providersSelector(auth).find(
      (provider) => provider.kind === kind && provider.name === response.name,
    )
    if (provider !== undefined) throw new ProviderAlreadyExists(provider)
    return response
  }

export const setupAuth =
  (config: AuthSetup): AppThunk<Promise<AuthResponse | undefined>> =>
  async (dispatch) => {
    const response = await setupAuthHandleProvider(
      config,
      (kind) => () => dispatch(expectSetupRedirect(kind)),
    )
    if (response === undefined) return
    return dispatch(setupAuthHandleResponse(config.kind, response))
  }

export const authHandleRedirect =
  (cache: LoginRedirectCache): AppThunk<Promise<Provider>> =>
  async (dispatch) => {
    const response = await authHandleRedirectHandleProvider(cache.provider.kind)
    return dispatch(authHandleResponse(cache.provider, response))
  }

export const setupAuthHandleRedirect =
  (cache: SetupRedirectCache): AppThunk<Promise<AuthResponse>> =>
  async (dispatch) => {
    const response = await authHandleRedirectHandleProvider(cache.kind)
    return dispatch(setupAuthHandleResponse(cache.kind, response))
  }
