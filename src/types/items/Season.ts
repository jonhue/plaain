import { CastMember, CrewMember } from './Person'
import { IMediaItem, ItemKind, Usage } from './Item'

export interface Season extends IMediaItem {
  kind: typeof ItemKind.Season
  number: number
  title: string
  showId: string
  showTmdbId: number
  showTitle: string
  showBackdropPath: string | undefined
  summary: string
  airDate: string
  posterPath: string | undefined
  trailerUrl: string
  cast: CastMember[]
  crew: CrewMember[]
}

export interface SeasonLike {
  kind: typeof ItemKind.Season
  number: number
  showTmdbId: number
  usage: Usage
}
