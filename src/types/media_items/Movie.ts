import { MediaItem, MediaItemType } from './MediaItem'

export interface Movie extends MediaItem {
  type: typeof MediaItemType.Movie
  title: string
  summary: string
}
