import { AccessToken } from '../AccessToken'
import { Provider, ProviderKind } from './Provider'

export interface OneDrive extends Provider {
  kind: typeof ProviderKind.OneDrive
  accessToken: AccessToken
}
