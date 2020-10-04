import { FALLBACK_BACKDROP_URL, FALLBACK_COVER_URL } from './constants'
import { buildTMDbImageUrl } from './services/databases/TMDb/util'
import { IMediaItem } from './types/items/Item'

export const notUndefined = <T>(x: T | undefined): x is T => x !== undefined

export const isInProgress = (item: IMediaItem) => item.usage.progress !== undefined

export const wasRecentlyWatched = (item: IMediaItem, thresh: Date) =>
  !isInProgress(item) &&
  item.usage.lastWatched !== undefined &&
  item.usage.lastWatched > thresh

export const sortByNumber = <T extends unknown>(
  items: T[],
  getAttr: (item: T) => number,
) => items.sort((a, b) => getAttr(a) - getAttr(b))

const safeTime = (date: Date | undefined) => date?.getTime() || 0

export const sortByLastWatched = <T extends IMediaItem>(items: T[]) =>
  sortByNumber(items, (item) => safeTime(item.usage.lastWatched))

export const sortAlphabetically = <T extends unknown>(
  items: T[],
  getAttr: (item: T) => string,
) => items.sort((a, b) => (getAttr(a) < getAttr(b) ? -1 : 1))

export const splitHoursAndMinutes = (duration: number) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60

  return `${hours === 0 ? '' : hours + 'h'}${
    hours !== 0 && minutes !== 0 ? ' ' : ''
  }${minutes === 0 ? '' : minutes + 'm'}`
}

export const buildBackdropUrl = (backdropPath: string | undefined) => backdropPath ? buildTMDbImageUrl(backdropPath) : FALLBACK_BACKDROP_URL

export const buildCoverUrl = (posterPath: string | undefined) => posterPath ? buildTMDbImageUrl(posterPath) : FALLBACK_COVER_URL
