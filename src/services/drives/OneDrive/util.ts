import { Caption, CaptionType } from '../../../types/files/Caption'
import { DriveItemResponse, FileResponse, VideoResponse } from './types'
import { File, FileKind } from '../../../types/files/File'
import { Video, VideoType } from '../../../types/files/Video'
import {
  buildFileId,
  parseCaptionType,
  parseFileName,
  parseVideoType,
} from '../util'
import { ProviderKind } from '../../../types/providers/Provider'

const buildCaption = (
  providerId: string,
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
    providerId,
    id,
    fileName,
    size,
    downloadUrl,
    webUrl,
    mimeType,
  },
})

const buildVideo = (
  providerId: string,
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
    providerId,
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

export const buildFile =
  (providerId: string) =>
  (response: DriveItemResponse): File | undefined => {
    if (response.file === undefined) return

    const { name, extension } = parseFileName(response.name)
    if (extension === undefined) return

    const captionType = parseCaptionType(extension)
    const videoType = parseVideoType(extension)

    if (captionType !== undefined)
      return buildCaption(
        providerId,
        captionType,
        name,
        response,
        response.file,
      )
    else if (videoType !== undefined && response.video !== undefined)
      return buildVideo(
        providerId,
        videoType,
        name,
        response,
        response.file,
        response.video,
      )
  }
