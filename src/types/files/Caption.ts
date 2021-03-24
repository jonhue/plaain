import {
  CaptionProvider,
  IFTPFileProvider,
  IOneDriveFileProvider,
} from './FileProvider'
import { FileKind, IFile } from './File'

export const VTT_EXTENSION = 'vtt'

export type CaptionType = typeof VTT_EXTENSION

export interface Caption extends IFile<CaptionProvider> {
  kind: typeof FileKind.Caption
  type: CaptionType
}

export type FTPCaption = IFTPFileProvider

export type OneDriveCaption = IOneDriveFileProvider
