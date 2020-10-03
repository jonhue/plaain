import { FileProvider } from './FileProvider'
import { ProviderKind } from '../../providers/Provider'

export interface OneDriveFile extends FileProvider {
  kind: typeof ProviderKind.OneDrive
  size: number
  downloadUrl: string
  webUrl: string
  mimeType: string

  // video
  bitrate?: number
  duration?: number
  height?: number
  width?: number
  audioChannels?: number
  audioFormat?: string
  fourCC?: string
  frameRate?: number
}
