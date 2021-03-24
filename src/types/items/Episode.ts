import { CastMember, CrewMember } from './Person'
import { IWatchableMediaItem, ItemKind, Usage } from './Item'
import { Caption } from '../files/Caption'
import { Video } from '../files/Video'

export interface Episode extends IWatchableMediaItem {
  kind: typeof ItemKind.Episode
  number: number
  title: string
  seasonId: string
  seasonNumber: number
  showId: string
  showTmdbId: number
  summary: string
  airDate: string
  stillPath: string | undefined
  guestStars: CastMember[]
  crew: CrewMember[]
}

export interface EpisodeLike {
  kind: typeof ItemKind.Episode
  number: number
  seasonNumber: number
  showTmdbId: number
  sources: Video[]
  captions: Caption[]
  usage: Usage
}
