interface PersonResponse {
  gender: number | undefined
  id: number
  name: string
  profile_path: string | undefined
}

export interface CastResponse extends PersonResponse {
  character: string
}

export interface CrewResponse extends PersonResponse {
  department: string
  job: string
}

interface GenreResponse {
  id: number
  name: string
}

export interface MovieCreditsResponse {
  cast: CastResponse[]
  crew: CrewResponse[]
  id: number
}

export interface MovieDetailsResponse {
  adult: boolean
  backdrop_path: string | undefined
  budget: number
  genres: GenreResponse[]
  homepage: string | undefined
  id: number
  overview: string | undefined
  popularity: number
  poster_path: string | undefined
  release_date: string
  revenue: number
  runtime: number | undefined
  title: string
  vote_average: number
  vote_count: number
}

interface MovieResponse {
  id: number
}

export interface SearchMoviesResponse {
  results: MovieResponse[]
}

export interface SearchTVShowsResponse {
  results: TVShowResponse[]
}

export interface TVEpisodeResponse {
  air_date: string
  crew: CrewResponse[]
  episode_number: number
  guest_stars: CastResponse[]
  name: string
  overview: string
  id: number
  season_number: number
  still_path: string | undefined
  vote_average: number
  vote_count: number
}

export interface TVSeasonCreditsResponse {
  cast: CastResponse[]
  crew: CrewResponse[]
  id: number
}

export interface TVSeasonDetailsResponse {
  air_date: string
  episodes: TVEpisodeResponse[]
  id: number
  name: string
  overview: string
  poster_path: string | undefined
  season_number: number
}

interface TVSeasonResponse {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

export interface TVShowDetailsResponse {
  backdrop_path: string | undefined
  created_by: PersonResponse[]
  episode_run_time: number[]
  first_air_date: string
  genres: GenreResponse[]
  homepage: string | undefined
  id: number
  last_air_date: string
  name: string
  number_of_episodes: number
  number_of_seasons: number
  overview: string
  popularity: number
  poster_path: string | undefined
  seasons: TVSeasonResponse[]
  vote_average: number
  vote_count: number
}

interface TVShowResponse {
  id: number
}
