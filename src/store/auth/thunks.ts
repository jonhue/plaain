import { Provider, ProviderKind } from '../../types/providers/Provider'
import { AppThunk } from '../index'
import { AuthResponse } from '../../services/auth/types'
import { auth as oneDriveAuthCall } from '../../services/auth/OneDrive'
import { updateProvider } from './actions'

const authHandleProvider = (provider: Provider): Promise<AuthResponse> => {
  switch (provider.kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthCall(provider)
  }
}

export const auth = (provider: Provider): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  const response = await authHandleProvider(provider)

  dispatch(
    updateProvider({
      ...response,
      moviesPath: provider.moviesPath,
      showsPath: provider.showsPath,
    }),
  )
}

export const setupAuth = (
  kind: ProviderKind,
): AppThunk<Promise<AuthResponse>> => () => {
  switch (kind) {
    case ProviderKind.OneDrive:
      return oneDriveAuthCall()
  }
}
