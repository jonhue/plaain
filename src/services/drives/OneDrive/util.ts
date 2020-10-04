import { Caption, CaptionType } from '../../../types/files/captions/Caption'
import { DriveItemResponse, FileResponse, VideoResponse } from './types'
import { File, FileKind } from '../../../types/files/File'
import { Video, VideoType } from '../../../types/files/videos/Video'
import {
  buildFileId,
  parseCaptionType,
  parseFileName,
  parseVideoType,
} from '../util'
import { ProviderKind } from '../../../types/providers/Provider'

const buildCaption = (
  type: CaptionType,
  name: string,
  {
    id,
    name: fileName,
    size,
    webUrl,
    '@microsoft.graph.downloadUrl': downloadUrl,
  }: DriveItemResponse,
  { mimeType }: FileResponse,
): Caption => ({
  kind: FileKind.Caption,
  type,
  id: buildFileId(ProviderKind.OneDrive, id),
  name,
  provider: {
    kind: ProviderKind.OneDrive,
    id,
    fileName,
    size,
    downloadUrl,
    webUrl,
    mimeType,
  },
})

const buildVideo = (
  type: VideoType,
  name: string,
  {
    id,
    name: fileName,
    size,
    webUrl,
    '@microsoft.graph.downloadUrl': downloadUrl,
  }: DriveItemResponse,
  { mimeType }: FileResponse,
  {
    bitrate,
    duration,
    height,
    width,
    audioChannels,
    audioFormat,
    fourCC,
    frameRate,
  }: VideoResponse,
): Video => ({
  kind: FileKind.Video,
  type,
  id: buildFileId(ProviderKind.OneDrive, id),
  name,
  provider: {
    kind: ProviderKind.OneDrive,
    id,
    fileName,
    size,
    downloadUrl,
    webUrl,
    mimeType,
    bitrate,
    duration,
    height,
    width,
    audioChannels,
    audioFormat,
    fourCC,
    frameRate,
  },
})

export const buildFile = (response: DriveItemResponse): File | undefined => {
  if (response.file === undefined) return

  const { name, extension } = parseFileName(response.name)
  if (extension === undefined) return

  const captionType = parseCaptionType(extension)
  const videoType = parseVideoType(extension)

  if (captionType !== undefined)
    return buildCaption(captionType, name, response, response.file)
  else if (videoType !== undefined && response.video !== undefined)
    return buildVideo(videoType, name, response, response.file, response.video)
}
