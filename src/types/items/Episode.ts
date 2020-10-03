import { IMediaItem, ItemKind } from './Item'
import { Caption } from '../files/captions/Caption'
import { Video } from '../files/videos/Video'

export interface Episode extends IMediaItem {
  kind: typeof ItemKind.Episode
  number: number
  title: string
  seasonId: string
  summary: string
  airDate: Date
  sources: Video[]
  captions: Caption[]
}
