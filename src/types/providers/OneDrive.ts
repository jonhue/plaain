import { AccessToken } from '../AccessToken'
import { Provider, ProviderType } from './Provider'

export interface OneDrive extends Provider {
  type: typeof ProviderType.OneDrive
  accessToken: AccessToken
}
