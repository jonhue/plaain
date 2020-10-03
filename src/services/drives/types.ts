import { FileProvider } from '../../types/files/providers/FileProvider'

export interface MovieIndexResponse {
  name: string
  files: FileProvider[]
}

export interface EpisodeIndexResponse {
  name: string
  files: FileProvider[]
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
