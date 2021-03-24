import { FTPCaption, OneDriveCaption } from './Caption'
import { FTPVideo, OneDriveVideo } from './Video'
import { ProviderKind } from '../providers/Provider'

export interface IFileProvider {
  providerId: string
  fileName: string
}

export interface IFTPFileProvider extends IFileProvider {
  kind: typeof ProviderKind.FTP
  path: string
  size: number
}

export interface IOneDriveFileProvider extends IFileProvider {
  kind: typeof ProviderKind.OneDrive
  id: string
  size: number
  downloadUrl: string
  webUrl: string
  mimeType: string
}

export type CaptionProvider = FTPCaption | OneDriveCaption
export type VideoProvider = FTPVideo | OneDriveVideo
export type FileProvider = CaptionProvider | VideoProvider
