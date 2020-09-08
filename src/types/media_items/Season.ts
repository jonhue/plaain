import { MediaItem, MediaItemType } from './MediaItem'

export interface Season extends MediaItem {
  type: typeof MediaItemType.Season
  title: string
}
