import { Episode, EpisodeLike } from './Episode'
import { Movie, MovieLike } from './Movie'
import { Season, SeasonLike } from './Season'
import { Show, ShowLike } from './Show'
import { Caption } from '../files/Caption'
import { Person } from './Person'
import { Video } from '../files/Video'

export enum ItemKind {
  Episode,
  Movie,
  Person,
  Season,
  Show,
}

export interface Usage {
  lastWatched: string | undefined
  progress: number | undefined
}

export interface IItem {
  kind: ItemKind
  id: string
  tmdbId: number
}

export interface IMediaItem extends IItem {
  usage: Usage
}

export interface IWatchableMediaItem extends IMediaItem {
  sources: Video[]
  captions: Caption[]
}

export type Item = Episode | Movie | Person | Season | Show

export type ItemLike = Item | EpisodeLike | MovieLike | SeasonLike | ShowLike
