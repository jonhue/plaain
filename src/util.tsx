import { FALLBACK_BACKDROP_URL, FALLBACK_COVER_URL } from './constants'
import { FileProvider, VideoProvider } from './types/files/FileProvider'
import { Gender, Job } from './types/items/Person'
import { IMediaItem, Item, ItemKind } from './types/items/Item'
import { M4V_EXTENSION, MP4_EXTENSION, Video } from './types/files/Video'
import { Provider, ProviderKind } from './types/providers/Provider'
import { Caption } from './types/files/Caption'
import { FTPIcon } from './components/icons/Nucleo/FTPIcon'
import ISO6391 from 'iso-639-1'
import { OneDriveIcon } from './components/icons/Nucleo/OneDriveIcon'
import React from 'react'
import { TFunction } from 'i18next'
import { buildTMDbImageUrl } from './services/databases/TMDb/util'

const DEFAULT_VIDEO_SIZE = 1080

export const notUndefined = <T extends unknown>(x: T | undefined): x is T =>
  x !== undefined

export const isInProgress = (item: IMediaItem) =>
  item.usage.progress !== undefined

export const wasRecentlyWatched = (item: IMediaItem, thresh: Date) =>
  !isInProgress(item) &&
  item.usage.lastWatched !== undefined &&
  new Date(item.usage.lastWatched) > thresh

export const sortByNumber = <T extends unknown>(
  items: T[],
  getAttr: (item: T) => number,
) => items.sort((a, b) => getAttr(a) - getAttr(b))

export const sortByLastWatched = <T extends IMediaItem>(items: T[]) =>
  sortByNumber(items, (item) =>
    item.usage.lastWatched !== undefined
      ? -new Date(item.usage.lastWatched).getTime()
      : 0,
  )

export const sortAlphabetically = <T extends unknown>(
  items: T[],
  getAttr: (item: T) => string,
) => items.sort((a, b) => (getAttr(a) < getAttr(b) ? -1 : 1))

export const splitHoursAndMinutes = (t: TFunction, duration: number) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  return (
    <>
      {hours > 0 && hours + t('h')}
      {hours !== 0 && minutes !== 0 ? ' ' : ''}
      {minutes > 0 && minutes + t('m')}
    </>
  )
}

export const buildBackdropUrl = (backdropPath: string | undefined) =>
  backdropPath ? buildTMDbImageUrl(backdropPath) : FALLBACK_BACKDROP_URL

export const buildCoverUrl = (posterPath: string | undefined) =>
  posterPath ? buildTMDbImageUrl(posterPath) : FALLBACK_COVER_URL

export const buildItemUrl = (item: Item): string => {
  switch (item.kind) {
    case ItemKind.Episode:
      return `/app/seasons/${item.seasonId}`
    case ItemKind.Movie:
      return `/app/movies/${item.id}`
    case ItemKind.Person:
      return `/app/people/${item.id}`
    case ItemKind.Season:
      return `/app/seasons/${item.id}`
    case ItemKind.Show:
      return `/app/shows/${item.id}`
  }
}

export const buildFileDownloadUrl = (
  provider: Provider,
  file: FileProvider,
): string => {
  switch (file.kind) {
    case ProviderKind.FTP:
      if (provider.kind !== ProviderKind.FTP)
        throw new Error(
          'Internal error: attempted to determine download URL with the wrong provider.',
        )
      return `ftp://${provider.username}:${provider.password}@${provider.host}:${provider.port}/${file.path}/${file.fileName}`
    case ProviderKind.OneDrive:
      return file.downloadUrl
  }
}

export const buildVideoType = (file: Video): string => {
  switch (file.type) {
    case M4V_EXTENSION:
      return MP4_EXTENSION
    default:
      return file.type
  }
}

export const buildVideoSize = (file: VideoProvider): number => {
  switch (file.kind) {
    case ProviderKind.FTP:
      return DEFAULT_VIDEO_SIZE
    case ProviderKind.OneDrive:
      return file.height
  }
}

export const buildCaptionSrcLang = (caption: Caption): string =>
  ISO6391.getCode(caption.name)

export const buildProviderKindName = (
  t: TFunction,
  kind: ProviderKind,
): string => {
  switch (kind) {
    case ProviderKind.FTP:
      return t('FTP Server')
    case ProviderKind.OneDrive:
      return t('OneDrive')
  }
}

export const buildProviderIcon = (kind: ProviderKind): JSX.Element => {
  switch (kind) {
    case ProviderKind.FTP:
      return <FTPIcon />
    case ProviderKind.OneDrive:
      return <OneDriveIcon />
  }
}

export const buildJobTitle = (
  t: TFunction,
  job: Job | undefined,
  gender: Gender,
): string => {
  if (job === undefined) return t('Unknown')
  if (gender === Gender.Male) return t(`JOB [M] ${job}`)
  return t(`JOB [F] ${job}`)
}

export const buildCommitId = (sha: string) => sha.substring(0, 7)
