import { MediaItem } from './MediaItem'
import { ItemKind } from './Item'
import { Person } from './Person'

export interface Season extends MediaItem {
  kind: typeof ItemKind.Season
  number: number
  showId: string
  summary: string
  airDate: Date
  posterUrl: string
  backdropUrl: string
  trailerUrl: string
  cast: Person[]
  crew: Person[]
}
