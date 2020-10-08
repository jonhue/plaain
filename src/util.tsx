import { FALLBACK_BACKDROP_URL, FALLBACK_COVER_URL } from './constants'
import { FileProvider, VideoProvider } from './types/files/FileProvider'
import { IMediaItem, Item, ItemKind } from './types/items/Item'
import { Caption } from './types/files/captions/Caption'
import ISO6391 from 'iso-639-1'
import MicrosoftIcon from './components/icons/Nucleo/microsoft'
import { ProviderKind } from './types/providers/Provider'
import React from 'react'
import { UseTranslationResponse } from 'react-i18next'
import { buildTMDbImageUrl } from './services/databases/TMDb/util'

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
      ? new Date(item.usage.lastWatched).getTime()
      : 0,
  )

export const sortAlphabetically = <T extends unknown>(
  items: T[],
  getAttr: (item: T) => string,
) => items.sort((a, b) => (getAttr(a) < getAttr(b) ? -1 : 1))

export const splitHoursAndMinutes = (
  t: UseTranslationResponse[0],
  duration: number,
) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  return `${hours > 0 && hours + t('h')}${
    hours !== 0 && minutes !== 0 ? ' ' : ''
  }${minutes > 0 && minutes + t('m')}`
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

export const buildFileDownloadUrl = (file: FileProvider): string => {
  switch (file.kind) {
    case ProviderKind.OneDrive:
      return file.downloadUrl
  }
}

export const buildVideoSize = (file: VideoProvider): number => {
  switch (file.kind) {
    case ProviderKind.OneDrive:
      return file.height
  }
}

export const buildCaptionSrcLang = (caption: Caption): string =>
  ISO6391.getCode(caption.name)

export const buildProviderKindName = (kind: ProviderKind): string => {
  switch (kind) {
    case ProviderKind.OneDrive:
      return 'OneDrive'
  }
}

export const buildProviderIcon = (
  kind: ProviderKind,
  color: string,
): JSX.Element => {
  switch (kind) {
    case ProviderKind.OneDrive:
      return <MicrosoftIcon color={color} />
  }
}
