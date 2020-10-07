import { CastMember, CrewMember } from './Person'
import { IWatchableMediaItem, ItemKind, Usage } from './Item'
import { Caption } from '../files/captions/Caption'
import { Video } from '../files/videos/Video'

export interface Episode extends IWatchableMediaItem {
  kind: typeof ItemKind.Episode
  number: number
  title: string
  seasonId: string
  seasonNumber: number
  showId: string
  showTmdbId: number
  summary: string
  airDate: Date
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
