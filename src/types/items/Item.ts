import { Episode } from './Episode'
import { Movie } from './Movie'
import { Person } from './Person'
import { Season } from './Season'
import { Show } from './Show'

export enum ItemKind {
  Episode,
  Movie,
  Person,
  Season,
  Show,
}

export interface IItem {
  kind: ItemKind
  id: string
}

export interface IMediaItem extends IItem {
  lastWatched: Date | undefined
  progress: number | undefined
}

export type Item = Episode | Movie | Person | Season | Show
