import { MediaItem } from './MediaItem'
import { ItemKind } from './Item'
import { Source } from '../files/Source'
import { Caption } from '../files/Caption'

export interface Episode extends MediaItem {
  kind: typeof ItemKind.Episode
  number: number
  title: string
  seasonId: string
  summary: string
  airDate: Date
  sources: Source[]
  captions: Caption[]
}
