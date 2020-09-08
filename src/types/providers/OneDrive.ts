import { AccessToken } from '../AccessToken'
import { ProviderType, Provider } from './Provider'

export interface OneDrive extends Provider {
  type: typeof ProviderType.OneDrive
  accessToken: AccessToken
}
