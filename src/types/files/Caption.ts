import { File, FileKind } from './File'

const VTT_EXTENSION = 'vtt'

type FileExtension = typeof VTT_EXTENSION

export interface Caption extends File {
  kind: typeof FileKind.Caption
  fileExtension: FileExtension
}
