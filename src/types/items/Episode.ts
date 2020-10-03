import { MediaItem } from './MediaItem'
import { ItemKind } from './Item'
import { Video } from '../files/Video'
import { Caption } from '../files/Caption'

export interface Episode extends MediaItem {
  kind: typeof ItemKind.Episode
  number: number
  title: string
  seasonId: string
  summary: string
  airDate: Date
  sources: Video[]
  captions: Caption[]
}
