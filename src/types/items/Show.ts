import { IMediaItem, ItemKind } from './Item'

export interface Show extends IMediaItem {
  kind: typeof ItemKind.Show
  title: string
  summary: string
  posterUrl: string
  backdropUrl: string
}
