import { CastMember, CrewMember } from './Person'
import { IMediaItem, ItemKind, Usage } from './Item'
import { Caption } from '../files/captions/Caption'
import { Video } from '../files/videos/Video'

export interface Episode extends IMediaItem {
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
  sources: Video[]
  captions: Caption[]
}

export interface EpisodeLike {
  kind: typeof ItemKind.Episode
  number: number
  seasonId: string
  seasonNumber: number
  showId: string
  showTmdbId: number
  sources: Video[]
  captions: Caption[]
  usage: Usage
}
