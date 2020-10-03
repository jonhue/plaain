import { IOneDriveFileProvider } from '../FileProvider'

export interface OneDriveVideo extends IOneDriveFileProvider {
  bitrate: number
  duration: number
  height: number
  width: number
  audioChannels: number
  audioFormat: string
  fourCC: string
  frameRate: number
}
