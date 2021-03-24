import { IProvider, ProviderKind } from './Provider'
import { AccessToken } from '../AccessToken'
import { AccountInfo } from '@azure/msal-common'

export interface IOneDrive {
  kind: typeof ProviderKind.OneDrive
  accessToken: AccessToken
  account: AccountInfo
}

export type OneDrive = IProvider & IOneDrive
