import { Episode, EpisodeLike } from './Episode'
import { Movie, MovieLike } from './Movie'
import { Person } from './Person'
import { Season, SeasonLike } from './Season'
import { Show, ShowLike } from './Show'

export enum ItemKind {
  Episode,
  Movie,
  Person,
  Season,
  Show,
}

export interface Usage {
  lastWatched: Date | undefined
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

export type Item = Episode | Movie | Person | Season | Show

export type ItemLike = Item | EpisodeLike | MovieLike | SeasonLike | ShowLike
