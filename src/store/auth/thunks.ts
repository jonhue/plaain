import { Provider, ProviderKind } from '../../types/providers/Provider'
import { AccessToken } from '../../types/AccessToken'
import { AppThunk } from '../index'
import { auth as oneDriveAuthCall } from '../../services/auth/OneDrive'
import { updateProvider } from './actions'

const authService = {
  [ProviderKind.OneDrive]: oneDriveAuthCall,
}

export const auth = (provider: Provider): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  const newProvider = {
    ...provider,
    ...(await authService[provider.kind]()),
  }
  dispatch(updateProvider(newProvider))
}

export const setupAuth = (
  kind: ProviderKind,
): AppThunk<
  Promise<{
    kind: typeof ProviderKind.OneDrive
    id: string
    name: string
    accessToken: AccessToken
  }>
> => () => authService[kind]()
