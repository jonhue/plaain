import { Caption, CaptionType } from '../../../types/files/captions/Caption'
import { File, FileKind } from '../../../types/files/File'
import { Video, VideoType } from '../../../types/files/videos/Video'
import {
  buildFileId,
  parseCaptionType,
  parseFileName,
  parseVideoType,
} from '../util'
import { FileInfo } from 'basic-ftp'
import { ProviderKind } from '../../../types/providers/Provider'

const buildCaption = (
  providerId: string,
  path: string,
  type: CaptionType,
  name: string,
  { name: fileName, size, uniqueID }: FileInfo,
): Caption => ({
  kind: FileKind.Caption,
  type,
  id: buildFileId(ProviderKind.FTP, uniqueID || fileName),
  name,
  provider: {
    kind: ProviderKind.FTP,
    providerId,
    fileName,
    path,
    size,
  },
})

const buildVideo = (
  providerId: string,
  path: string,
  type: VideoType,
  name: string,
  { name: fileName, size, uniqueID }: FileInfo,
): Video => ({
  kind: FileKind.Video,
  type,
  id: buildFileId(ProviderKind.FTP, uniqueID || fileName),
  name,
  provider: {
    kind: ProviderKind.FTP,
    providerId,
    fileName,
    path,
    size,
  },
})

export const buildFile = (providerId: string, path: string) => (
  response: FileInfo,
): File | undefined => {
  const { name, extension } = parseFileName(response.name)
  if (extension === undefined) return

  const captionType = parseCaptionType(extension)
  const videoType = parseVideoType(extension)

  if (captionType !== undefined)
    return buildCaption(providerId, path, captionType, name, response)
  else if (videoType !== undefined)
    return buildVideo(providerId, path, videoType, name, response)
}
