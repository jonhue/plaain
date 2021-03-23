import { AccessToken } from '../../types/AccessToken'
import { AccountInfo } from '@azure/msal-common'
import { ProviderKind } from '../../types/providers/Provider'

export interface OneDriveAuthResponse {
  kind: typeof ProviderKind.OneDrive
  id: string
  name: string
  accessToken: AccessToken
  account: AccountInfo
}

export type AuthResponse = OneDriveAuthResponse
