import { File, FileKind } from './File'

const MP4_EXTENSION = 'mp4'
const M4V_EXTENSION = 'm4v'
const MKV_EXTENSION = 'mkv'
const WEBM_EXTENSION = 'webm'

type VideoType =
  | typeof MP4_EXTENSION
  | typeof M4V_EXTENSION
  | typeof MKV_EXTENSION
  | typeof WEBM_EXTENSION

export interface Video extends File {
  kind: typeof FileKind.Video
  type: VideoType
}
