import { IFTP } from '../../types/providers/FTP'
import { IOneDrive } from '../../types/providers/OneDrive'
import { ProviderKind } from '../../types/providers/Provider'

interface IAuth {
  id: string
  name: string
}

export type FTPAuthSetup = { name: string } & IFTP
export type OneDriveAuthSetup = { kind: ProviderKind.OneDrive }

export type AuthSetup = FTPAuthSetup | OneDriveAuthSetup

export type FTPAuthResponse = IAuth & IFTP
export type OneDriveAuthResponse = IAuth & IOneDrive

export type AuthResponse = FTPAuthResponse | OneDriveAuthResponse
