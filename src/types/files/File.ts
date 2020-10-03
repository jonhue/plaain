import { FileProvider } from './providers/FileProvider'

export enum FileKind {
  Video,
  Caption,
}

export interface File {
  kind: FileKind
  id: string
  name: string
  provider: FileProvider
}
