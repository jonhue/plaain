import { CaptionType, VTT_EXTENSION } from '../../types/files/Caption'
import { EpisodeIndexResponse, SeasonIndexResponse } from './types'
import {
  M4V_EXTENSION,
  MKV_EXTENSION,
  MP4_EXTENSION,
  VideoType,
  WEBM_EXTENSION,
} from '../../types/files/Video'
import { File } from '../../types/files/File'
import { ProviderKind } from '../../types/providers/Provider'

export const parseFileName = (fileName: string) => ({
  name: fileName.split('.').shift()!,
  extension: fileName.split('.').pop(),
})

export const parseCaptionType = (
  extension: string,
): CaptionType | undefined => {
  switch (extension) {
    case VTT_EXTENSION:
      return VTT_EXTENSION
  }
}

export const parseVideoType = (extension: string): VideoType | undefined => {
  switch (extension) {
    case MP4_EXTENSION:
      return MP4_EXTENSION
    case M4V_EXTENSION:
      return M4V_EXTENSION
    case MKV_EXTENSION:
      return MKV_EXTENSION
    case WEBM_EXTENSION:
      return WEBM_EXTENSION
  }
}

export const buildFileId = (kind: ProviderKind, id: string) => `${kind}@${id}`

export const buildEpisodeIndexResponse = (
  number: number,
  files: File[] = [],
): EpisodeIndexResponse => ({ number, files })

export const buildSeasonIndexResponse = (
  number: number,
  episodes: EpisodeIndexResponse[] = [],
): SeasonIndexResponse => ({ number, episodes })
