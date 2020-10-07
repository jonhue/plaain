import { File } from '../../types/files/File'

export interface EpisodeIndexResponse {
  number: number
  files: File[]
}

export interface MovieIndexResponse {
  name: string
  files: File[]
}

export interface SeasonIndexResponse {
  number: number
  episodes: EpisodeIndexResponse[]
}

export interface ShowIndexResponse {
  name: string
  seasons: SeasonIndexResponse[]
}

export interface IndexResponse {
  movies: MovieIndexResponse[]
  shows: ShowIndexResponse[]
}
