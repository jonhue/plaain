import { CastMember, CrewMember } from './Person'
import { IWatchableMediaItem, ItemKind, Usage } from './Item'
import { Caption } from '../files/captions/Caption'
import { Video } from '../files/videos/Video'

export interface Movie extends IWatchableMediaItem {
  kind: typeof ItemKind.Movie
  title: string
  summary: string | undefined
  duration: number | undefined
  releaseDate: string
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
