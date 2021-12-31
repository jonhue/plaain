import { IMediaItem, ItemKind, Usage } from './Item'

export interface Show extends IMediaItem {
  kind: typeof ItemKind.Show
  title: string
  summary: string
  episodeRunTime: number[]
  firstAirDate: string
  lastAirDate: string
  homepage: string | undefined
  posterPath: string | undefined
  backdropPath: string | undefined
  seasons: number[] // season numbers
}

export interface ShowLike {
  kind: typeof ItemKind.Show
  tmdbId: number
  usage: Usage
}
