import { IProvider, ProviderKind } from './Provider'
import { AccessToken } from '../AccessToken'
import { AccountInfo } from '@azure/msal-common'

export interface OneDrive extends IProvider {
  kind: typeof ProviderKind.OneDrive
  id: string
  name: string
  accessToken: AccessToken
  moviesPath: string | undefined
  showsPath: string | undefined
  account: AccountInfo
}
