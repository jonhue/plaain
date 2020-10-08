import { Provider, ProviderKind } from '../../types/providers/Provider'
import { AppThunk } from '../index'
import { AuthResponse } from '../../services/auth/types'
import { ProviderAlreadyExists } from '../../errors/ProviderAlreadyExists'
import { auth as oneDriveAuthCall } from '../../services/auth/OneDrive'
import { providersSelector } from './selectors'
import { updateProvider } from './actions'

const authHandleProvider = (provider: Provider): Promise<AuthResponse> => {
  switch (provider.kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(provider)
  }
}

const setupAuthHandleProvider = (kind: ProviderKind): Promise<AuthResponse> => {
  switch (kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(undefined, false)
  }
}

export const auth = (provider: Provider): AppThunk<Promise<Provider>> => async (
  dispatch,
) => {
  const response = await authHandleProvider(provider)
  const updatedProvider = {
    ...response,
    moviesPath: provider.moviesPath,
    showsPath: provider.showsPath,
  }

  dispatch(updateProvider(updatedProvider))
  return updatedProvider
}

export const setupAuth = (
  kind: ProviderKind,
): AppThunk<Promise<AuthResponse>> => async (_, getState) => {
  const response = await setupAuthHandleProvider(kind)

  const { auth } = getState()
  const provider = providersSelector(auth).find(
    (provider) => provider.kind === kind && provider.name === response.name,
  )
  if (provider !== undefined) throw new ProviderAlreadyExists(provider)

  return response
}
