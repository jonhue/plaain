import { FTP } from './FTP'
import { OneDrive } from './OneDrive'

export enum ProviderKind {
  FTP,
  OneDrive,
}

export type ProviderKindWithRedirect = ProviderKind.OneDrive

export const PROVIDER_KINDS = [ProviderKind.FTP, ProviderKind.OneDrive]

export interface IProvider {
  kind: ProviderKind
  id: string
  name: string
  moviesPath: string | undefined
  showsPath: string | undefined
}

export type Provider = FTP | OneDrive

export type ProviderWithRedirect = Provider & { kind: ProviderKindWithRedirect }
