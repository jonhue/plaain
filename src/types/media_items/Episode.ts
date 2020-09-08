import { MediaItem, MediaItemType } from './MediaItem'

export interface Episode extends MediaItem {
  type: typeof MediaItemType.Episode
  title: string
}
