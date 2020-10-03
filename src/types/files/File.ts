import { Caption } from './captions/Caption'
import { FileProvider } from './FileProvider'
import { Video } from './videos/Video'

export enum FileKind {
  Video,
  Caption,
}

export interface IFile<T extends FileProvider> {
  kind: FileKind
  id: string
  name: string
  provider: T
}

export type File = Caption | Video
