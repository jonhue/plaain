import { OneDriveCaption } from './captions/OneDriveCaption'
import { OneDriveVideo } from './videos/OneDriveVideo'
import { ProviderKind } from '../providers/Provider'

export interface IFileProvider {
  kind: ProviderKind
  providerId: string
  id: string
  fileName: string
}

export interface IOneDriveFileProvider extends IFileProvider {
  kind: typeof ProviderKind.OneDrive
  size: number
  downloadUrl: string
  webUrl: string
  mimeType: string
}

export type CaptionProvider = OneDriveCaption
export type VideoProvider = OneDriveVideo
export type FileProvider = CaptionProvider | VideoProvider
