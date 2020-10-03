import { FileKind, IFile } from '../File'
import { VideoProvider } from '../FileProvider'

export const MP4_EXTENSION = 'mp4'
export const M4V_EXTENSION = 'm4v'
export const MKV_EXTENSION = 'mkv'
export const WEBM_EXTENSION = 'webm'

export type VideoType =
  | typeof MP4_EXTENSION
  | typeof M4V_EXTENSION
  | typeof MKV_EXTENSION
  | typeof WEBM_EXTENSION

export interface Video extends IFile<VideoProvider> {
  kind: typeof FileKind.Video
  type: VideoType
}
