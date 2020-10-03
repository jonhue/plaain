import { IMediaItem } from './types/items/Item'

export const notUndefined = <T>(x: T | undefined): x is T => x !== undefined

export const isInProgress = (item: IMediaItem) => item.progress !== undefined

export const wasRecentlyWatched = (item: IMediaItem, thresh: Date) =>
  !isInProgress(item) &&
  item.lastWatched !== undefined &&
  item.lastWatched > thresh

export const sortByNumber = <T extends unknown>(
  items: T[],
  getAttr: (item: T) => number,
) => items.sort((a, b) => getAttr(a) - getAttr(b))

const safeTime = (date: Date | undefined) => date?.getTime() || 0

export const sortByLastWatched = <T extends IMediaItem>(items: T[]) =>
  sortByNumber(items, (item) => safeTime(item.lastWatched))

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
