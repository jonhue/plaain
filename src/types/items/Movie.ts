import { CastMember, CrewMember } from './Person'
import { IWatchableMediaItem, ItemKind, Usage } from './Item'
import { Caption } from '../files/Caption'
import { Video } from '../files/Video'

export interface Movie extends IWatchableMediaItem {
  kind: typeof ItemKind.Movie
  title: string
  summary: string | undefined
  duration: number | undefined
  releaseDate: string | undefined
  isAdult: boolean
  budget: number
  revenue: number
  homepage: string | undefined
  posterPath: string | undefined
  backdropPath: string | undefined
  trailerUrl: string
  cast: CastMember[]
  crew: CrewMember[]
}

export interface MovieLike {
  kind: typeof ItemKind.Movie
  tmdbId: number
  sources: Video[]
  captions: Caption[]
  usage: Usage
}
