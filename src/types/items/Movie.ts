import { MediaItem } from './MediaItem'
import { ItemKind } from './Item'
import { Source } from '../files/Source'
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
  sources: Source[]
  captions: Caption[]
}
