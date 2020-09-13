import { updateProvider } from './actions'
import { AppThunk } from '../index'
import { ProviderKind } from '../../types/providers/Provider'
import { OneDrive } from '../../types/providers/OneDrive'
import { auth as oneDriveAuthCall } from '../../services/auth/OneDrive'

const oneDriveAuth = (provider?: OneDrive): AppThunk<Promise<void>> => async (
  dispatch,
) => {
  const newProvider = await oneDriveAuthCall(provider)
  dispatch(updateProvider(newProvider))
}

export const auth = {
  [ProviderKind.OneDrive]: oneDriveAuth,
}
