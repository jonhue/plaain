import { MediaItem } from './MediaItem'
import { ItemKind } from './Item'

export interface Show extends MediaItem {
  kind: typeof ItemKind.Show
  title: string
  summary: string
  posterUrl: string
  backdropUrl: string
}
