import { File } from '../../types/files/File'

export interface MovieIndexResponse {
  name: string
  files: File[]
}

export interface EpisodeIndexResponse {
  name: string
  files: File[]
}

export interface SeasonIndexResponse {
  name: string
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
