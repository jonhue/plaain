import { OneDrive } from './OneDrive'

export enum ProviderKind {
  OneDrive,
}

export interface IProvider {
  kind: ProviderKind
  id: string
  name: string
  moviesPath: string | undefined
  showsPath: string | undefined
}

export type Provider = OneDrive
