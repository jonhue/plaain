import { FileProvider } from './providers/FileProvider'

export enum FileKind {
  Source,
  Caption,
}

export interface File {
  kind: FileKind
  id: string
  name: string
  provider: FileProvider
}
