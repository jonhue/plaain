import { AccessToken } from '../../types/AccessToken'
import { ProviderKind } from '../../types/providers/Provider'

export interface OneDriveAuthResponse {
  kind: typeof ProviderKind.OneDrive
  id: string
  name: string
  accessToken: AccessToken
}

export type AuthResponse = OneDriveAuthResponse
