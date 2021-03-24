import { IProvider, ProviderKind } from './Provider'

export interface IFTP {
  kind: typeof ProviderKind.FTP
  host: string
  port: number
  username: string
  password: string
  secure: boolean
}

export type FTP = IProvider & IFTP
