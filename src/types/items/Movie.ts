import { IMediaItem, ItemKind } from './Item'
import { Caption } from '../files/captions/Caption'
import { Person } from './Person'
import { Video } from '../files/videos/Video'

export interface Movie extends IMediaItem {
  kind: typeof ItemKind.Movie
  title: string
  summary: string
  duration: number
  releaseDate: Date
  posterUrl: string
  backdropUrl: string
  trailerUrl: string
  cast: Person[]
  crew: Person[]
  sources: Video[]
  captions: Caption[]
}
