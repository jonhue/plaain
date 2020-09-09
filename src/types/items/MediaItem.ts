import { Item } from './Item'

export interface MediaItem extends Item {
  lastWatched: Date | undefined
  progress: number | undefined
}
