import { updateProvider } from './actions'
import { AppThunk } from '../index'
import { ProviderKind } from '../../types/providers/Provider'
import { OneDrive } from '../../types/providers/OneDrive'
import { auth as oneDriveAuthCall } from '../../services/auth/OneDrive'

const oneDriveAuth = (provider?: OneDrive) => () => oneDriveAuthCall(provider)

export const auth = {
  [ProviderKind.OneDrive]: oneDriveAuth,
}
