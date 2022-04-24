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
  airDate: string | undefined
  posterPath: string | undefined
  trailerUrl: string
  episodes: number[] // episode numbers
  cast: CastMember[]
  crew: CrewMember[]
}

export interface SeasonLike {
  kind: typeof ItemKind.Season
  number: number
  showTmdbId: number
  usage: Usage
}
