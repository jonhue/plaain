import { FileKind, IFile } from '../File'
import { CaptionProvider } from '../FileProvider'

export const VTT_EXTENSION = 'vtt'

export type CaptionType = typeof VTT_EXTENSION

export interface Caption extends IFile<CaptionProvider> {
  kind: typeof FileKind.Caption
  type: CaptionType
}
