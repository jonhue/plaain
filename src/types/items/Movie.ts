import { MediaItem } from './MediaItem'
import { ItemKind } from './Item'
import { Video } from '../files/Video'
import { Caption } from '../files/Caption'
import { Person } from './Person'

export interface Movie extends MediaItem {
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
